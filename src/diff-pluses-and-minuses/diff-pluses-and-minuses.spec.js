import test from 'ava';
import { h } from 'dom-chef';

import observeForWordDiffs from '../observe-for-word-diffs';
import removeDiffsPlusesAndMinuses, {
    execute
} from './diff-pluses-and-minuses';

import '../../test/setup-jsdom';

test('should remove pluses and minues for regular diff', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="refract-content-container">
                <div class="udiff-line addition">
                    <div class="gutter">
                        <a
                            href="#add-comment"
                            class="add-diff-comment add-line-comment"
                            title="Add a comment to this line"
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-add-comment">
                                Add a comment to this line
                            </span>
                        </a>
                        <a class="line-numbers" data-fnum="1" data-tnum="1" />
                    </div>
                    <pre class="source">+var msg = 'Hello world';</pre>
                </div>
                <div class="udiff-line common">
                    <pre class="source">white-space: nowrap;</pre>
                </div>
                <div class="udiff-line addition">
                    <pre class="source">
                        + + Constants.page_rma, this.bleReadData, false);
                    </pre>
                </div>
            </div>
        </section>
    );

    const expected = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="refract-content-container">
                <div class="udiff-line addition">
                    <div class="gutter">
                        <a
                            href="#add-comment"
                            class="add-diff-comment add-line-comment"
                            title="Add a comment to this line"
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-add-comment">
                                Add a comment to this line
                            </span>
                        </a>
                        <a class="line-numbers" data-fnum="1" data-tnum="1" />
                    </div>
                    <pre class="source">var msg = 'Hello world';</pre>
                </div>
                <div class="udiff-line common">
                    <pre class="source">white-space: nowrap;</pre>
                </div>
                <div class="udiff-line addition">
                    <pre class="source">
                        {' '}
                        + Constants.page_rma, this.bleReadData, false);
                    </pre>
                </div>
            </div>
        </section>
    );

    execute(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should remove pluses and minues for syntax highlighted diff', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="refract-content-container">
                <div class="udiff-line addition">
                    <div class="gutter">
                        <a
                            href="#add-comment"
                            class="add-diff-comment add-line-comment"
                            title="Add a comment to this line"
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-add-comment">
                                Add a comment to this line
                            </span>
                        </a>
                        <a class="line-numbers" data-fnum="1" data-tnum="1" />
                    </div>

                    <pre class="source language-jsx">
                        <span class="token operator">+</span>
                        <span class="token keyword">var</span> msg
                        <span class="token operator">=</span>
                        <span class="token string">'Hello world'</span>
                        <span class="token punctuation">;</span>
                    </pre>
                </div>
            </div>
        </section>
    );

    const expected = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="refract-content-container">
                <div class="udiff-line addition">
                    <div class="gutter">
                        <a
                            href="#add-comment"
                            class="add-diff-comment add-line-comment"
                            title="Add a comment to this line"
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-add-comment">
                                Add a comment to this line
                            </span>
                        </a>
                        <a class="line-numbers" data-fnum="1" data-tnum="1" />
                    </div>

                    <pre class="source language-jsx">
                        <span class="token operator"> </span>
                        <span class="token keyword">var</span> msg
                        <span class="token operator">=</span>
                        <span class="token string">'Hello world'</span>
                        <span class="token punctuation">;</span>
                    </pre>
                </div>
            </div>
        </section>
    );

    execute(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('line breaks are preserved with empty whitespace', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="refract-content-container">
                <div class="udiff-line addition">
                    <div class="gutter">
                        <a
                            href="#add-comment"
                            class="add-diff-comment add-line-comment"
                            title="Add a comment to this line"
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-add-comment">
                                Add a comment to this line
                            </span>
                        </a>
                        <a class="line-numbers" data-fnum="1" data-tnum="1" />
                    </div>
                    <pre class="source">+var msg = 'Hello world';</pre>
                    <pre class="source">+</pre>
                    <pre class="source">+var greeting = 'How are you?';</pre>
                </div>
            </div>
        </section>
    );

    const expected = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="refract-content-container">
                <div class="udiff-line addition">
                    <div class="gutter">
                        <a
                            href="#add-comment"
                            class="add-diff-comment add-line-comment"
                            title="Add a comment to this line"
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-add-comment">
                                Add a comment to this line
                            </span>
                        </a>
                        <a class="line-numbers" data-fnum="1" data-tnum="1" />
                    </div>
                    <pre class="source">var msg = 'Hello world';</pre>
                    <pre class="source"> </pre>
                    <pre class="source">var greeting = 'How are you?';</pre>
                </div>
            </div>
        </section>
    );

    execute(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should remove pluses and minuses when diff has been rerendered to include word diffs', async t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="diff-container">
                <div class="diff-content-container refract-container">
                    <div class="refract-content-container">
                        <div class="udiff-line addition">
                            <pre class="source">+var msg = 'Hello world';</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const expected = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="diff-container">
                <div class="diff-content-container refract-container word-diff">
                    <div class="refract-content-container">
                        <div class="udiff-line addition">
                            <pre class="source">var msg = 'Hello world';</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    //

    const afterWordDiff = observeForWordDiffs(uudiff);
    removeDiffsPlusesAndMinuses(uudiff, afterWordDiff);

    const diffContentContainer = uudiff.querySelector(
        'div.diff-container > div.diff-content-container.refract-container'
    );
    diffContentContainer.classList.add('word-diff');

    t.is(uudiff.outerHTML, expected.outerHTML);
});

test('should do nothing and not throw or error when diff fails to load', async t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="diff-message-container">
                <div class="aui-message info too-big-message">
                    <p class="title">
                        <span class="aui-icon icon-info" />
                        <strong class="try-again">
                            Oops! You've got a lot of code in this diff and it
                            couldn't load with the page.
                        </strong>
                        <a href="#" class="load-diff try-again">
                            Click here to give it another chance.
                        </a>
                        <strong class="try-again-failed">
                            Now that is a lot of code! There's simply too much
                            in this diff for us to render it all.
                        </strong>
                    </p>
                </div>
            </div>
        </section>
    );

    const expected = uudiff.cloneNode(true);

    execute(uudiff);

    t.is(uudiff.outerHTML, expected.outerHTML);
});
