// @flow
// @jsx h

/* eslint-disable operator-linebreak */

import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

import './show-comments.css'

const onClick = e => {
    const ariaChecked = e.currentTarget.getAttribute('aria-checked')
    const isChecked = ariaChecked === 'true'
    e.currentTarget.setAttribute('aria-checked', !isChecked)

    const diff = e.target.closest('section.bb-udiff')
    const comments = [
        ...diff.getElementsByClassName('comment-thread-container'),
    ]
    comments.forEach(comment => {
        comment.style.display = isChecked ? 'none' : ''
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
        if (existingButton.getAttribute('aria-checked') !== 'true') {
            existingButton.setAttribute('aria-checked', false)
            existingButton.dispatchEvent(new Event('click'))
        }
        return
    }

    const actionsSection: HTMLElement = (section.querySelector(
        '.diff-actions.secondary'
    ): any)

    const hasCommentsOnPreviousVersions = Boolean(
        actionsSection.getElementsByClassName('eclipsedcount').length
    )
    const hasStatusBadge = Boolean(
        actionsSection.getElementsByClassName('aui-lozenge').length
    )
    const showCommentsButton = (
        <button
            type="button"
            class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
            title="Toggle file comments"
            aria-checked="true"
            original-title="Toggle file comments"
            style={
                hasCommentsOnPreviousVersions || hasStatusBadge
                    ? {
                          marginRight: 10,
                      }
                    : {}
            }
            onClick={onClick}
        >
            <span class="aui-icon aui-icon-small">Toggle file comments</span>
        </button>
    )

    actionsSection.style.minWidth = '480px'
    actionsSection.style.textAlign = 'right'
    actionsSection.insertBefore(showCommentsButton, actionsSection.firstChild)
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
