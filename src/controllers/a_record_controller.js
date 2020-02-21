const field_starts = {
  record_type: 1,
  contact_info_name: 73,
  contact_info_phone: 113,
  contact_info_fax: 314,
}
const ARecord = require('../models/a_record');

module.exports = {
  /**
   * Simple test for validation
   * @param {object} record 
   * @returns 'A', 'C', or 'Z'
   */
  checkRecordType(record) {
    return record.record_type.value;
  },
  /**
   * This function is designed for future streamlining - it'll work with any size hash. 
   * @param {object} record Main record
   * @param {object} hash hash from form. May be quite small. 
   * @returns updated record
   */
  updateARecord(record, hash){
    console.log (record)
    for (const prop of Object.keys(hash)) {
      record[prop] = {value: hash[prop], start: field_starts[prop]}
    }
    // update database record
    ARecord.saveARecord(record)
    // return record
    return record
  },
  /**
   * This turns the a-record object into a fixed-width format
   * @param {object} record 
   * @returns an obscenely long string
   */
  exportARecord(record){
    let record_array = []
    for (let step = 0; step < 339; step ++) {
      record_array.push(" ")
    }

    // add info from a_record
    for (const prop of Object.values(record)) {
      value = prop.value;
      start = prop.start - 1;
      array = prop.value.split('')
      length = array.length;

      for (let step = 0; step < length; step ++) {
        record_array[start + step] = array[step]
      }
    }
    
  return record_array.join('')
  },
  /**
   * returns the most useful hash for whatever form is being displayed (contact info, payroll info, organization info...)
   * @param {object} record 
   * @param {string} form_type 
   */
  createFormDataObj(record, form_type){

  }
  
};
