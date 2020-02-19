let a_record = {
  record_type: {value: 'A', start: 1},
  contact_info_name: {value: 'unknown', start: 73},
  contact_info_phone: {value: 'unknown', start: 113},
  contact_info_email: {value: 'unknown', start: 138},
  contact_info_fax: {value: 'unknown', start: 314}
}

module.exports = {
  checkRecordType() {
    return a_record.record_type.value;
  },
  updateContactInfo(contact_hash) {
    a_record.contact_info_name.value  = contact_hash.name;
    a_record.contact_info_email.value = contact_hash.email;
    a_record.contact_info_phone.value = contact_hash.phone;
    a_record.contact_info_fax.value   = contact_hash.fax;

    return a_record
  },
  exportARecord(record){
    let record_array = []
    for (let step = 0; step < 340; step ++) {
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
  }
};
