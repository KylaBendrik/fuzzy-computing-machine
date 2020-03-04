let fs = require('fs').promises
const path = require('path')
/**
 * @module model_behaviour
 */
/**
   * Take object (hash), turn into JSON, save to new file
   * @param {object} data
   * @param {string} filename 
   */
function save(data, filename) {
  //first, change data into JSON
  const fileData = JSON.stringify(data)
  return fs.writeFile(newFileName(filename), fileData)
}
/**
 * Returns an object from the specified type 
 * @param {string} type (arecord, crecord, or test)
 */
function load(type) {
  return findMostRecentFile(type)
    .then(fs.readFile)
    .then(JSON.parse);
}

/**
 * Returns the filename with a timestamp, to help avoid caching issues
 * @param {string} filename 
 * @returns {string} 
 */
function newFileName(filename){
  let d = new Date();
  let n = d.getTime();

  return `src/data/${filename}${n}.json`
}


module.exports = { save, load }