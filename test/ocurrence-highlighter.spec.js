// https://github.com/avajs/ava/blob/master/docs/recipes/browser-testing.md

'use strict';

const test = require('ava');
const jsdom = require('jsdom');
const {h} = require('dom-chef');

const onHighlight = require('../src/occurrences-highlighter/occurrences-highlighter').onHighlight;

const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.Element = dom.window._core.Element;
global.Text = dom.window._core.Text;

global.$ = global.jQuery = require('jquery');

require('jquery-highlight');

test('basic' , t => {
    const container = 
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> Hello </pre>
            </div>
        </div>;

    console.log(container.innerHTML);

    const expected = 
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="highlight">Hello</span> </pre>
            </div>
        </div>;

    window.getSelection = () => ({
        anchorNode: container.querySelector('pre').firstChild,
        anchorOffset: 1,
        focusOffset: 6,
        toString: function() {
            return this.anchorNode.textContent.substr(this.anchorOffset, this.focusOffset - this.anchorOffset);
        },
    });

    debugger
    onHighlight(container);

    console.log(container.innerHTML);
    console.log(expected.innerHTML);
    t.pass();
    // t.true(container.isEqualNode(expected));
});

// t.true(div.isEqualNode(div2));

// https://github.com/algolia/expect-jsx
// chai-equal-jsx, assertions for chai: expect(<div />).to.equalJSX(<div />);
// chai-jsx, assertions for chai: expect(<div />).jsx.to.equal(<div />);
// jsx-chai, assertions for chai: expect(<div />).to.deep.equal(<div />);
// tape-jsx-equals, assertions for tape: t.jsxEquals(<div />, <div />);
// jasmine-expect-jsx, assertions for jasmine: expect(<div />).toEqualJSX(<div />);
