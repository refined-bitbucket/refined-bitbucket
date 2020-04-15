// @flow
// @jsx h

/* eslint-disable operator-linebreak */

import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

import './show-comments.css'

let stateShowComments = true

const onClick = e => {
    stateShowComments = !stateShowComments
    if (stateShowComments) {
        e.currentTarget.classList.remove('__rbb_comments_hidden')
    } else {
        e.currentTarget.classList.add('__rbb_comments_hidden')
    }

    const comments = [...document.querySelectorAll('#comments-list li.comment')]
    comments.forEach(comment => {
        comment.style.display = stateShowComments ? '' : 'none'
    })
}

export default function insertShowGeneralComments(section: HTMLElement) {
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
        if (!stateShowComments) {
            stateShowComments = false
            existingButton.dispatchEvent(new Event('click'))
        }
        return
    }

    const showCommentsButton = (
        <button
            type="button"
            class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
            title="Toggle file comments"
            original-title="Toggle file comments"
            onClick={onClick}
        >
            <span class="aui-icon aui-icon-small">Toggle file comments</span>
        </button>
    )

    const diffActions: HTMLElement = (section.querySelector('h1'): any)
    diffActions.appendChild(showCommentsButton)
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
