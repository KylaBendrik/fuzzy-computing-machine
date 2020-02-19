const field_starts = {
  record_type: 1,
  contact_info_name: 73,
  contact_info_phone: 113,
  contact_info_fax: 314,
}

module.exports = {
  checkRecordType(record) {
    return record.record_type.value;
  },
  updateContactInfo(record, hash){
    for (const prop of Object.keys(hash)) {
      record[prop].value = hash[prop]
    }
    return record
  },
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
  saveARecord(record){
    return JSON.stringify(record)
  },
  readARecord(record_json){
    return JSON.parse(record_json)
  }
};
