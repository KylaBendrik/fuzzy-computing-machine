/* global VERSION, DESCRIPTION */

let fs = require("fs").promises;
const Path = require("path");
const ImportCSV = require("../src/importCSV.js")
const { dialog } = require("electron");

/**
 * @fileoverview Direct access to files (save, load, etc.) as well as housekeeping (cleaning up old files)
 * @since 0.2.1
 * @module Model
 */
function saveExport(all_data){
  console.log(JSON.stringify(all_data));
  let [file_name, data] = all_data;

  var options = {
    title: "Export File",
    defaultPath: `${file_name}`,
    buttonLabel: "Export",

    filters:[
      {name: "All Files", extensions: ["*"]}
    ]
  };

  return dialog
    .showSaveDialog( options)
    .then(({ filePath }) => fs.writeFile(filePath, `${data}`, "utf-8"));
}

function importCSV(){
  console.log("We are now in model.js")

  var options = {
    title: "Import CSV File",
    //defaultPath: ``,
    buttonLabel: "Import",

    filters:[
      {name: "Comma-Separated Values", extensions: ["csv"]}
    ]
  };

  data = dialog
  .showOpenDialog(options)
  //.then(({filePath}) => fs.readFile(filePath))

  return ImportCSV.parse(data)
  
}

/**
   * Take object (hash), turn into JSON, save to new file using an 
   * @param {object} data
   * @param {string} filename 
   */
function save(data, filename, folder) {
  console.log(`save(${data}, ${filename}, ${folder}) - model.js`);
  const fileData = JSON.stringify(data);
  const newFile = newFileName(filename, folder);
  return fs.writeFile(newFile, fileData);
}

const PACKAGE_DATA = {
  version: VERSION,
  description: DESCRIPTION
};

/**
 * Returns an object from the specified type of file
 * @param {string} folder (arecord, crecord, or test)
 * @returns {object} Entire JSON file as object. It's the duty of Dispatch to pick out the important pieces
 * @example
 * // returns { contact_name: 'Beth Jackson', contact_phone: '5305589183' }
 * load('test');
 */
function load(folder) {
  console.log(`load(${folder}): model.js`);

  if (folder == "packageInfo" || folder == "package_info") {
    return Promise.resolve(PACKAGE_DATA);
  } else {
    return findMostRecentFile(folder)
      .then(fs.readFile)
      .then(JSON.parse);
  }
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
  console.log(`newFileName(${filename}, ${folder}) - model.js`);
  let d = new Date();
  let n = d.getTime();

  console.log(`new file name: ${folder}/${filename}${n}.json`);
  return `data/${folder}/${filename}${n}.json`;
}

function makeDefaultFile(path) {
  return fs.writeFile(Path.join(path, "aaaa.json"), "{}");
}

function handleReadFailure(reason) {
  if (reason.code === "ENOENT") {
    return fs
      .mkdir(reason.path)
      .then(() => makeDefaultFile(reason.path));
  }

  throw reason;
}

/**
 * Finds the most recent file of the specified type
 * @memberof module:Model~private_methods
 * @param {string} folder (arecord, crecord, or test)
 */
function findMostRecentFile(folder) {
  console.log(`findMostRecentFile(${folder}) - model.js`);

  return fs.readdir(`./data/${folder}`)
    .catch(handleReadFailure)
    .then(result => cleanUpOldFiles(result, folder))
    .then(files => {
      files.sort().reverse();

      return `./data/${folder}/${files[0]}`;
    });
}

/**
 * Removes old files.
 * @memberof module:Model~private_methods
 * @param {array} files 
 */
function cleanUpOldFiles(files, folder) {
  console.log(`cleanUpOldFiles(${files}) - model.js`);

  if (files.length > 3) {
    // TODO: Why files[1]?
    fs.unlink(`data/${folder}/${files[1]}`);
  }

  return files;
}

module.exports = { save, load, saveExport, importCSV };
