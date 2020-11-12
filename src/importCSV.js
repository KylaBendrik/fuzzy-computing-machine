const parseCSV = require("csv-parse/lib/sync");

function parseEmployee(employeeRows) {
  // do some stuff

  return {
    name: 'Jean-luc Picard',
    pay: []
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

  const allEmployees = [];

  for (let i = 0; i < employeeStarts.length; i++) {
    const start = employeeStarts[i];
    const next = employeeStarts[i + 1]; // the last one will be undefined

    // The last one works because next is undefined.
    const employeeData = allEmployeeData.slice(start, next);

    const employee = parseEmployee(employeeData);
    allEmployees.push(employee);
  }

  return { orgName, payrollDate, employees: allEmployees };
};
