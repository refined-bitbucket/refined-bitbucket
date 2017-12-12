import test from 'ava';
import {h} from 'dom-chef';
// import delay from 'yoctodelay';
// import elementReady from 'element-ready';

import collapseDiff from '../src/collapse-diff/collapse-diff';

import './setup-jsdom';

test('should not re-insert collapse diff button if already present', async t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    {/* "Side by side" and "View File" buttons */}
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>

                        <a class="view-file ">
                            View file
                        </a>
                    </div>

                    {/* "Comment" button */}
                    <div class="aui-buttons">
                        <button class="add-diff-comment add-file-comment">
                            Comment
                        </button>
                    </div>

                    {/* "More" button */}
                    <div class="aui-buttons">
                        <button>
                            <span>More</span>
                        </button>
                    </div>

                    {/* "Collapse-diff" button */}
                    <div class="aui-buttons">
                        <button class="__refined_bitbucket_collapse_diff_button" aria-label="Toggle diff text" title="Toggle diff text">
                        </button>
                    </div>

                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
            </div>
        </section>
    );

    collapseDiff.insertCollapseDiffButton(uudiff);

    const buttons = uudiff.getElementsByClassName('__refined_bitbucket_collapse_diff_button');
    t.true(buttons.length === 1);
});

test('should insert button in correct position when diff loads successfully', async t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    {/* "Side by side" and "View File" buttons */}
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>

                        <a class="view-file ">
                            View file
                        </a>
                    </div>

                    {/* "Comment" button */}
                    <div class="aui-buttons">
                        <button class="add-diff-comment add-file-comment">
                            Comment
                        </button>
                    </div>

                    {/* "More" button */}
                    <div class="aui-buttons">
                        <button>
                            <span>More</span>
                        </button>
                    </div>

                    {/* "Collapse-diff" button should go here */}

                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
            </div>
        </section>
    );

    collapseDiff.insertCollapseDiffButton(uudiff);

    const button = uudiff.querySelector('div.secondary.diff-actions div:nth-child(4)');

    t.truthy(button.querySelector('.__refined_bitbucket_collapse_diff_button'));
});

test('should insert button in correct position if diff failed to load', async t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading ">
                <div class="primary">
                    <h1 class="filename">filename.js</h1>
                </div>

                <div class="secondary diff-actions">
                    {/* This is empty when the diff fails to load */}
                </div>
            </div>

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

    collapseDiff.insertCollapseDiffButton(uudiff);

    const button = uudiff.querySelector('div.secondary.diff-actions .__refined_bitbucket_collapse_diff_button');
    t.truthy(button);
});

test.failing('should hide the diff', t => {
    t.fail();
});

test.failing('should hide the diff when it\'s only file rename', t => {
    t.fail();
});

test.failing('should hide the diff when file contents are unchanged (only whitespaces)', t => {
    t.fail();
});


test.failing('should hide diff messages', t => {
    t.fail();
});

test.failing('should add bottom-border to heading when collapsed', t => {
    t.fail();
});

test.failing('should change button svg icon when clicked', t => {
    t.fail();
});
