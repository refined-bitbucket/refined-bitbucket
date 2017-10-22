'use strict';

const COLLAPSE_DIFF_BUTTON_CLASS = '__refined_bitbucket_collapse_diff_button';

module.exports = (function () {
    return {
        init() {
            insertStyles();

            waitForPullRequestContents().then(pullRequestContentsNode => {
                // insert the collapse diff button in every diff loaded initially with the page
                insertCollapseDiffButton(pullRequestContentsNode);

                // observe the DOM for any diff loaded on user demand after that
                pullRequestContentsNode.observeSelector('div.diff-container', function () {
                    insertCollapseDiffButton(this);
                });
            });
        }
    };
})();

function insertStyles() {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.__refined_bitbucket_hide { display: none; } .__refined_bitbucket_bottom_border { border-bottom: 1px solid #ccc !important; }';
    head.appendChild(style);
}

function waitForPullRequestContents() {
    return new Promise(resolve => {
        const pullRequestContentsNode = document.getElementById('pr-tab-content');

        new MutationObserver(function (mutations) {
            const maskRemoved = mutations.every(m => m.oldValue.includes('has-mask') && !m.target.classList.contains('has-mask'));
            if (maskRemoved) {
                this.disconnect();
                resolve(pullRequestContentsNode);
            }
        }).observe(pullRequestContentsNode, {attributes: true, attributeOldValue: true, attributeFilter: ['class']});
    });
}

function insertCollapseDiffButton(container) {
    // exit early if button is already inserted
    if (container.getElementsByClassName(COLLAPSE_DIFF_BUTTON_CLASS).length) {
        return;
    }

    const htmlString = `
      <div class="aui-buttons">
        <button type="button" class="${COLLAPSE_DIFF_BUTTON_CLASS} aui-button aui-button-light" aria-label="Toggle diff text" data-initial-state="true">
            <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
                <path fill-rule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"></path>
            </svg>
            <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10" class="__refined_bitbucket_hide">
                <path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"></path>
            </svg>
        </button>
      </div>
    `;

    const diffActions = container.querySelectorAll('[id^="side-by-side"].diff-actions.secondary');
    diffActions.forEach(diffAction => {
        diffAction.querySelector('div:nth-last-child(3)').insertAdjacentHTML('afterend', htmlString);
    });

    [...container.getElementsByClassName(COLLAPSE_DIFF_BUTTON_CLASS)].forEach(button => button.addEventListener('click', function () {
        const diffContainer = this.closest('div.diff-container');
        // Hide/show the diff
        const diffContentContainer = diffContainer.querySelector('div.diff-content-container.refract-container');
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
    }));
}
