const test = require('ava')
const Model = require('../src/model.js')

let testObj = {
  contact_name: 'Beth Jackson',
  contact_phone: '5305589183'
}

test('resolves with data', t => {
  return Model.save(testObj, 'test/test')
  .then(result => {
    t.is(result, testObj)
  })
})