import { h } from 'dom-chef'
import test from 'ava'
import delay from 'yoctodelay'

import insertShowComments from '.'

import '../../test/setup-jsdom'
import 'selector-observer'

test('"Comments" checkbox is displayed if diff has comments', t => {
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
                    <span className="__rbb-show-comments">
                        <label style={{ fontSize: 12, marginRight: 10 }}>
                            <input type="checkbox" checked />
                            Comments
                        </label>
                    </span>
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

test('"Comments" checkbox is displayed if diff has comments and on previous versions too', t => {
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
                    <span className="__rbb-show-comments">
                        <label style={{ fontSize: 12 }}>
                            <input type="checkbox" checked />
                            Comments
                        </label>
                    </span>
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

test('"Comments" checkbox is NOT displayed if diff has no comments', t => {
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

test('Comments are shown or hidden when checkbox is toggled', t => {
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
    const showComments = diff.querySelector('.__rbb-show-comments input')

    t.is(commentsContainer.style.display, '')

    showComments.checked = false
    showComments.dispatchEvent(new Event('change'))
    t.is(commentsContainer.style.display, 'none')

    showComments.checked = true
    showComments.dispatchEvent(new Event('change'))
    t.is(commentsContainer.style.display, '')
})

test('"Comments" checkbox is added/removed when applicable if comments are added/removed', async t => {
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
        'checkbox should not exist if there are no comments'
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
        'checkbox should exist if there are comments'
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
        'checkbox should exist if there are comments'
    )
    t.is(diff.querySelectorAll('.__rbb-show-comments').length, 1)

    // Act
    ;[...diff.querySelectorAll('.comment-thread-container')].forEach(comment =>
        comment.remove()
    )
    await delay(100)

    t.falsy(
        diff.querySelector('.__rbb-show-comments'),
        'checkbox should not exist if there are no comments'
    )
})

test('should not insert "Comments" checkbox when diff failed to load', t => {
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
        'checkbox should not exist if diff failed to load'
    )
})

test('should re-enable Comments if a new comment is submitted', async t => {
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

    // Add a comment
    diff.querySelector('.refract-content-container').appendChild(
        <div class="comment-thread-container">
            <li class="comment">
                <p>Some comment</p>
            </li>
        </div>
    )

    // Hide the comments by un-checking the checkbox
    const showComments = diff.querySelector('.__rbb-show-comments input')
    showComments.checked = false
    showComments.dispatchEvent(new Event('change'))

    diff.querySelectorAll('.comment-thread-container').forEach(comment => {
        t.is(comment.style.display, 'none')
    })

    // Add a new comment
    diff.querySelector('.refract-content-container').appendChild(
        <div class="comment-thread-container">
            <li class="comment">
                <p>Some comment</p>
            </li>
        </div>
    )

    await delay(100)

    // The checkbox should be enabled, and all comments should be visible
    t.is(showComments.checked, true)

    diff.querySelectorAll('.comment-thread-container').forEach(comment => {
        t.is(comment.style.display, '')
    })
})
