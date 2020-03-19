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
    'contactInfo': {folder: 'contact_info', keys: ['contact_email', 'contact_phone', 'contact_fax', 'contact_name']}
}
/**
 * Asks for hash to populate pages and forms
 * @param {string} infoGroup form type
 * @returns {object} returns useful hash for populating the form
 */
function loadData(infoGroup) {
  console.log('loadData: dispatch.js')
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
  console.log(`saveData(${infoGroup}, $data) dispatch.js`)
  const folder = INFOGROUPS[infoGroup].folder;
  // const keys = INFOGROUPS[infoGroup].keys;
  //we need to read the data, add in our bits, and then save everything
  return Model
  .load(folder)
  .then(oldData => {
    const newData = Object.assign({}, oldData, data)
    console.log(`folder inside promise: ${folder}`)
    return Model.save(newData, folder, folder)});
}
 
 module.exports = { loadData, saveData}