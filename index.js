"use strict";

/* Add Requires */
var config = require('./config.js');
var incs = require('./incs.js');
var jsonSql = require('json-sql')();
var request = require('request');
var CronJob = require('cron').CronJob;
var mysql = require('mysql').createConnection(config.sqlOptions);

/* default request */
var githubRequest = request.defaults({
  baseUrl: 'https://api.github.com/repos/' + config.repo.owner + '/' + config.repo.name + '/',
  method: 'GET',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + config.token
  }
});

/* mysql connect */
mysql.connect(function(err) {
  if (err) throw err;
  console.log("mysql Connected!");
});

/* Scheduled function: Every day at midnight */
new CronJob('00 00 00 * * *', function() {
  console.log('Scheduled Script! Getting github traffic information');
  let argsDefault = {mysql: mysql, jsonSql: jsonSql};
  githubRequest({uri: 'traffic/popular/referrers'},(err,response,body)=>{
    let args = {values: JSON.parse(body), table: 'Referrers'};
    incs.insertFromGithubSQL({...argsDefault, ...args});
  });
  githubRequest({uri: '/traffic/popular/paths'},(err,response,body)=>{
    let args = {values: JSON.parse(body), table: 'Paths'};
    incs.insertFromGithubSQL({...argsDefault, ...args});
  });
  githubRequest({uri: '/traffic/views'},(err,response,body)=>{
    //Views by day
    let values = JSON.parse(body);
    let args = {values: values.views, table: 'Views'};
    incs.insertFromGithubSQL({...argsDefault, ...args});
    //Views by week
    args = {
      values: [{uniques: values.uniques, count: values.count}],
      table: 'ViewsWeek',
    };
    incs.insertFromGithubSQL({...argsDefault, ...args});
  });
  githubRequest({uri: '/traffic/clones'},(err,response,body)=>{
    //Clones by day
    let values = JSON.parse(body);
    let args = {values: values.clones, table: 'Clones'};
    incs.insertFromGithubSQL({...argsDefault, ...args});
    //Clones by week
    args = {
      values: [{uniques: values.uniques, count: values.count}],
      table: 'ClonesWeek',
    };
    incs.insertFromGithubSQL({...argsDefault, ...args});
  });
}, null, true, 'America/Bahia');
