// @flow
// @jsx h

/* eslint-disable operator-linebreak */

import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

import './show-comments.css'

const switchToggleState = e => {
    const ariaChecked = e.currentTarget.getAttribute('aria-expanded')
    const isChecked = ariaChecked === 'true'
    e.currentTarget.setAttribute('aria-expanded', !isChecked)
}

const hideComments = (e, comments) =>
    comments.forEach(comment => {
        comment.style.display =
            e.currentTarget.getAttribute('aria-expanded') === 'true'
                ? ''
                : 'none'
    })

const onClick = e => {
    switchToggleState(e)

    const diff = e.currentTarget.closest('section.bb-udiff')
    const comments = [
        ...diff.getElementsByClassName('comment-thread-container'),
    ]

    hideComments(e, comments)
}

const onGeneralClick = e => {
    switchToggleState(e)

    const container = e.currentTarget.closest('#general-comments')
    const comments = [
        ...container.querySelectorAll('#comments-list li.comment'),
    ]

    hideComments(e, comments)
}

export default function insertShowComments(
    section: HTMLElement,
    isGeneralSection: boolean
) {
    // Diff failed because pull request is too big
    if (!isGeneralSection && section.querySelector('div.too-big-message')) {
        return
    }

    // eslint-disable-next-line no-new
    new SelectorObserver(
        section,
        'li.comment',
        () => onAddComment(section, isGeneralSection),
        () => onDeleteComment(section)
    )
}

function onAddComment(section: HTMLElement, isGeneralSection: boolean) {
    const existingButton: HTMLInputElement = (section.querySelector(
        '.__rbb-show-comments'
    ): any)

    // Show comments button already exists
    if (existingButton) {
        if (existingButton.getAttribute('aria-expanded') !== 'true') {
            existingButton.setAttribute('aria-expanded', false)
            existingButton.dispatchEvent(new Event('click'))
        }
        return
    }

    return isGeneralSection
        ? insertGeneralCommentButton(section)
        : insertCommentButton(section)
}

function onDeleteComment(section: HTMLElement) {
    // Only remove if there are no comments left in the diff
    if (!section.querySelector('li.comment')) {
        const node = section.querySelector('.__rbb-show-comments')
        if (node) {
            node.remove()
        }
    }
}

function insertCommentButton(section: HTMLElement): void {
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
            aria-expanded="true"
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

function insertGeneralCommentButton(section: HTMLElement): void {
    const showCommentsButton = (
        <button
            type="button"
            class="aui-button aui-button-subtle aui-button-light __rbb-show-comments"
            title="Toggle summary comments"
            aria-expanded="true"
            original-title="Toggle summary comments"
            onClick={onGeneralClick}
        >
            <span class="aui-icon aui-icon-small">Toggle summary comments</span>
        </button>
    )

    const diffActions: HTMLElement = (section.querySelector('h1'): any)
    diffActions.appendChild(showCommentsButton)
}
