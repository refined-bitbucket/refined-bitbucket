'use strict';

import {h} from 'dom-chef';
import 'selector-observer';
import waitForPullRequestContents from '../wait-for-pullrequest';

export function init() {
    insertStyles();

    waitForPullRequestContents().then(pullRequestContentsNode => {
        // have to observe the DOM because some diffs
        // can be loaded by user demand at any moment
        pullRequestContentsNode.observeSelector('div.diff-container', function () {
            insertCollapseDiffButton(this);
        });
    })
    .catch(() => {
        // current page is not a pull request, ignore
    });
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

function insertCollapseDiffButton(diffContainer) {
    const button = (
        <div class="aui-buttons">
            <button type="button" class="aui-button aui-button-light __refined_bitbucket_collapse_diff_button" aria-label="Toggle diff text" data-initial-state="true">
                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
                    <path fill-rule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"></path>
                </svg>
                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10" class="__refined_bitbucket_hide">
                    <path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"></path>
                </svg>
            </button>
        </div>
    );

    const diffAction = diffContainer.querySelector('[id^="side-by-side"].diff-actions.secondary');
    diffAction.querySelector('div:nth-last-child(3)').insertAdjacentElement('afterend', button);

    button.addEventListener('click', function () {
        // Hide/show the diff
        const diffContentContainer = diffContainer.querySelector('div.diff-content-container');
        diffContentContainer.classList.toggle('__refined_bitbucket_hide');

        // Hide/show diff message, if present (when there are conflicts, for example)
        const diffMessageContainer = diffContainer.querySelector('div.diff-message-container.diff-message-container-skipped');
        if (diffMessageContainer) {
            diffMessageContainer.classList.toggle('__refined_bitbucket_hide');
        }

        // Add/remove a bottom border to the diff heading
        this.closest('div.heading').classList.toggle('__refined_bitbucket_bottom_border');

        // Toggle the collapse button icon
        [...this.getElementsByTagName('svg')].forEach(svg => svg.classList.toggle('__refined_bitbucket_hide'));
    });
}
