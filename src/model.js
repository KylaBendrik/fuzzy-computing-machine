let fs = require('fs').promises
/**
 * @fileoverview Direct access to files (save, load, etc.) as well as housekeeping (cleaning up old files)
 * @since 0.2.1
 * @module Model_Behaviour
 */
/**
   * Take object (hash), turn into JSON, save to new file using an 
   * @param {object} data
   * @param {string} filename 
   */
function save(data, filename) {
  const fileData = JSON.stringify(data)
  return fs.writeFile(newFileName(filename), fileData)
}
/**
 * Returns an object from the specified type of file
 * @param {string} type (arecord, crecord, or test)
 */
function load(type) {
  return findMostRecentFile(type)
    .then(fs.readFile)
    .then(JSON.parse);
}
/**
 * 
 * @namespace private_methods
 */
/**
 * Returns the filename with a timestamp, to help avoid caching issues
 * @memberof module:Model_Behaviour~private_methods
 * @param {string} filename 
 * @returns {string} 
 */
function newFileName(filename){
  let d = new Date();
  let n = d.getTime();

  return `src/data/${filename}${n}.json`
}
/**
 * Finds the most recent file of the specified type
 * @memberof module:Model_Behaviour~private_methods
 * @param {string} type (arecord, crecord, or test)
 */
function findMostRecentFile(type){
  return fs.readdir(`./data/${type}`)
    .then(cleanUpOldFiles)
    .then(function(files) {
      files.sort().reverse();
      resolve(files[0])});
}
/**
 * Removes old files.
 * @memberof module:Model_Behaviour~private_methods
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