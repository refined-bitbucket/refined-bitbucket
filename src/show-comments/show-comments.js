// @flow
// @jsx h

/* eslint-disable operator-linebreak */

import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

import './show-comments.css'

let showComments = true

const onClick = e => {
    showComments = !showComments
    console.log(e)
    if (showComments) {
        e.currentTarget.classList.remove('__rbb_comments_hidden')
    } else {
        e.currentTarget.classList.add('__rbb_comments_hidden')
    }

    const diff = e.target.closest('section.bb-udiff')
    const comments = [
        ...diff.getElementsByClassName('comment-thread-container'),
    ]
    comments.forEach(comment => {
        comment.style.display = showComments ? '' : 'none'
    })
}

export default function insertShowComments(section: HTMLElement) {
    // Diff failed because pull request is too big
    if (section.querySelector('div.too-big-message')) {
        return
    }

    // eslint-disable-next-line no-new
    new SelectorObserver(
        section,
        'li.comment',
        () => onAddComment(section),
        () => onDeleteComment(section)
    )
}

function onAddComment(section) {
    const existingButton: HTMLInputElement = (section.querySelector(
        '.__rbb-show-comments'
    ): any)

    // Show comments button already exists
    if (existingButton) {
        if (!showComments) {
            showComments = true
            existingButton.dispatchEvent(new Event('click'))
        }
        return
    }

    const hasCommentsOnPreviousVersions = Boolean(
        section.getElementsByClassName('eclipsedcount').length
    )
    const showCommentsButton = (
        <button
            type="button"
            class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
            title="Toggle file comments"
            original-title="Toggle file comments"
            style={
                hasCommentsOnPreviousVersions
                    ? {
                          'margin-right': 10,
                      }
                    : {}
            }
            onClick={onClick}
        >
            <span class="aui-icon aui-icon-small">Toggle file comments</span>
        </button>
    )

    const diffActions: HTMLElement = (section.querySelector(
        '.diff-actions.secondary'
    ): any)
    diffActions.style.minWidth = '480px'
    diffActions.style.textAlign = 'right'
    diffActions.insertBefore(showCommentsButton, diffActions.firstChild)
}

function onDeleteComment(section) {
    // Only remove if there are no comments left in the diff
    if (!section.querySelector('li.comment')) {
        const node = section.querySelector('.__rbb-show-comments')
        if (node) {
            node.remove()
        }
    }
}
