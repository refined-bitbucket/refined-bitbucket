'use strict';

import {h} from 'dom-chef';
import test from 'ava';

import './setup-jsdom';

require('mutationobserver-shim');
global.MutationObserver = window.MutationObserver;

require('../extension/prism.js');

const {syntaxHighlight} = require('../src/syntax-highlight').default;

test('should syntax-highlight diff', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>
                    </div>
                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
            </div>
        </section>
    );

    const expected = (
        <section class="bb-udiff language-javascript" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">Side-by-side diff</button>
                    </div>
                </div>
            </div>

            <div class="refract-content-container">
                <pre class=" language-javascript">
                    <span class="token keyword">var</span> msg <span class="token operator">=</span> <span class="token string">'Hello world'</span><span class="token punctuation">;</span>
                </pre>
            </div>
        </section>
    );

    syntaxHighlight(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should syntax-highlight when side-by-side button not present', t => {
    // Deleted files and files that were only renamed don't have a side-by-side button
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            {/* no side-by-side button */}

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
            </div>
        </section>
    );

    const expected = (
        <section class="bb-udiff language-javascript" data-filename="filename.js">
            {/* no side-by-side button */}

            <div class="refract-content-container">
                <pre class=" language-javascript">
                    <span class="token keyword">var</span> msg <span class="token operator">=</span> <span class="token string">'Hello world'</span><span class="token punctuation">;</span>
                </pre>
            </div>
        </section>
    );

    syntaxHighlight(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should not syntax-highlight if file was only renamed with no changes', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            {/* no side-by-side button */}

            <div class="diff-content-container content-container">
                <div class="diff-note">
                    File renamed but contents unchanged.
                </div>
            </div>
        </section>
    );

    const expected = uudiff.cloneNode(true);

    syntaxHighlight(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should not syntax-highlight if diff failed to load', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="diff-message-container">
                <div class="aui-message info too-big-message">
                <p class="title">
                    <span class="aui-icon icon-info"></span>
                    <strong class="try-again">Oops! You've got a lot of code in this diff and it couldn't load with the page.</strong>
                    <a href="#" class="load-diff try-again">Click here to give it another chance.</a>
                    <strong class="try-again-failed">Now that is a lot of code! There's simply too much in this diff for us to render it all.</strong>
                </p>
                </div>
            </div>
        </section>
    );

    const expected = uudiff.cloneNode(true);

    syntaxHighlight(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should not syntax-highlight if diff is in a not supported language', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.unknown-extension">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>
                    </div>
                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
            </div>
        </section>
    );

    const expected = uudiff.cloneNode(true);

    syntaxHighlight(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});
