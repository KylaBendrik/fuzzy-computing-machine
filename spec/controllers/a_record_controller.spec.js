const test = require('ava');
const ARecord = require('../../src/controllers/a_record_controller');

const record = {
  record_type: {value: 'A', start: 1},
  contact_info_name: {value: 'unknown', start: 73},
  contact_info_phone: {value: 'unknown', start: 113},
  contact_info_email: {value: 'unknown', start: 138},
  contact_info_fax: {value: 'unknown', start: 314}
}



test('check record type', t => {
  
  t.is(ARecord.checkRecordType(record), 'A');
});

test('update contact info', t => {
  t.deepEqual(ARecord.updateARecord(record, {contact_info_name: 'John Doe', contact_info_email: 'JohnDoe@example.com', contact_info_phone: '9999999999', contact_info_fax: '9999999999'}), 
  { record_type: {value: 'A', start: 1},
    contact_info_name: {value: 'John Doe', start: 73},
    contact_info_email: {value: 'JohnDoe@example.com', start: 138},
    contact_info_phone: {value: '9999999999', start: 113},
    contact_info_fax: {value: '9999999999', start: 314}
  }
  )
})

test('export a record with rt and full contact info', t => {
  result = ARecord.exportARecord({
    record_type: {value: 'A', start: 1},
    contact_info_name: {value: 'Joe', start: 73},
    contact_info_phone: {value: '1234567890', start: 113},
    contact_info_email: {value: 'joe@example.com', start: 138},
    contact_info_fax: {value: '0987654321', start: 314}
  })
  t.true(result.length == 339)
  t.true(result[113] == '2')
  t.true(result[137] == 'j')
  t.true(result[314] == '9')
})