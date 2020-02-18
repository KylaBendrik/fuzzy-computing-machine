const test = require('ava');
const ARecord = require('../../src/models/a_record');

test('check record type', t => {
  t.is(ARecord.checkRecordType(), 'A');
});

test('add contact info', t => {
  t.deepEqual(ARecord.updateContactInfo({name: 'Joe'}), {
    record_type: 'A',
    contact_info: {
      name: 'Joe',
      email: 'unknown',
      phone: 'unknown',
      fax: 'unknown'
    }
  })
})

test('add contact info 2', t => {
  t.deepEqual(ARecord.updateContactInfo({name: 'John Doe', email: 'JohnDoe@example.com'}), {
    record_type: 'A',
    contact_info: {
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      phone: 'unknown',
      fax: 'unknown'
    }
  })
})