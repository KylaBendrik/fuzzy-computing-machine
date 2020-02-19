const test = require('ava');
const ARecord = require('../../src/models/a_record');

test('check record type', t => {
  t.is(ARecord.checkRecordType(), 'A');
});

test('update contact info', t => {
  t.deepEqual(ARecord.updateContactInfo({name: 'John Doe', email: 'JohnDoe@example.com', phone: '9999999999', fax: '9999999999'}), 
  { record_type: {value: 'A', start: 1},
    contact_info_name: {value: 'John Doe', start: 73},
    contact_info_email: {value: 'JohnDoe@example.com', start: 138},
    contact_info_phone: {value: '9999999999', start: 113},
    contact_info_fax: {value: '9999999999', start: 314}
  }
  )
})
test('export a record with only record type', t => {
  result = ARecord.exportARecord({record_type: {value: 'A', start: 1}})
  t.is(result, 'A' + ' '.repeat(339))
})

test('export a record with rt and name', t => {
  result = (ARecord.exportARecord({
    record_type: {value: 'A', start: 1},
    contact_info_name: {value: 'Joe', start: 73},
  }));
  t.true(result[0] == 'A')
  t.true(result[72] == 'J')
  t.true(result[73] == 'o')
  t.true(result[74] == 'e')
  t.true(result.length == 340)
})

test('export a record with rt and full contact info', t => {
  result = ARecord.exportARecord({
    record_type: {value: 'A', start: 1},
    contact_info_name: {value: 'Joe', start: 73},
    contact_info_phone: {value: '1234567890', start: 113},
    contact_info_email: {value: 'joe@example.com', start: 138},
    contact_info_fax: {value: '0987654321', start: 314}
  })
  t.true(result.length == 340)
  t.true(result[113] == '2')
  t.true(result[137] == 'j')
  t.true(result[314] == '9')
})