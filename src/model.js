let fs = require('fs').promises
const { dialog } = require('electron');
/**
 * @fileoverview Direct access to files (save, load, etc.) as well as housekeeping (cleaning up old files)
 * @since 0.2.1
 * @module Model
 */
function saveExport(data){
  let d = new Date();
  let n = d.getTime(); 

  var options = {
    title: "Export File",
    defaultPath: `Export_${n}`,
    buttonLabel: "Export",

    filters:[
      {name: 'txt', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ]
  }

  return dialog
    .showSaveDialog( options)
    .then(({ filePath }) => fs.writeFile(filePath, data, 'utf-8'))
}
/**
   * Take object (hash), turn into JSON, save to new file using an 
   * @param {object} data
   * @param {string} filename 
   */
function save(data, filename, folder) {
  console.log(`save(${data}, ${filename}, ${folder}) - model.js`)
  const fileData = JSON.stringify(data)
  const newFile = newFileName(filename, folder)
  return fs.writeFile(newFile, fileData)
}
/**
 * Returns an object from the specified type of file
 * @param {string} folder (arecord, crecord, or test)
 * @returns {object} Entire JSON file as object. It's the duty of Dispatch to pick out the important pieces
 * @example
 * // returns { contact_name: 'Beth Jackson', contact_phone: '5305589183' }
 * load('test');
 */
function load(folder) {
  console.log(`load(${folder}) - model.js`)
  return findMostRecentFile(folder)
    .then(fs.readFile)
    .then(JSON.parse);
}
/**
 * 
 * @namespace private_methods
 */
/**
 * Returns the filename with a timestamp, to help avoid caching issues
 * @memberof module:Model~private_methods
 * @param {string} filename 
 * @returns {string} 
 */
function newFileName(filename, folder){
  console.log(`newFileName(${filename}, ${folder}) - model.js`)
  let d = new Date();
  let n = d.getTime();

  console.log(`new file name: ${folder}/${filename}${n}.json`)
  return `data/${folder}/${filename}${n}.json`
}
/**
 * Finds the most recent file of the specified type
 * @memberof module:Model~private_methods
 * @param {string} folder (arecord, crecord, or test)
 */
function findMostRecentFile(folder){
  console.log(`findMostRecentFile(${folder}) - model.js`)
  return fs.readdir(`./data/${folder}`)
    .then(result => cleanUpOldFiles(result, folder))
    .then(function(files) {
      files.sort().reverse();
      return(`./data/${folder}/${files[0]}`)});
}
/**
 * Removes old files.
 * @memberof module:Model~private_methods
 * @param {array} files 
 */
function cleanUpOldFiles(files, folder) {
  console.log(`cleanUpOldFiles(${files}) - model.js`)
  return new Promise((resolve, _reject) => {
    if (files.length > 3) {
      fs.unlink(`data/${folder}/${files[1]}`, function (err) {
        if (err) throw err;
      })
      
    }
    resolve(files)
  })
}
module.exports = { save, load, saveExport }