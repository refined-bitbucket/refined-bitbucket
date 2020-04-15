import { h } from 'dom-chef'
import test from 'ava'
import delay from 'yoctodelay'

import '../../test/setup-jsdom'

import { insertShowComments } from '.'
import { stateShowComments } from './show-comments'

test('"Comments" button is displayed if diff has comments', t => {
    const diff = (
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
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    const expected = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div
                    class="diff-actions secondary"
                    id="side-by-side-1"
                    style={{ minWidth: 480, textAlign: 'right' }}
                >
                    <button
                        type="button"
                        class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
                        title="Toggle file comments"
                        original-title="Toggle file comments"
                    >
                        <span class="aui-icon aui-icon-small">
                            Toggle file comments
                        </span>
                    </button>
                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>
                    </div>
                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    insertShowComments(diff)

    t.is(diff.outerHTML, expected.outerHTML)
})

test('"Comments" button is displayed if diff has comments and on previous versions too', t => {
    // It's almost exactly the same as when the diff doesn't have
    // comments on previous version of the file,
    // except that here we don't add a `marginRight`
    const diff = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div class="diff-actions secondary" id="side-by-side-1">
                    <button
                        class="eclipsedcount aui-button aui-button-light aui-button-subtle"
                        data-module="components/tooltip"
                        original-title="4 comments on previous versions of this file"
                        resolved=""
                    >
                        <span class="aui-badge">4</span>
                    </button>

                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>
                    </div>
                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    const expected = (
        <section class="bb-udiff" data-filename="filename.js">
            <div class="heading">
                <div
                    class="diff-actions secondary"
                    id="side-by-side-1"
                    style={{ minWidth: 480, textAlign: 'right' }}
                >
                    <button
                        type="button"
                        class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
                        title="Toggle file comments"
                        original-title="Toggle file comments"
                        style={{ marginRight: 10 }}
                    >
                        <span class="aui-icon aui-icon-small">
                            Toggle file comments
                        </span>
                    </button>
                    <button
                        class="eclipsedcount aui-button aui-button-light aui-button-subtle"
                        data-module="components/tooltip"
                        original-title="4 comments on previous versions of this file"
                        resolved=""
                    >
                        <span class="aui-badge">4</span>
                    </button>

                    <div class="aui-buttons">
                        <button href="#side-by-side-1-content">
                            Side-by-side diff
                        </button>
                    </div>
                </div>
            </div>

            <div class="refract-content-container">
                <pre>var msg = 'Hello world';</pre>
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    insertShowComments(diff)

    t.is(diff.outerHTML, expected.outerHTML)
})

test('"Comments" button is displayed in the prior-comments modal next to the time status', t => {
    // It's almost exactly the same as when the diff doesn't have
    // comments on previous version of the file,
    // except that here we don't add a `marginRight`
    const diff = (
        <section class="diff-container">
            <div class="heading">
                <div class="diff-actions secondary">
                    <span class="aui-lozenge aui-lozenge-current aui-lozenge-subtle outdated">
                        outdated
                    </span>
                </div>
            </div>
            <div class="diff-content-container refract-container">
                <div class="refract-content-container">
                    <pre>var msg = 'Hello world';</pre>
                    <div class="comment-thread-container">
                        <li class="comment">
                            <p>Some comment</p>
                        </li>
                    </div>
                </div>
            </div>
        </section>
    )

    const expected = (
        <section class="diff-container">
            <div class="heading">
                <div
                    class="diff-actions secondary"
                    style={{ minWidth: 480, textAlign: 'right' }}
                >
                    <button
                        type="button"
                        class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
                        title="Toggle file comments"
                        original-title="Toggle file comments"
                        style={{ marginRight: 10 }}
                    >
                        <span class="aui-icon aui-icon-small">
                            Toggle file comments
                        </span>
                    </button>
                    <span class="aui-lozenge aui-lozenge-current aui-lozenge-subtle outdated">
                        outdated
                    </span>
                </div>
            </div>
            <div class="diff-content-container refract-container">
                <div class="refract-content-container">
                    <pre>var msg = 'Hello world';</pre>
                    <div class="comment-thread-container">
                        <li class="comment">
                            <p>Some comment</p>
                        </li>
                    </div>
                </div>
            </div>
        </section>
    )

    insertShowComments(diff)

    t.is(diff.outerHTML, expected.outerHTML)
})

test('"Comments" button is NOT displayed if diff has no comments', t => {
    const diff = (
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
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    const expected = diff.cloneNode(true)

    t.is(diff.outerHTML, expected.outerHTML)
})

test('Comments are shown or hidden when button is toggled', t => {
    const diff = (
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
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    insertShowComments(diff)

    // Assert
    const commentsContainer = diff.querySelector('.comment-thread-container')
    const showComments = diff.querySelector('.__rbb-show-comments')

    t.is(commentsContainer.style.display, '')

    showComments.dispatchEvent(new Event('click'))
    t.is(commentsContainer.style.display, 'none')

    showComments.dispatchEvent(new Event('click'))
    t.is(commentsContainer.style.display, '')
})

test('"Comments" button is added/removed when applicable if comments are added/removed', async t => {
    const diff = (
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
    )

    insertShowComments(diff)

    // Assert
    t.falsy(
        diff.querySelector('.__rbb-show-comments'),
        'button should not exist if there are no comments'
    )

    // Act
    diff.querySelector('.refract-content-container').appendChild(
        <div class="comment-thread-container">
            <li class="comment">
                <p>Some comment</p>
            </li>
        </div>
    )
    await delay(100)

    // Assert
    t.truthy(
        diff.querySelector('.__rbb-show-comments'),
        'button should exist if there are comments'
    )
    t.is(diff.querySelectorAll('.__rbb-show-comments').length, 1)

    // Act
    diff.querySelector('.refract-content-container').appendChild(
        <div class="comment-thread-container">
            <li class="comment">
                <p>Some comment</p>
            </li>
        </div>
    )
    await delay(100)

    // Assert
    t.truthy(
        diff.querySelector('.__rbb-show-comments'),
        'button should exist if there are comments'
    )
    t.is(diff.querySelectorAll('.__rbb-show-comments').length, 1)

    // Act
    ;[...diff.querySelectorAll('.comment-thread-container')].forEach(comment =>
        comment.remove()
    )
    await delay(100)

    t.falsy(
        diff.querySelector('.__rbb-show-comments'),
        'button should not exist if there are no comments'
    )
})

test('should not insert "Comments" button when diff failed to load', t => {
    const diff = (
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

    insertShowComments(diff)

    t.falsy(
        diff.querySelector('.__rbb-show-comments'),
        'button should not exist if diff failed to load'
    )
})

test('should show comments section if a new comment while comments are hidden', async t => {
    const diff = (
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
                <div class="comment-thread-container">
                    <li class="comment">
                        <p>Some comment</p>
                    </li>
                </div>
            </div>
        </section>
    )

    insertShowComments(diff)

    const showComments = diff.querySelector('.__rbb-show-comments')
    showComments.dispatchEvent(new Event('click'))

    // hidden
    diff.querySelectorAll('.comment-thread-container').forEach(comment => {
        t.is(comment.style.display, 'none')
    })

    // The button should hide comments, all comments should be hidden
    t.is(stateShowComments, false)

    // Add a comment
    diff.querySelector('.refract-content-container').appendChild(
        <div class="comment-thread-container">
            <li class="comment">
                <p>Some comment</p>
            </li>
        </div>
    )

    await delay(200)

    // The button should show comments
    t.is(stateShowComments, true)

    diff.querySelectorAll('.comment-thread-container').forEach(comment => {
        t.is(comment.style.display, '')
    })
})
