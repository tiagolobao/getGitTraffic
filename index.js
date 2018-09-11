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
  console.log("Getting referrers...");
  console.log(JSON.parse(body)[0]);
  var sql = jsonSql.build({
  	type: 'insert',
  	table: 'Referrers',
  	values: JSON.parse(body),
  });
  var sqlQuery = sql.query.replace(/"/g,'`');
  // Object.keys(sql.values).forEach((objectKey, index)=>{
  //   sqlQuery = sqlQuery.replace('$'+objectKey,'"'+sql.values[objectKey]+'"');
  // });
  mysql.query(sqlQuery,(err,result)=>{
    console.log(result);
    console.error(err);
  });
});

githubRequest({uri: '/traffic/popular/paths'},(err,response,body)=>{
  // console.log("Getting paths...");
  JSON.parse(body).forEach((value)=>{
    let sql = 'INSERT INTO `Paths` (`path`, `title`, `count`, `uniques`) VALUES ("'+value.path+'","'+value.title+'",'+value.count+','+value.uniques+')';
    // console.log(sql);
    mysql.query(sql,(err, result)=>{
    });
  });
});

/*
githubRequest({uri: '/traffic/views'},(err,response,body)=>{
  let obj = JSON.parse(body);
  console.log(obj);
  console.log("SEPARADOR");
});

githubRequest({uri: '/traffic/clones'},(err,response,body)=>{
  let obj = JSON.parse(body);
  console.log(obj);
  console.log("SEPARADOR");
});
*/
