/* jshint esversion: 6 */

define(['../var/document', 'jquery'], (document, $) => {
    'use strict';

    let minApprovals;

    function hasMinApprovals() {
        const approvals = parseInt(document.getElementsByClassName('approvals')[0].innerHTML, 10);
        const hasMinApprovals = approvals && approvals >= minApprovals;

        return hasMinApprovals;
    }

    function setupHandlers() {
        // Button element and number of approvals element are recreated after each click.
        // So wait 500ms for elements rendering and bind the event handler again.
        // TODO: It's working now but I think we can change this fixed time waiting
        // for something smarter.
        $('#approve-button').on('click', () => {
            setTimeout(() => {
                setMergeState();

                if (hasMinApprovals()) {
                    const ok = confirm('Merge pull request?');
                    if (ok) {
                        const mergeButton = document.getElementById('fulfill-pullrequest');
                        mergeButton.click();
                    }
                }

                setupHandlers();
            }, 500);
        });
    }

    function setMergeState() {
        const mergeButton = document.getElementById('fulfill-pullrequest');
        mergeButton.disabled = !hasMinApprovals();
    }

    return {
        run() {
            const pullrequestActionsExist = document.querySelector('#pullrequest-actions');

            if (pullrequestActionsExist) {
                window.StorageHelper.storage.get((err, items) => {
                    minApprovals = items.minApprovals;
                    setMergeState();
                    setupHandlers();
                });
            }
        }
    };
});
