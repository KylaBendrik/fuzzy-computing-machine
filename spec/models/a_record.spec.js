const test = require('ava');
const ARecord = require('../../src/models/a_record');

test('check record type', t => {
  t.is(ARecord.checkRecordType(), 'A');
});