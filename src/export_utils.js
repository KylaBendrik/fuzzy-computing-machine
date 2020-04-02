const c_record_fields = [
  {field_name: "record_type", start: 1, size: 1, default: "C"},
  {field_name: "first_name", start: 11, size: 20, default: ""},
  {field_name: "middle_name", start: 31, size: 20, default: ""},
  {field_name: "last_name", start: 51, size: 35, default: ""},
  {field_name: "name_suffix", start: 86, size: 5, default: ""},
  {field_name: "address_1", start: 91, size: 35, default: ""},
  {field_name: "address_2", start: 126, size: 35, default: ""},
  {field_name: "city", start: 161, size: 20, default: ""},
  {field_name: "state", start: 181, size: 3, default: ""},
  {field_name: "zip", start: 184, size: 10, default: ""},
  {field_name: "country", start: 194, size: 2, default: ""}
]

function cRecordExport(employee){
  let arr = []
	for (var i = 0; i < 520; i++){
		arr.push(" ")
	}
  for (var field of c_record_fields){
		if (employee[field.field_name] != undefined) {
			let field_data_chars = employee[field.field_name].split("")
			let start = field.start
    	var i = 0
			for (var char of field_data_chars){
				arr[start + i] = field_data_chars[i]
				i = i + 1
			}
		}
	}
  return arr.join("")
}

function ReadyAllExports(cArray){
  result = []
  for (var line of cArray){
    result.push(cRecordExport(line))
  }
  return result.join("\n")
}




module.exports = { cRecordExport, ReadyAllExports }