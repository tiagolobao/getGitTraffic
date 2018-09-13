"use strict";

module.exports = {

  /*
    parseSQL function
    - sqlObj is the json-sql object
    EX: values = { var: "string" }
        query = '"This" is a $var' =>
        return: '`This` is a string'
  */
  parseSQL: function(sqlObj){
    let output = sqlObj.query.replace(/"/g,'`');
    Object.keys(sqlObj.values).forEach((objectKey, index)=>{
      output = output.replace('$'+objectKey,'"'+sqlObj.values[objectKey]+'"');
    });
    output = output.replace(/T00:00:00Z/g,' 00:00:00'); //For timestamp
    return output;
  },

  /*
    insertSQL function
    - args = {
      mysql: mysql,
      jsonSql: jsonSql,
      values: values,
      table: table
    }

  */
  insertFromGithubSQL: function(args){ 
    if(args.values.length > -1){
      let sql = args.jsonSql.build({
        type: 'insert',
        table: args.table,
        values: args.values,
      });
      console.log(this.parseSQL(sql));
      args.mysql.query(this.parseSQL(sql),(err,result)=>{
        console.log(result);
        console.error(err);
      });
    }
  }

}
