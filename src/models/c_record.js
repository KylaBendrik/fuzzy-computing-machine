// this info will come from two forms: employee_personal and employee_payroll
// let employee_personal = {
//   ssn: '111111111',
//   first_name: 'first name',
//   middle_name: 'middle name',
//   last_name: 'last name',
//   name_suffix: 'suffix',
//   address_line1: '123 Test St.',
//   address_line2: 'Apt. 234',
//   city: 'city',
//   state: 'TS',
//   zip: '12345',
//   country: '',
//   phone_home: '1112223333',
//   phone_work: '2223334444',
//   phone_work_ext: '5555',
//   email: 'firstname@example.com',
//   birth_date: '19001225',
//   gender: 'F',
//   marital_status: 'S'
// }

// let employee_payroll = {
//   hire_date: '20200101',
//   enrollment_id: '12345',
//   status_date: '20200101',
//   status_code: 'A',
//   ee_guide: '1',
//   cost_center_code: 'ABC',
//   employer_org_id: 'ABCDEF',
//   fed_tax_exempts: '0',
//   pa_exclusion_amt: '0',
//   qnec: '0',
//   fed_wages_ytd: '10000',
//   deffered_to_other_tsa: '12345',
//   pre_tax: '12345',
//   after_tax: '54321',
//   basic: '50',
//   match: '15',
//   missionary_indicator: 'M',
//   misionary_amt: '1234567890',
//   loan_payment: '123455',
//   loan_number: '13579',
//   pay_period_hours: '40',
//   special_pay: '0',
//   roth_403b: '75',
//   er_guide_code: 'B',
//   salary_on_paper: '10000',
//   salary_period: 'B',
//   salary_periods_expected: '26'
// }

// let c_record = {
//   record_type: {value: 'C', start: 1},
//   ssn: {value: '111222333', start: 2}
// }
const field_starts = {
  record_type: 1,
  ssn: 2,
  first_name: 11,
  hire_date: 276
}

module.exports = {
  updateEmployeeInfo(hash, record){
    for (const prop of Object.keys(hash)) {
      record[prop].value = hash[prop]
    }
    return record
  },

  addNewEmployee(all_employees, ep_hash, tax_hash){
    //return updated all_employees array?
    new_employee = {record_type: {value: 'C', start: 1}}
    for (const prop of Object.keys(ep_hash)) {
      new_employee[prop] = {value: ep_hash[prop], start: field_starts[prop]}
    }
    for (const prop of Object.keys(tax_hash)) {
      new_employee[prop] = {value: tax_hash[prop], start: field_starts[prop]}
    }
    all_employees.push(new_employee)
    return all_employees
  },

  removeEmployee(all_employees, ssn){
    //splice - removes from a specific Array index.
    for(var i = 0; i < all_employees.length; i++){
      if (all_employees[i].ssn.value == ssn) {
        all_employees.splice(i, 1)
      }
    }
    return all_employees
  }
}