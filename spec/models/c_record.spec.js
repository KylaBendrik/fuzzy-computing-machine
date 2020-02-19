const test = require('ava');
const CRecord= require('../../src/models/c_record');

test('update record from employee personal form', t => {
  const original_record = {
    record_type: {value: 'C', start: 1},
    ssn: {value: '111222333', start: 2},
    first_name: {value: 'unknown', start: 11}
  };

  const personal_hash = {
    ssn: '987654321',
    first_name: 'Jonathan'
  };

  t.deepEqual(CRecord.updateEmployeeInfo(original_record, personal_hash), {
    record_type: {value: 'C', start: 1},
    ssn: {value: '987654321', start: 2},
    first_name: {value: 'Jonathan', start: 11}
  });
});

test('add new employee', t => {
  const all_employees = []

  const personal_hash = {
    ssn: '987654321',
    first_name: 'Jonathan'
  }

  const tax_hash = {
    hire_date: '20200101'
  }

  t.deepEqual(CRecord.addNewEmployee(all_employees, personal_hash, tax_hash), [
    {
      record_type: {value: 'C', start: 1},
      ssn: {value: '987654321', start: 2},
      first_name: {value: 'Jonathan', start: 11},
      hire_date: {value: '20200101', start: 276},
    }
  ])
})

test('remove employee record from all_employees', t => {
  const all_employees = [
    {record_type: {value: 'C', start: 1}, ssn: {value: '987654321', start: 2}, first_name: {value: 'Jonathan', start: 11}},
    {record_type: {value: 'C', start: 1}, ssn: {value: '123456789', start: 2}, first_name: {value: 'Bob', start: 11}},
  ]
  const ssn = '123456789'

  t.deepEqual(CRecord.removeEmployee(all_employees, ssn), 
  [
    {record_type: {value: 'C', start: 1}, ssn: {value: '987654321', start: 2}, first_name: {value: 'Jonathan', start: 11}}
  ])
})

test("export both employees' c_records", t => {
  const all_employees = [
    {record_type: {value: 'C', start: 1}, ssn: {value: '987654321', start: 2}, first_name: {value: 'Jonathan', start: 11}},
    {record_type: {value: 'C', start: 1}, ssn: {value: '123456789', start: 2}, first_name: {value: 'Bob', start: 11}},
  ]

  result = CRecord.exportCRecords(all_employees)
  t.true(result.length == (520 * 2) - 1)
  t.true(result[0] == 'C')
  t.true(result[520] == 'C')
})