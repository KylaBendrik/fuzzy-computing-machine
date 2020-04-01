const test = require('ava')
const Dispatch = require('../src/dispatch.js')

test('resolves with contact info', t => {
  return Dispatch.loadData('test_onlyName')
    .then(result => {
      t.deepEqual(result, {contact_name: 'Beth Jackson'})
    })
})