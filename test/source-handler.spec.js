'use strict';
const test = require('tape');
const sourceHandler = require('../src/syntax-highlight/source-handler');

test('Changes <pre> element to <code> and wraps it in a <pre> element', t => {
    const pre = document.createElement('pre');
    pre.innerHTML = 'var hello = "world"';
    const result = sourceHandler.getCodeElementFromPre(pre);

    t.equal(result.nodeName, 'CODE', '<code> element created');
    t.equal(result.innerHTML, 'var hello = "world"', '<code> content is correct');

    t.end();
});

test('Adds a language-xxxx class to the element that has a data-filename attr', t => {
    const element = document.createElement('div');
    element.setAttribute('data-filename', 'z/path/to/file/the-file.java');
    const languageClass = sourceHandler.getClassBasedOnExtension(element);
    t.equal(languageClass, 'language-java', 'proper language-xxxx class added to the element');
    t.end();
});
