'use strict';
const test = require('ava');
const { getExtension } = require('../src/syntax-highlight/source-handler');

test('get extension', t => {
    t.is('.java', getExtension('/path/to/whatever/file.java'));
    t.is('.go', getExtension('/path/to/whatever/file.go'));
    t.is('.html', getExtension('/path/to/whatever/file.html'));
});
