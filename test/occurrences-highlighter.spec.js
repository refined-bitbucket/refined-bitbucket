import test from 'ava';
import {h} from 'dom-chef';

import './setup-jsdom';

import {highlightOccurrences} from '../src/occurrences-highlighter/occurrences-highlighter';

// Necessary custom mockings
document.createRange = () => ({
    selectNodeContents: () => {}
});
const _selectionCommon = {
    removeAllRanges: () => {},
    addRange: () => {},
    toString() {
        return this.anchorNode.textContent.substr(this.anchorOffset, this.focusOffset - this.anchorOffset);
    }
};

test('highlighting one occurrence', t => {
    const container =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> Hello </pre>
            </div>
        </div>;

    const expected =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> </pre>
            </div>
        </div>;

    window.getSelection = () => ({
        ..._selectionCommon,
        anchorNode: container.querySelector('pre').firstChild,
        anchorOffset: 1,
        focusOffset: 6
    });

    highlightOccurrences(container);

    t.is(container.innerHTML, expected.innerHTML);
});

test('highlighting two occurrences', t => {
    const container =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> Hello and Hello again </pre>
            </div>
        </div>;

    const expected =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> and <span class="__refined_bitbucket_highlight">Hello</span> again </pre>
            </div>
        </div>;

    window.getSelection = () => ({
        ..._selectionCommon,
        anchorNode: container.querySelector('pre').firstChild,
        anchorOffset: 1,
        focusOffset: 6
    });

    highlightOccurrences(container);

    t.is(container.innerHTML, expected.innerHTML);
});

test('highlighting two occurrences in differente nodes', t => {
    const container =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> Hello </pre>
                <pre> Hello </pre>
            </div>
        </div>;

    const expected =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> </pre>
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> </pre>
            </div>
        </div>;

    window.getSelection = () => ({
        ..._selectionCommon,
        anchorNode: container.querySelector('pre').firstChild,
        anchorOffset: 1,
        focusOffset: 6
    });

    highlightOccurrences(container);

    t.is(container.innerHTML, expected.innerHTML);
});

test('when selected word is inside a comment editing box (textarea)', t => {
    const container =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> Hello </pre>

                <div class="markItUpContainer">
                    <textarea></textarea>
                </div>

            </div>
        </div>;

    const expected =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> </pre>

                <div class="markItUpContainer">
                    <textarea></textarea>
                </div>

            </div>
        </div>;

    window.getSelection = () => ({
        ..._selectionCommon,
        anchorNode: container.querySelector('div.markItUpContainer'),
        anchorOffset: 1,
        focusOffset: 1,
        toString: () => 'Hello'
    });

    highlightOccurrences(container);

    t.is(container.innerHTML, expected.innerHTML);
});

test('selecting whitespace should not do anything', t => {
    const container =
        <div class="diff-container">
            <div class="diff-content-container">
                {/* eslint-disable no-multi-spaces*/}
                <pre>                                                           </pre>
                <pre> Hello </pre>
            </div>
        </div>;

    const expected =
        <div class="diff-container">
            <div class="diff-content-container">
                {/* eslint-disable no-multi-spaces*/}
                <pre>                                                           </pre>
                <pre> Hello </pre>
            </div>
        </div>;

    window.getSelection = () => ({
        ..._selectionCommon,
        anchorNode: container.querySelector('pre').firstChild,
        anchorOffset: 2,
        focusOffset: 3
    });

    highlightOccurrences(container);

    t.is(container.innerHTML, expected.innerHTML);
});

test('selecting already highlighted word should not remove it', t => {
    const container =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> and <span class="__refined_bitbucket_highlight">Hello</span> again </pre>

            </div>
        </div>;

    const expected =
        <div class="diff-container">
            <div class="diff-content-container">
                <pre> <span class="__refined_bitbucket_highlight">Hello</span> and <span class="__refined_bitbucket_highlight">Hello</span> again </pre>
            </div>
        </div>;

    window.getSelection = () => ({
        ..._selectionCommon,
        anchorNode: container.querySelector('span').firstChild,
        anchorOffset: 0,
        focusOffset: 5
    });

    highlightOccurrences(container);

    t.is(container.innerHTML, expected.innerHTML);
});

// Evaluate to use 'dom-compare' package
// https://github.com/algolia/expect-jsx
// chai-equal-jsx, assertions for chai: expect(<div />).to.equalJSX(<div />);
// chai-jsx, assertions for chai: expect(<div />).jsx.to.equal(<div />);
// jsx-chai, assertions for chai: expect(<div />).to.deep.equal(<div />);
// tape-jsx-equals, assertions for tape: t.jsxEquals(<div />, <div />);
// jasmine-expect-jsx, assertions for jasmine: expect(<div />).toEqualJSX(<div />);
// https://github.com/avajs/ava/blob/master/docs/recipes/browser-testing.md
