import test from 'ava';
import {h} from 'dom-chef';

import collapseDiff from '../src/collapse-diff/collapse-diff';

import './setup-jsdom';

const createNode = () => (
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

        <div class="diff-message-container diff-message-container-skipped">
            <div class="aui-message aui-message-warning warning">
                <p class="title">
                <strong>Conflict: File modified in both source and destination</strong>
                </p>

                To be able to merge you will need to resolve the conflicts manually.
                <a target="_blank" href="https://confluence.atlassian.com/x/M4H8KQ">Learn how</a>.

            </div>
        </div>

        <div class="diff-content-container refract-container">
            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
            </div>
        </div>
    </section>
);

test('should not re-insert collapse diff button if already present', async t => {
    const uudiff = createNode();

    collapseDiff.insertCollapseDiffButton(uudiff);
    collapseDiff.insertCollapseDiffButton(uudiff);
    collapseDiff.insertCollapseDiffButton(uudiff);

    const buttons = uudiff.getElementsByClassName('__refined_bitbucket_collapse_diff_button');
    t.true(buttons.length === 1);
});

test('should insert button in correct position when diff loads successfully', async t => {
    const uudiff = createNode();

    collapseDiff.insertCollapseDiffButton(uudiff);

    const button = uudiff.querySelector('div.secondary.diff-actions div:nth-child(4)');

    t.truthy(button.querySelector('.__refined_bitbucket_collapse_diff_button'));
});

test('should toggle the diff, toggle messages, toggle the arrow icon and apply bottom border to heading', t => {
    // Arrange
    const uudiff = createNode();

    // Acting
    collapseDiff.insertCollapseDiffButton(uudiff);

    const button = uudiff.querySelector('.__refined_bitbucket_collapse_diff_button');
    const diffContentContainer = uudiff.querySelector('div.diff-content-container');
    const diffMessageContainer = uudiff.querySelector('div.diff-message-container');
    const heading = uudiff.querySelector('div.heading');
    const upArrow = button.querySelector('svg[data-arrow-direction="up"]');
    const downArrow = button.querySelector('svg[data-arrow-direction="down"]');

    button.click();

    // Assering
    const hasClass = (node, className) => Array.from(node.classList).includes(className);
    const isHidden = node => hasClass(node, '__refined_bitbucket_hide');
    const hasBorder = node => hasClass(node, '__refined_bitbucket_bottom_border');

    t.true(isHidden(diffContentContainer));
    t.true(isHidden(diffMessageContainer));
    t.true(isHidden(upArrow));
    t.true(!isHidden(downArrow));
    t.true(hasBorder(heading));

    // Acting
    button.click();

    // Assering
    t.false(isHidden(diffContentContainer));
    t.false(isHidden(diffMessageContainer));
    t.false(isHidden(upArrow));
    t.false(!isHidden(downArrow));
    t.false(hasBorder(heading));
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
