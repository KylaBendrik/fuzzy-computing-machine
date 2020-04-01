const test = require('ava')
const Model = require('../src/model.js')

let testObj = {
  contact_name: 'Beth Jackson',
  contact_phone: '5305589183'
}

test('loading works', t => {
  return Model.load('test')
    .then(result => {
      t.deepEqual(result, testObj)
    })
})