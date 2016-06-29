'use strict';
const test = require('tape');
const getExtension = require('../src/get-extension');

test('get extension', t => {
    t.equal('.java', getExtension('/path/to/whatever/file.java'));
    t.equal('.go', getExtension('/path/to/whatever/file.go'));
    t.equal('.html', getExtension('/path/to/whatever/file.html'));
    t.end();
});
