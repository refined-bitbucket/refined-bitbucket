'use strict';

import jsdom from 'jsdom';

const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.Element = dom.window._core.Element;
global.Text = dom.window._core.Text;
global.HTMLTextAreaElement = dom.window._core.HTMLTextAreaElement;
global.HTMLDivElement = dom.window._core.HTMLDivElement;
global.requestAnimationFrame = fn => setTimeout(fn, 16);
global.cancelAnimationFrame = id => clearTimeout(id);

global.$ = global.jQuery = require('jquery');

// Remove this `closest` shim when this issue is resolved:
// https://github.com/tmpvar/jsdom/issues/1555
// https://github.com/tmpvar/jsdom/pull/1951
const NODE_TYPE = Object.freeze({
    ELEMENT_NODE: 1
});
window.Element.prototype.closest = window.Element.prototype.closest || function (selectors) {
    // https://dom.spec.whatwg.org/#dom-element-closest
    let el = this;
    while (el && el.nodeType === NODE_TYPE.ELEMENT_NODE) {
        if (el.matches(selectors)) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
};

// `scrollIntoView` not supported by jsdom,
// shim with a no-op
window.Element.prototype.scrollIntoView = () => {};
