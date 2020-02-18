// class ARecord
//   def add_contact_info <-- Goal one: take hash, add to object
//   end
//   def stringify <-- Goal two: take object, put into correct spots in string
//   end
// end

// let contactInfo = {
//   name: 'Contact Name',
//   phone: '999-999-9999',
//   email: 'example@example.com',
//   fax: '111-111-1111'
// }
let a_record = {
  record_type: {value: 'A', start: 1, size: 1},
  contact_info_name: {value: 'unknown', start: 73, size: 40},
  contact_info_phone: {value: 'unknown', start: 113, size: 25},
  contact_info_email: {value: 'unknown', start: 138, size: 25},
  contact_info_fax: {value: 'unknown', start: 314, size: 25}
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
      // size = prop.size; not sure we need here?
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
