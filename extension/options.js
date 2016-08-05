/* jshint esversion: 6 */

(function (window, document) {
    let doubleClickWordSelectionInput = null;
    let pullRequestActionsControlInput = null;
    let minApprovalsInput = null;
    let minApprovalsSection = null;

    document.addEventListener('DOMContentLoaded', () => {
        'use strict';
        doubleClickWordSelectionInput = document.querySelector('#doubleClickWordSelection');
        pullRequestActionsControlInput = document.querySelector('#pullRequestActionsControl');
        minApprovalsInput = document.querySelector('#minApprovals');
        minApprovalsSection = document.querySelector('#minApprovalsSection');

        doubleClickWordSelectionInput.addEventListener('change', saveOptions);
        pullRequestActionsControlInput.addEventListener('change', saveOptions);
        pullRequestActionsControlInput.addEventListener('change', showHideMinApprovalsSection);
        minApprovalsInput.addEventListener('change', saveOptions);

        restoreOptions();
    });

    function saveOptions() {
        const doubleClickWordSelectionEnabled = doubleClickWordSelectionInput.checked;
        const pullRequestActionsControlEnabled = pullRequestActionsControlInput.checked;
        const minApprovals = pullRequestActionsControlEnabled ? parseInt(minApprovalsInput.value, 10) : 2;

        window.StorageHelper.storage.set({
            doubleClickWordSelectionEnabled,
            pullRequestActionsControlEnabled,
            minApprovals
        });
    }

    function restoreOptions() {
        window.StorageHelper.storage.get((err, items) => {
            if (err) {
                throw err;
            }

            doubleClickWordSelectionInput.checked = items.doubleClickWordSelectionEnabled;
            pullRequestActionsControlInput.checked = items.pullRequestActionsControlEnabled;
            minApprovalsInput.value = items.minApprovals;
            showHideMinApprovalsSection();
        });
    }

    function showHideMinApprovalsSection() {
        if (pullRequestActionsControlInput.checked) {
            minApprovalsSection.style.display = 'block';
        } else {
            minApprovalsSection.style.display = 'none';
        }
    }
})(window, document);
