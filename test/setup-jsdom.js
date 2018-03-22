'use strict';

import { URL, URLSearchParams } from 'url';
import jsdom from 'jsdom';

const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.NodeList = dom.window.NodeList;
global.Element = dom.window.Element;
global.Text = dom.window.Text;
global.HTMLDivElement = dom.window.HTMLDivElement;
global.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
global.HTMLSpanElement = dom.window.HTMLSpanElement;
global.HTMLCollection = dom.window.HTMLCollection;
global.DocumentFragment = dom.window.DocumentFragment;

global.requestAnimationFrame = fn => setTimeout(fn, 16);
global.cancelAnimationFrame = id => clearTimeout(id);

global.URL = URL;
global.URLSearchParams = URLSearchParams;
global.location = new URL('https://www.bitbucket.org');

global.Headers = function() {};

global.$ = global.jQuery = require('jquery');

// Remove this `closest` shim when this issue is resolved:
// https://github.com/tmpvar/jsdom/issues/1555
// https://github.com/tmpvar/jsdom/pull/1951
const NODE_TYPE = Object.freeze({
    ELEMENT_NODE: 1
});
window.Element.prototype.closest =
    window.Element.prototype.closest ||
    function(selectors) {
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

require('mutationobserver-shim');

global.MutationObserver = window.MutationObserver;
