const test = require("ava");
const parse = require("../src/importCSV");
const fs = require("fs");
const june = fs.readFileSync("./spec/fixtures/june.csv");

test("Parses the org name", t => {
  t.is(parse(june).orgName, "Starfleet WholeHealth Network");
});

test("Parses the payroll date", t => {
  t.is(parse(june).payrollDate, "Jun 13, 2020");
});

// t.deepEqual(parse(june), {
//   orgName: "Starfleet WholeHealth Network",
//   payrollDate: "Jun 13, 2020",
//   employees: [
//     {
//       name: "Picard, Jean-luc",
//       pay: [
//         {
//           type: "Regular",
//           hours: 100,
//           amount: "$2,379.00"
//         },
//         {
//           type: "Reimbursement",
//           hours: 0,
//           amount: "$4.33"
//         },
//         {
//           type: "Cell Phone Reim",
//           hours: 0,
//           amount: "$4.33"
//         }
//       ],
//       deductions: [
//         {
//           type: "401(k)",
//           amount: "$166.53"
//         }
//       ],
//       employeeTax: [],
//       companyTax: []
//     }
//   ]
// });
