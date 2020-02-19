// This is for talking to the "database"
var fs = require('fs')


function processFile(json_data){
  console.log('data processed...')
  return JSON.parse(json_data)
}

module.exports = {
  saveARecord(record) {
    record_json = JSON.stringify(record)

    fs.writeFile("./data/a_record.txt", record_json, function (err) {
      if (err) {
        console.log(err);
      }
    })

    return record_json
  },
  readARecord() {
    fs.readFileSync("./data/a_record.txt", function read(err, data) {
      if (err) {
        console.log(err);
      }
      let content = processFile(data)
      console.log('---file contents---')
      console.log(content)
      return content
    })
    
  }
}
