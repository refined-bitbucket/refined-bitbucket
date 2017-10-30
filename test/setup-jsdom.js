'use strict';

import jsdom from 'jsdom';

const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.Element = dom.window._core.Element;
global.Text = dom.window._core.Text;

global.$ = global.jQuery = require('jquery');
