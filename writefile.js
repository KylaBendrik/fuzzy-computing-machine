const ARecordController = require('./src/controllers/a_record_controller');
const ARecord = require('./src/models/a_record');

ARecord.saveARecord({record_type: {value: 'A', start: 1}})