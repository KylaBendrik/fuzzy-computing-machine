const test = require('ava');
const ARecord = require('../../src/models/a_record');

// test('save A record as JSON', t => {
//   const recordA = {
//     record_type: {value: 'A', start: 1}
//   }
//   t.is(ARecord.saveARecord(recordA), '{"record_type":{"value":"A","start":1}}')
// })

test('read A record from JSON', t => {
  const recordA = {
    record_type: {value: 'A', start: 1}
  }
  t.deepEqual(ARecord.readARecord(), recordA)
})