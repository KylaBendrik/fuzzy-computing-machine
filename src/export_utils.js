import c_record_fields from '../data/c_record_fields.json'
//import { load } from '../src/model.js';

function calculatePayRef(pr_ctr_id, pay_date, pay_period, payroll_run_ref){
  console.log("in calculatePayRef")
  console.log(pr_ctr_id)
  console.log(pr_ctr_id.slice(-4))
  let pay_date_translated = translate_date(pay_date)
  console.log(`pay_date: ${pay_date}`)
  console.log(`pay_date_translated: ${pay_date_translated}`)
  //console.log(translate_date(pay_date))
  let four_char_pr_id = pr_ctr_id.slice(-4)
  let two_digit_pay_year = pay_date_translated.substring(2, 4)
  return `${four_char_pr_id}${two_digit_pay_year}${pay_period}.${payroll_run_ref}`
}
function translate_date(date){
  console.log(`in translate_date: ${date}`)
  const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/
  if (regex.test(date) == true){
    console.log("match")
    return date.replace(/\D/g, "")
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate() + 1

  if (month.length == 1 || month < 10) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  console.log(`translated date: ${year}${month}${day}`)

  return `${year}${month}${day}`
}
function calculatePayPeriod(frequency){
  let today = new Date();
	let month = `${today.getMonth()+1}`
  // if monthly:
  return month
}

export function aRecordExport(contact_info, org_info, package_info, form_info){
  console.log("In A Record Export")
  console.log(`org_info: ${JSON.stringify(org_info)}`)
  console.log(`contact_info: ${JSON.stringify(contact_info)}`)
  console.log(`package_info: ${JSON.stringify(package_info)}`)
  console.log(`form_info: ${JSON.stringify(form_info)}`)
  
  let program_data = {
    software_version: package_info["version"],
    payroll_prog_name: package_info["description"],
    spec_version: '16.06B'
  }
  
  let aRecord = [
    {field_name: 'record_type', start: 1, value: 'A'},
    {field_name: 'payref', start: 2, value: calculatePayRef(org_info["pr_ctr_id"], 
                                                            form_info["pay_date"],
                                                            calculatePayPeriod("M"),
                                                            form_info["payroll_run_ref"],)},
    {field_name: 'pay_date', start: 14, value: translate_date(form_info["pay_date"])},
    {field_name: 'pr_ctr_id', start: 22, value: org_info["pr_ctr_id"]},
    {field_name: 'pr_ctr_name', start: 28, value: org_info["pr_ctr_name"]},
    {field_name: 'contact_name', start: 73, value: contact_info["contact_name"]},
    {field_name: 'contact_phone', start: 113, value: contact_info["contact_phone"]},
    {field_name: 'contact_email', start: 138, value: contact_info["contact_email"]},
    {field_name: 'spec_version', start: 183, value: program_data.spec_version},
    {field_name: 'pay_frequency', start: 189, value: form_info["pay_frequency"]},
    {field_name: 'notes', start: 190, value: form_info["notes"]},
    {field_name: 'filler_a1', start: 265, value: ''},
    {field_name: 'payroll_run_ref', start: 266, value: form_info['payroll_run_ref']},
    {field_name: 'software_version', start: 269, value: program_data.software_version},
    {field_name: 'filler_a2', start: 279, value: ''},
    {field_name: 'payroll_prog_name', start: 289, value: program_data.payroll_prog_name},
    {field_name: 'contact_fax', start: 314, value: contact_info["contact_fax"]}
  ]

  let arr = [];
  for (var i = 0; i < 340; i++){
    arr.push(" ")
  }
  for (var field of aRecord){
    let field_data_chars = field.value.split("")
    let start = field.start
    var i = 0
    for (var char of field_data_chars){
      arr[start + i] = char
      i = i + 1
    }
  }
  return [aRecord[1].value, arr.join("")]
}

export function cRecordExport(employee){
  console.log("cRecordExport, export_utils.js")
  console.log(JSON.stringify(employee))
  let arr = []
	for (var i = 0; i < 520; i++){
		arr.push(" ")
  }
  arr[0] = "C"
  for (var field of c_record_fields){
    console.log("Do we know the field?")
    console.log(JSON.stringify(field))
    let field_data_chars
		if (employee[field.field_id] != undefined) {
			field_data_chars = employee[field.field_id].split("")
    }
    else {
      field_data_chars = ""
    }
    let start = field.start
    	var i = 0
			for (var char of field_data_chars){
				arr[start + i - 1] = char
				i = i + 1
			}
	}
  return arr.join("")
}

export function readyAllExports(cArray, [file_name, aRecord]){
  let result = [aRecord]
  for (var line of cArray){
    result.push(cRecordExport(line))
  }
  return [file_name, result.join("\n")]
}
