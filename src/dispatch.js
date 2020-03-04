const Model = require('../src/model.js')

/**
 * @fileoverview Functions to fit into ipcMain.on; take messages, send to model
 * @since 0.2.1
 * @module Dispatch
 */
/**
 * @constant
 */
const INFOGROUPS = {
    'test_onlyName': {folder: 'test', keys: ['contact_name']},
    'contact info': {folder: 'arecord', keys: ['contact_email', 'contact_phone', 'contact_fax', 'contact_name']}
}
/**
 * Asks for hash to populate pages and forms
 * @param {string} infoGroup form type
 * @returns {object} returns useful hash for populating the form
 */
function loadData(infoGroup) {
  const folder = INFOGROUPS[infoGroup].folder;
  const keys = INFOGROUPS[infoGroup].keys;
  return Model.load(folder)
    .then(result =>
      keys.reduce((acc, key) => ({ ...acc, [key]: result[key] }), {})
    );
}
 
 module.exports = { loadData }