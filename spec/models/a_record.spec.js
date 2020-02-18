const test = require('ava')

//import { hello } from 'src/models/a_record.js'
const hello = require('../../src/models/a_record')

test('Say Hi!', t => {
  t.is(hello()).toEqual('Hello, World!');
})