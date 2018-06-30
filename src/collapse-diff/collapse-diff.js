'use strict'

import { h } from 'dom-chef'

import './collapse-diff.css'

const insertTopButton = section => {
    const button = (
        <div class="aui-buttons">
            <button
                type="button"
                class="aui-button aui-button-light __refined_bitbucket_collapse_diff_button"
                aria-label="Toggle diff text"
                title="Toggle diff text"
            >
                <svg
                    aria-hidden="true"
                    height="16"
                    version="1.1"
                    viewBox="0 0 10 16"
                    width="10"
                    data-arrow-direction="up"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"
                    />
                </svg>
                <svg
                    aria-hidden="true"
                    height="16"
                    version="1.1"
                    viewBox="0 0 10 16"
                    width="10"
                    class="__refined_bitbucket_hide"
                    data-arrow-direction="down"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"
                    />
                </svg>
            </button>
        </div>
    )

    const diffActions = section.querySelector('.diff-actions.secondary')
    const diffLoaded = !section.querySelector('div.too-big-message')
    if (diffLoaded) {
        // NOTE: jsdom (used for unit-testing) doesn't support either `after`, `append` nor `insertAdjacentElement`
        // Insert it after the "More" button
        diffActions.insertBefore(
            button,
            diffActions.querySelector('.aui-dropdown2-trigger-more')
                .parentElement.nextElementSibling
        )
    } else if (diffActions) {
        diffActions.appendChild(button)
    } else {
        // This happens in when creating new PRs in `/pull-requests/new?source=<branch-name>`
        section
            .querySelector('.heading')
            .appendChild(<div class="secondary diff-actions">{button}</div>)
    }

    return button
}

const insertBottomButton = section => {
    const style = {
        right: 30,
        position: 'absolute',
        height: 'auto',
        width: 32,
    }
    const bottomButton = (
        <div class="aui-buttons __rb_ellipsis" style={style}>
            <button
                type="button"
                class="aui-button aui-button __refined_bitbucket_collapse_diff_button"
                aria-label="Toggle diff text"
                title="Toggle diff text"
                style={{ height: 25 }}
            >
                <svg
                    aria-hidden="true"
                    height="16"
                    version="1.1"
                    viewBox="0 0 10 16"
                    width="10"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"
                    />
                </svg>
                <svg
                    aria-hidden="true"
                    height="16"
                    version="1.1"
                    viewBox="0 0 10 16"
                    width="10"
                    class="__refined_bitbucket_hide"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"
                    />
                </svg>
            </button>
        </div>
    )

    const bottomLine = section.querySelector(
        'div.skipped-bottom.last:last-child'
    )
    if (bottomLine) {
        bottomLine.appendChild(bottomButton)
    } else {
        const contentContainer = section.querySelector(
            'div.refract-content-container'
        )
        if (contentContainer) {
            bottomButton.style.marginTop = 0
            const height = { height: 5 }
            const bottomLineContainer = (
                <div class="skipped-container">
                    <div
                        class="line-numbers-skipped skipped-bottom last"
                        style={height}
                    />
                    <div class="skipped-bottom last" style={height}>
                        {bottomButton}
                    </div>
                </div>
            )
            contentContainer.appendChild(bottomLineContainer)
        }
    }

    return bottomButton
}

export function toggleDiff(section) {
    // Hide/show the diff
    const diffContentContainer = section.querySelector(
        'div.diff-content-container'
    )
    if (diffContentContainer) {
        diffContentContainer.classList.toggle('__refined_bitbucket_hide')
    }

    // Hide/show diff message, if present (when there are conflicts, for example)
    const diffMessageContainer = section.querySelector(
        'div.diff-message-container'
    )
    if (diffMessageContainer) {
        diffMessageContainer.classList.toggle('__refined_bitbucket_hide')
    }

    // Add/remove a bottom border to the diff heading
    section
        .querySelector('div.heading')
        .classList.toggle('__refined_bitbucket_bottom_border')

    // Toggle the collapse button icon
    ;[
        ...section.querySelectorAll(
            '.__refined_bitbucket_collapse_diff_button svg'
        ),
    ].forEach(svg => svg.classList.toggle('__refined_bitbucket_hide'))
}

export function insertCollapseDiffButton(section) {
    // don't reinsert the button if already present.
    // doesn't happen with vanilla Bitbucket, but can happen when interacting
    // with other extensions (like Bitbucket Diff Tree)
    if (
        section.getElementsByClassName(
            '__refined_bitbucket_collapse_diff_button'
        ).length
    ) {
        return
    }

    const onClick = () => {
        toggleDiff(section)

        // Scrolling to diff
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const topButton = insertTopButton(section)
    const bottomButton = insertBottomButton(section)

    topButton.addEventListener('click', onClick)
    bottomButton.addEventListener('click', onClick)
}
