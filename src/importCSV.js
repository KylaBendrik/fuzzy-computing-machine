const parseCSV = require("csv-parse/lib/sync");

function parseEmployee(employeeRows) {
  const employee = {
    name: {
      first: "",
      last: ""
    },
    pay: [],
    deductions: [],
    employeeTaxes: [],
    companyContributions: [],
    companyTaxes: []
  };

  return parseRows(employee, employeeRows);
}

function parseRows(employee, [row, ...rest]) {
  if (row[0].trim() !== "") {
    employee.name = parseColA(employee.name, row[0]);
  } 
  if (row[1].trim() !== "") {
    employee.pay.push(parsePay(row[1], row[2], row[3]));
  }
  if (row[4].trim() !== "") {
    employee.deductions.push(parseOther(row[4], row[5]));
  }
  if (row[6].trim() !== "") {
    employee.employeeTaxes.push(parseOther(row[6], row[7]));
  }
  if (row[8].trim() !== "") {
    employee.companyContributions.push(parseOther(row[8], row[9]));
  }
  if (row[10].trim() !== "") {
    employee.companyTaxes.push(parseOther(row[10], row[11]));
  }

  if (rest.length > 0) {
    return parseRows(employee, rest);
  } else {
    // console.log(employee);
    return employee;
  }
}

function parseColA(name_obj, cell) {
  const rows = cell.split("\n");
  const [name, ..._rest] = rows.map(row => row.trim());
  const name_parts = name.split(", ");

  if (name_parts.length == 1) {
    name_obj.last = name_parts[0];
  } else if (name_parts.length == 2) {
    name_obj.first = name_parts[1];
    name_obj.last = name_parts[0];
  }

  return name_obj;
}

function parsePay(type, hrs, amt) {
  return {
    type: type,
    hours: hrs,
    amount: amt
  };
}

function parseOther(type, amt) {
  return {
    type: type.trim(),
    amount: amt.trim()
  };
}

module.exports = function parse(rawString) {
  const data = parseCSV(rawString);

  const orgName = data[0][0];
  const payrollDate = data[4][0];

  const footerRow = data.findIndex(row => row[0] === "Total");
  const allEmployeeData = data.slice(5, footerRow);
  const footerData = data.slice(footerRow);

  const employeeStarts =
    allEmployeeData
      .map((row, id) => row[0].trim().length > 0 ? id : "blank")
      .filter(maybeId => maybeId !== "blank");

  var allEmployees = [];

  for (let i = 0; i < employeeStarts.length; i++) {
    const start = employeeStarts[i];
    const next = employeeStarts[i + 1]; // the last one will be undefined

    // The last one works because next is undefined.
    const employeeData = allEmployeeData.slice(start, next);

    allEmployees.push(parseEmployee(employeeData));
  }

  return { orgName, payrollDate, employees: allEmployees };
};
