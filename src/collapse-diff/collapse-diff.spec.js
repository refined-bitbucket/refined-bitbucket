import test from 'ava'
import { h } from 'dom-chef'

import { insertCollapseDiffButton } from './collapse-diff'

import '../../test/setup-jsdom'

const createNode = () => (
    <section class="bb-udiff" data-filename="filename.js">
        <div class="heading">
            <div class="diff-actions secondary" id="side-by-side-1">
                {/* "Side by side" and "View File" buttons */}
                <div class="aui-buttons">
                    <button href="#side-by-side-1-content">
                        Side-by-side diff
                    </button>

                    <a class="view-file ">View file</a>
                </div>

                {/* "Comment" button */}
                <div class="aui-buttons">
                    <button class="add-diff-comment add-file-comment">
                        Comment
                    </button>
                </div>

                {/* "More" button */}
                <div class="aui-buttons">
                    <button class="aui-dropdown2-trigger-more">
                        <span>More</span>
                    </button>
                </div>

                {/* "Collapse-diff" button should go here */}
            </div>
        </div>

        <div class="diff-message-container diff-message-container-skipped">
            <div class="aui-message aui-message-warning warning">
                <p class="title">
                    <strong>
                        Conflict: File modified in both source and destination
                    </strong>
                </p>
                To be able to merge you will need to resolve the conflicts
                manually.
                <a
                    target="_blank"
                    href="https://confluence.atlassian.com/x/M4H8KQ"
                >
                    Learn how
                </a>
                .
            </div>
        </div>

        <div class="diff-content-container refract-container">
            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>

                <div class="skipped-container">
                    <div class="line-numbers-skipped skipped-bottom last" />
                    <div class="skipped-bottom last">
                        {/* Location of the bottom button */}
                    </div>
                </div>
            </div>
        </div>
    </section>
)

test('should not re-insert collapse diff button if already present', t => {
    const uudiff = createNode()

    insertCollapseDiffButton(uudiff)
    insertCollapseDiffButton(uudiff)
    insertCollapseDiffButton(uudiff)
    insertCollapseDiffButton(uudiff)

    const buttons = uudiff.getElementsByClassName(
        '__refined_bitbucket_collapse_diff_button'
    )
    // One at the top, one at the bottom of the diff
    t.true(buttons.length === 2)
})

test('should insert TOP button in correct position when diff loads successfully', t => {
    const uudiff = createNode()

    insertCollapseDiffButton(uudiff)

    const button = uudiff.querySelector(
        'div.secondary.diff-actions div:nth-child(4) .__refined_bitbucket_collapse_diff_button'
    )

    t.truthy(button)
})

test('should insert BOTTOM button in correct position when diff loads successfully', t => {
    const uudiff = createNode()

    insertCollapseDiffButton(uudiff)

    const button = uudiff.querySelector(
        '.refract-content-container .skipped-container .skipped-bottom.last:last-child .__refined_bitbucket_collapse_diff_button'
    )

    t.truthy(button)
})

test('should insert BOTTOM button in correct position when diff has no more lines to show', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    {/* "Side by side" and "View File" buttons */}
                    <div class="aui-buttons" />

                    {/* "Comment" button */}
                    <div class="aui-buttons" />

                    {/* "More" button */}
                    <div class="aui-buttons">
                        <button class="aui-dropdown2-trigger-more">
                            <span>More</span>
                        </button>
                    </div>

                    {/* "Collapse-diff" button should go here */}
                </div>
            </div>

            <div class="diff-content-container refract-container">
                <div class="refract-content-container">
                    <pre>var msg = 'Hello world';</pre>

                    {/* If there are no more lines to show at the bottom of the diff,
                    there is no `<div class="skipped-container">` */}
                </div>
            </div>
        </section>
    )

    insertCollapseDiffButton(uudiff)

    const button = uudiff.querySelector(
        '.refract-content-container .skipped-container .skipped-bottom.last:last-child .__refined_bitbucket_collapse_diff_button'
    )

    t.truthy(button)
})

test('should toggle the diff, toggle messages, toggle the arrow icon and apply bottom border to heading', t => {
    // Arrange
    const uudiff = createNode()

    // Acting
    insertCollapseDiffButton(uudiff)

    const button = uudiff.querySelector(
        '.__refined_bitbucket_collapse_diff_button'
    )
    const diffContentContainer = uudiff.querySelector(
        'div.diff-content-container'
    )
    const diffMessageContainer = uudiff.querySelector(
        'div.diff-message-container'
    )
    const heading = uudiff.querySelector('div.heading')
    const upArrow = button.querySelector('svg[data-arrow-direction="up"]')
    const downArrow = button.querySelector('svg[data-arrow-direction="down"]')

    button.click()

    // Assering
    const hasClass = (node, className) =>
        [...node.classList].includes(className)
    const isHidden = node => hasClass(node, '__refined_bitbucket_hide')
    const hasBorder = node =>
        hasClass(node, '__refined_bitbucket_bottom_border')

    t.true(isHidden(diffContentContainer))
    t.true(isHidden(diffMessageContainer))
    t.true(isHidden(upArrow))
    t.true(!isHidden(downArrow))
    t.true(hasBorder(heading))

    // Acting
    button.click()

    // Assering
    t.false(isHidden(diffContentContainer))
    t.false(isHidden(diffMessageContainer))
    t.false(isHidden(upArrow))
    t.false(!isHidden(downArrow))
    t.false(hasBorder(heading))
})

test('should insert button in correct position if diff failed to load', t => {
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
    )

    insertCollapseDiffButton(uudiff)

    const button = uudiff.querySelector(
        'div.secondary.diff-actions .__refined_bitbucket_collapse_diff_button'
    )
    t.truthy(button)
})

test('should insert button in correct position if diff has prev version comments', t => {
    const uudiff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    {/* Previous versions comments */}
                    <button
                        class="eclipsedcount aui-button aui-button-light aui-button-subtle"
                        data-module="components/tooltip"
                        original-title="1 comment on previous versions of this file"
                    >
                        <span class="aui-badge">1</span>
                    </button>

                    {/* "Side by side" and "View File" buttons */}
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>
                        <a class="view-file aui-button aui-button-light">
                            View file
                        </a>
                    </div>

                    {/* "Comment" button */}
                    <div class="aui-buttons">
                        <button class="add-diff-comment add-file-comment aui-button aui-button-light">
                            Comment
                        </button>
                    </div>

                    {/* "More" button */}
                    <div class="aui-buttons">
                        <button class="aui-dropdown2-trigger-more">
                            <span>More</span>
                        </button>
                    </div>

                    {/* "Collapse-diff" button should go here */}
                </div>
            </div>
        </section>
    )

    insertCollapseDiffButton(uudiff)

    const button = uudiff.querySelector(
        'div.secondary.diff-actions div:nth-child(5) > button.__refined_bitbucket_collapse_diff_button'
    )

    t.truthy(button)
})
