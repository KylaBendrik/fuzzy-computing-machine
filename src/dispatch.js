const Model = require('../src/model.js')

/**
 * @fileoverview Functions to fit into ipcMain.on; take messages, send to model
 * @since 0.2.1
 * @module Dispatch
 */
/**
 * Lists folder and keys, to help loadData()
 * @constant
 */
 
const INFOGROUPS = {
    'test_onlyName': {folder: 'test', keys: ['contact_name']},
    'contactInfo': {folder: 'contact_info', keys: ['contact_email', 'contact_phone', 'contact_fax', 'contact_name']},
    'orgInfo': {folder: 'org_info', keys: ['pr_ctr_name', 'pr_ctr_id', 'pr_refs']},
    'employeesInfo': {folder: 'employees', keys:['employees']},
    'employees': {folder: 'employees', keys:['employees']},
    'packageInfo': {folder: 'package_info', keys:['version', 'description']},
    'delete_employee': {folder: 'employees', keys:['employees']},
    }

function exportData(data) {
  console.log('reached exportData: dispatch.js')
  console.log(JSON.stringify(data))
  return Model.saveExport(data)
}
/**
 * Asks for hash to populate pages and forms
 * @param {string} infoGroup form type
 * @returns {object} returns useful hash for populating the form
 */
function loadData(infoGroup) {
  console.log(`loadData(${infoGroup}): dispatch.js`)
  const folder = INFOGROUPS[infoGroup].folder;
  const keys = INFOGROUPS[infoGroup].keys;

  return Model.load(folder)
    .then(result =>
      keys.reduce((acc, key) => ({ ...acc, [key]: result[key] }), {})
    );
}
/**
 * Gently saves the data
 * @param {string} infoGroup form type
 * @param {object} data hash
 */
function saveData(infoGroup, data) {
  
  const folder = INFOGROUPS[infoGroup].folder;
  console.log("----- RUNNING SAVEDATA IN DISPATCH -----")
  console.log(`infogroup: ${infoGroup}`)
  console.log(`data: ${JSON.stringify(data)}`)

  if (infoGroup === "employees"){
    return Model
    .load(folder)
    .then(loaded_data => {
      console.log(`loaded_data: ${JSON.stringify(loaded_data)}`)
      let list_of_employees = loaded_data["employees"]
      
      // if new employee, create ID

      let updated_employee = data

      if (data.id == undefined){
        // This is a new Employee
        updated_employee.id = newID(list_of_employees)
      } else {
        console.log("This person already exists. Thus, I shall render unto you the list containing all but this person.")
        list_of_employees = list_of_employees.filter(person => person.id !== data.id)
      }

      console.log(`updated_employee: ${JSON.stringify(updated_employee)}`)
      // push updated employee
      list_of_employees.push(updated_employee)

      return Model.save({employees: list_of_employees}, folder, folder);
    })
  } else if(infoGroup === "delete_employee"){
    console.log("------REMOVING EMPLOYEE------")
    return Model
      .load(folder)
      .then(oldData => {
        let employees_list = oldData["employees"]

        let filtered_list = employees_list.filter(person => person.id !== data.id)

        console.log("filtered_list:")
        console.log(JSON.stringify(filtered_list))

        return Model.save({employees: filtered_list}, folder, folder)});
  } else {
    // const keys = INFOGROUPS[infoGroup].keys;
    //we need to read the data, add in our bits, and then save everything
    return Model
    .load(folder)
    .then(oldData => {
      const newData = Object.assign({}, oldData, data)
      return Model.save(newData, folder, folder)});
  }
  
}

function newID(list_of_employees){
  console.log(JSON.stringify(list_of_employees))
  let sorted_list = list_of_employees.sort((a, b) => (a.id > b.id) ? -1 : 1)
  console.log(sorted_list[0])
  let new_id
  if (sorted_list[0] == undefined){
    new_id = 0
  } else {
    new_id = sorted_list[0].id + 1
  }

  console.log(`I will return a new ID of ${new_id}. It is my duty.`)
  
  return new_id
}

 
 module.exports = { loadData, saveData, exportData}