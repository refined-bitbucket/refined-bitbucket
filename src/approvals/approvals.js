'use strict';

const storageHelper = require('../storage-helper');

module.exports = (function () {
    return {
        init() {
            const mergeButton = document.getElementById('fulfill-pullrequest');
            mergeButton.addEventListener('click', handleApproval);
            shouldMergeBeDisabled().then(disable => {
                mergeButton.disabled = disable;
            });
        }
    };
})();

function handleApproval() {
    // timeout because it takes some time for the approvals counter to update
    setTimeout(() => {
        const mergeButton = document.getElementById('fulfill-pullrequest');
        shouldMergeBeDisabled().then(disable => {
            mergeButton.disabled = disable;
        });
    }, 200);
}

function shouldMergeBeDisabled() {
    const numberOfApprovals = parseInt(document.getElementsByClassName('approvals')[0].textContent, 10);
    return storageHelper.getConfig().then(config => {
        const minimumNumberOfApprovals = config.minimumNumberOfApprovals;
        const mergeRequiresApproval = minimumNumberOfApprovals > 0;
        return mergeRequiresApproval && numberOfApprovals < minimumNumberOfApprovals;
    });
}
