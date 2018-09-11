module.exports = {

  /*
    parseSQL function
    - sqlObj is a 
    EX: values = { var: "string" }
        query = '"This" is a $var' =>
        return: '`This` is a string'
  */
  parseSQL: (sqlObj)=>{
    let output = sqlObj.query.replace(/"/g,'`');
    Object.keys(sqlObj.values).forEach((objectKey, index)=>{
      output = output.replace('$'+objectKey,'"'+sqlObj.values[objectKey]+'"');
    });
    return output;
  }
}
