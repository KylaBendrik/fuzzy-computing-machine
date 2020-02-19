const ARecordController = require('./src/controllers/a_record_controller');
const ARecord = require('./src/models/a_record');

// read current record
let record = ARecord.readARecord()
console.log('record:')
console.log(record)

// // update record
// ARecordController.updateContactInfo(record, {contact_info_name: 'Elizabeth Jackson', contact_info_phone: '5305589183'})

// ARecord.readARecord()