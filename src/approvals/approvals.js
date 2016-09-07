'use strict';

const storageHelper = require('../storage-helper');

module.exports = (function () {
    return {
        init() {
            const mergeButton = document.getElementById('fulfill-pullrequest');
            if (!mergeButton) return;

            bindApprovalClick();
            shouldMergeBeDisabled().then(disable => {
                mergeButton.disabled = disable;
            });
        }
    };
})();

function bindApprovalClick() {
    const approveButton = document.getElementById('approve-button');
    /*
        Passing once: true so that the eventListener is destroyed after executed.
        The thing is that after clicking the approve button the button is destroyed
        and a new button with a new counter is added.
     */
    approveButton.addEventListener('click', clickHandler, {once: true});

    function clickHandler() {
        // timeout because it takes some time for the approvals counter to update
        setTimeout(() => {
            const mergeButton = document.getElementById('fulfill-pullrequest');
            shouldMergeBeDisabled().then(disable => {
                mergeButton.disabled = disable;
                bindApprovalClick();
            });
        }, 500);
    }
}

function shouldMergeBeDisabled() {
    const numberOfApprovals = parseInt(document.getElementsByClassName('approvals')[0].textContent, 10);
    return storageHelper.getConfig().then(config => {
        const minimumNumberOfApprovals = config.minimumNumberOfApprovals;
        const mergeRequiresApproval = minimumNumberOfApprovals > 0;
        return mergeRequiresApproval && numberOfApprovals < minimumNumberOfApprovals;
    });
}
