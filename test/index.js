/* global document */

'use strict';
const test = require('tape');

test('whatever', t => {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn');

    t.equal(btn.getAttribute('class'), 'btn');
    t.end();
});
