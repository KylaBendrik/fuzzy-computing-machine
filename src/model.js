let fs = require('fs').promises
const path = require('path')
/**
 * @fileoverview Direct access to files (save, load, etc.) as well as housekeeping (cleaning up old files)
 * @since 0.2.1
 * @module model_behaviour
 */
/**
   * Take object (hash), turn into JSON, save to new file using an {@link module-model_behaviour:newFileName updated file name
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
 * Returns the filename with a timestamp, to help avoid caching issues
 * @private
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
 * @private
 * @param {string} type (arecord, crecord, or test)
 */
function findMostRecentFile(type){
  return fs.readdir(`./data/${type}`)
    .then(cleanUpOldFiles)
    .then(function(result) {
      files.sort().reverse();
      resolve(files[0])});
}
/**
 * Removes old files.
 * @private
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