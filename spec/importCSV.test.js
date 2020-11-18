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

test("Parses the first employee", t => {
  june_parsed = parse(june)
  console.log(" -- Picard --")
  picard = june_parsed.employees[0]

  t.is(picard, {
          name: {
            first: "Jean-Luc",
            last: "Picard"
          },
          pay: [
            {
              type: "Regular",
              hours: 100,
              amount: "$2,379.00"
            },
            {
              type: "Reimbursement",
              hours: 0,
              amount: "$4.33"
            },
            {
              type: "Cell Phone Reim",
              hours: 0,
              amount: "$4.33"
            }
          ],
          deductions: [
            {
              type: "401(k)",
              amount: "$166.53"
            }
          ],
          employeeTax: [
            {
              type: "FIT",
              amount: "$86.25"
            },
            {
              type: "SS",
              amount: "$147.50"
            },
            {
              type: "Med",
              amount: "$34.50"
            },
            {
              type: "KS PIT",
              amount: "$76.15"
            }
          ],
          company_contributions: [],
          companyTax: [
            {
              type: "SS",
              amount: "$147.50"
            },
            {
              type: "Med",
              amount: "$34.50"
            },
            {
              type: "KS SUI",
              amount: "$64.23"
            }
          ]
        });
})

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
