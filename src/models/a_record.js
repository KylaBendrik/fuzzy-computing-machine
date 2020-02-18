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
  record_type: 'A',
  contact_info: {
    name: 'unknown',
    email: 'unknown',
    phone: 'unknown',
    fax: 'unknown'
  }
}

module.exports = {
  checkRecordType() {
    return a_record.record_type;
  },
  updateContactInfo(contact_hash) {
    for (const property in contact_hash) {
      a_record.contact_info[property] = contact_hash[property]
    }
    return a_record
  }
};
