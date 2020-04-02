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
    'employees': {folder: 'employees', keys:['employees']}
    }

function exportData(data) {
  console.log('reached exportData: dispatch.js')
  console.log(data)
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

  if (infoGroup === "employees"){

    return Model
    .load(folder)
    .then(oldData => {
      let employees_list = oldData["employees"]
      console.log(`Id: ${data.id}`)

      let old_employee = employees_list.find(element => element.id === data.id)

      if (old_employee != undefined){
        data = Object.assign({}, old_employee, data)
        employees_list = employees_list.filter(function(value, index, arr){
          return value.id != data.id
        })
      }
      console.log(`employees_list: ${JSON.stringify(employees_list)}; data: ${JSON.stringify(data)}`)
      
      employees_list.push(data)
      console.log(`pushed: ${JSON.stringify(employees_list)}`)
      return Model.save({employees: employees_list}, folder, folder)});

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

 
 module.exports = { loadData, saveData, exportData}