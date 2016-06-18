'use strict';
const test = require('tape');
const sourceHandler = require('../src/source-handler');

test('Changes <pre> element to <code> and wraps it in a <pre> element', t => {
    const pre = document.createElement('pre');
    pre.innerHTML = 'var hello = "world"';
    const result = sourceHandler.transformPreElement(pre);

    t.equal(result.nodeName, 'PRE', '<pre> element was created');
    t.equal(result.firstElementChild.nodeName, 'CODE', '<code> element was created inside <pre>');
    t.equal(result.firstElementChild.innerHTML, 'var hello = "world"', '<code> content is correct');

    t.end();
});
