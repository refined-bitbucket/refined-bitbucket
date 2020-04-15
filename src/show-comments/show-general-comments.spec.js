import { h } from 'dom-chef'
import test from 'ava'
import delay from 'yoctodelay'

import '../../test/setup-jsdom'

import { insertShowGeneralComments } from '.'
import { stateShowComments } from './show-general-comments'

test('"Comments" button is displayed if it has comments', t => {
    const diff = (
        <section id="general-comments" class="main">
            <h1>
                Comments (<span class="comment-count">4</span>)
            </h1>
            <ol id="comments-list" class="comments-list line-commenting">
                <li class="comment">
                    <article id="comment-145003814" class="iterable-item">
                        Some comment
                    </article>
                </li>
            </ol>
        </section>
    )

    const expected = (
        <section id="general-comments" class="main">
            <h1>
                Comments (<span class="comment-count">4</span>)
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
            </h1>
            <ol id="comments-list" class="comments-list line-commenting">
                <li class="comment">
                    <article id="comment-145003814" class="iterable-item">
                        Some comment
                    </article>
                </li>
            </ol>
        </section>
    )

    insertShowGeneralComments(diff)

    t.is(diff.outerHTML, expected.outerHTML)
})

test('"Comments" button is NOT displayed if it has no comments', t => {
    const diff = (
        <section id="general-comments" class="main">
            <h1>
                Comments (<span class="comment-count">4</span>)
            </h1>
            <ol id="comments-list" class="comments-list line-commenting" />
        </section>
    )

    const expected = diff.cloneNode(true)

    t.is(diff.outerHTML, expected.outerHTML)
})

test('Comments are shown or hidden when button is toggled', async t => {
    const diff = (
        <section id="general-comments" class="main">
            <h1>
                Comments (<span class="comment-count">4</span>)
            </h1>
            <ol id="comments-list" class="comments-list line-commenting">
                <li class="comment">
                    <article id="comment-145003814" class="iterable-item">
                        Some comment
                    </article>
                </li>
            </ol>
        </section>
    )

    insertShowGeneralComments(diff)

    // Assert
    const showComments = diff.querySelector('.__rbb-show-comments')
    ;[...diff.querySelectorAll('.comment')].forEach(comment => {
        t.is(comment.style.display, '')
    })

    showComments.dispatchEvent(new Event('click'))
    ;[...diff.querySelectorAll('.comment')].forEach(comment => {
        t.is(comment.style.display, 'none')
    })

    showComments.dispatchEvent(new Event('click'))
    ;[...diff.querySelectorAll('.comment')].forEach(comment => {
        t.is(comment.style.display, '')
    })
})

test('"Comments" button is added/removed when applicable if comments are added/removed', async t => {
    const diff = (
        <section id="general-comments" class="main">
            <h1>
                Comments (<span class="comment-count">4</span>)
            </h1>
            <ol id="comments-list" class="comments-list line-commenting" />
        </section>
    )

    insertShowGeneralComments(diff)

    // Assert
    t.falsy(
        diff.querySelector('.__rbb-show-comments'),
        'button should not exist if there are no comments'
    )

    // Act
    diff.querySelector('#comments-list').appendChild(
        <li class="comment">
            <article id="comment-14504522" class="iterable-item">
                Some comment
            </article>
        </li>
    )
    await delay(100)

    // Assert
    t.truthy(
        diff.querySelector('.__rbb-show-comments'),
        'button should exist if there are comments'
    )
    t.is(diff.querySelectorAll('.__rbb-show-comments').length, 1)

    // Act
    diff.querySelector('#comments-list').appendChild(
        <li class="comment">
            <article id="comment-14507423" class="iterable-item">
                Some comment
            </article>
        </li>
    )
    await delay(100)

    // Assert
    t.truthy(
        diff.querySelector('.__rbb-show-comments'),
        'button should exist if there are comments'
    )
    t.is(diff.querySelectorAll('.__rbb-show-comments').length, 1)

    // Act
    ;[...diff.querySelectorAll('#comments-list li.comment')].forEach(comment =>
        comment.remove()
    )
    await delay(100)

    t.falsy(
        diff.querySelector('.__rbb-show-comments'),
        'button should not exist if there are no comments'
    )
})

test('should show comments section if a new comment while comments are hidden', async t => {
    const diff = (
        <section id="general-comments" class="main">
            <h1>
                Comments (<span class="comment-count">4</span>)
            </h1>
            <ol id="comments-list" class="comments-list line-commenting">
                <li class="comment">
                    <article id="comment-145003814" class="iterable-item">
                        Some comment
                    </article>
                </li>
            </ol>
        </section>
    )

    insertShowGeneralComments(diff)

    // shown
    diff.querySelectorAll('#comments-list li.comment').forEach(comment => {
        t.is(comment.style.display, '')
    })

    const showComments = diff.querySelector('.__rbb-show-comments')
    showComments.dispatchEvent(new Event('click'))

    // hidden
    diff.querySelectorAll('#comments-list li.comment').forEach(comment => {
        t.is(comment.style.display, 'none')
    })

    // The button should hide comments, all comments should be hidden
    t.is(stateShowComments, false)

    // Add a comment
    diff.querySelector('#comments-list').appendChild(
        <li class="comment">
            <article id="comment-14543345" class="iterable-item">
                Some comment
            </article>
        </li>
    )

    await delay(200)

    // The button should show comments
    t.is(stateShowComments, true)

    diff.querySelectorAll('#comments-list li').forEach(comment => {
        t.is(comment.style.display, '')
    })
})
