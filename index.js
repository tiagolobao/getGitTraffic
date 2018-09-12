"use strict";


/* Add Requires */
var config = require('./config.js');
var incs = require('./incs.js');
var jsonSql = require('json-sql')();
var request = require('request');
var mysql = require('mysql').createConnection({
  host: 'localhost',
  user: 'root',
  password: 'redeLogos2014',
  database: 'gh-traffic'
});

/* request */
var githubRequest = request.defaults({
  baseUrl: 'https://api.github.com/repos/' + config.repo.owner + '/' + config.repo.name + '/',
  method: 'GET',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + config.token
  }
});

/* mysql */
mysql.connect(function(err) {
  if (err) throw err;
  console.log("mysql Connected!");
});

githubRequest({uri: 'traffic/popular/referrers'},(err,response,body)=>{
  console.log(JSON.parse(body)[0]);
  let sql = jsonSql.build({
  	type: 'insert',
  	table: 'Referrers',
  	values: JSON.parse(body),
  });
  mysql.query(incs.parseSQL(sql),(err,result)=>{
    console.log(result);
    console.error(err);
  });
});

githubRequest({uri: '/traffic/popular/paths'},(err,response,body)=>{
  console.log(JSON.parse(body)[0]);
  let sql = jsonSql.build({
  	type: 'insert',
  	table: 'Paths',
  	values: JSON.parse(body),
  });
  mysql.query(incs.parseSQL(sql),(err,result)=>{
    console.log(result);
    console.error(err);
  });
});

githubRequest({uri: '/traffic/views'},(err,response,body)=>{
  console.log(JSON.parse(body)[0]);
  let sql = jsonSql.build({
    type: 'insert',
    table: 'Views',
    values: JSON.parse(body).views,
  });
  mysql.query(incs.parseSQL(sql),(err,result)=>{
    console.log(result);
    console.error(err);
  });
});

githubRequest({uri: '/traffic/clones'},(err,response,body)=>{
  console.log(body);
});
