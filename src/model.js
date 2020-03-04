let fs = require('fs').promises
/**
 * @fileoverview Direct access to files (save, load, etc.) as well as housekeeping (cleaning up old files)
 * @since 0.2.1
 * @module Model
 */
/**
   * Take object (hash), turn into JSON, save to new file using an 
   * @param {object} data
   * @param {string} filename 
   */
function save(data, filename, folder) {
  const fileData = JSON.stringify(data)
  return fs.writeFile(newFileName(filename, folder), fileData)
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
  let d = new Date();
  let n = d.getTime();

  return `${folder}/${filename}${n}.json`
}
/**
 * Finds the most recent file of the specified type
 * @memberof module:Model~private_methods
 * @param {string} folder (arecord, crecord, or test)
 */
function findMostRecentFile(folder){
  return fs.readdir(`./data/${folder}`)
    .then(cleanUpOldFiles)
    .then(function(files) {
      files.sort().reverse();
      return(`./data/${folder}/${files[0]}`)});
}
/**
 * Removes old files.
 * @memberof module:Model~private_methods
 * @param {array} files 
 */
function cleanUpOldFiles(files) {
  return new Promise((resolve, _reject) => {
    if (files.length > 3) {
      fs.unlink(`${files[1]}`, function (err) {
        if (err) throw err;
      })
      
    }
    resolve(files)
  })
}
module.exports = { save, load }