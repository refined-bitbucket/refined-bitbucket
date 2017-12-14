'use strict';

import {h} from 'dom-chef';

export default {
    init,
    insertCollapseDiffButton
};

function init() {
    insertStyles();
}

function insertStyles() {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
        .__refined_bitbucket_hide { display: none; }
        .__refined_bitbucket_bottom_border { border-bottom: 1px solid #ccc !important; }
    `;
    head.appendChild(style);
}

function insertCollapseDiffButton(section) {
    // don't reinsert the button if already present.
    // doesn't happen with vanilla Bitbucket, but can happen when interacting
    // with other extensions (like Bitbucket Diff Tree)
    if (section.getElementsByClassName('__refined_bitbucket_collapse_diff_button').length) {
        return;
    }

    const button = (
        <div class="aui-buttons">
            <button type="button" class="aui-button aui-button-light __refined_bitbucket_collapse_diff_button" aria-label="Toggle diff text" title="Toggle diff text">
                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10" data-arrow-direction="up">
                    <path fill-rule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"></path>
                </svg>
                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10" class="__refined_bitbucket_hide" data-arrow-direction="down">
                    <path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"></path>
                </svg>
            </button>
        </div>
    );

    const diffActions = section.querySelector('.diff-actions.secondary');
    const diffLoaded = !section.querySelector('div.too-big-message');
    if (diffLoaded) {
        // NOTE: jsdom (used for unit-testing) doesn't support either `after`, `append` nor `insertAdjacentElement`
        diffActions.insertBefore(button, diffActions.querySelector('div:nth-child(4)'));
    } else {
        diffActions.appendChild(button);
    }

    button.addEventListener('click', function () {
        // Hide/show the diff
        const diffContentContainer = section.querySelector('div.diff-content-container');
        if (diffContentContainer) {
            diffContentContainer.classList.toggle('__refined_bitbucket_hide');
        }

        // Hide/show diff message, if present (when there are conflicts, for example)
        const diffMessageContainer = section.querySelector('div.diff-message-container');
        if (diffMessageContainer) {
            diffMessageContainer.classList.toggle('__refined_bitbucket_hide');
        }

        // Add/remove a bottom border to the diff heading
        this.closest('div.heading').classList.toggle('__refined_bitbucket_bottom_border');

        // Toggle the collapse button icon
        [...this.getElementsByTagName('svg')].forEach(svg => svg.classList.toggle('__refined_bitbucket_hide'));
    });
}
