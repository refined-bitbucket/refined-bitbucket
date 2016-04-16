/* jshint esversion: 6 */

let highlighterInput,
    doubleClickWordSelectionInput,
    pullRequestActionsControlInput,
    minApprovalsInput,
    minApprovalsSection;

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    highlighterInput = document.querySelector('#highlighter');
    doubleClickWordSelectionInput = document.querySelector('#doubleClickWordSelection');
    pullRequestActionsControlInput = document.querySelector('#pullRequestActionsControl');
    minApprovalsInput = document.querySelector('#minApprovals');
    minApprovalsSection = document.querySelector('#minApprovalsSection');

    highlighterInput.addEventListener('change', saveOptions);
    doubleClickWordSelectionInput.addEventListener('change', saveOptions);
    pullRequestActionsControlInput.addEventListener('change', saveOptions);
    pullRequestActionsControlInput.addEventListener('change', showHideMinApprovalsSection);
    minApprovalsInput.addEventListener('change', saveOptions);

    restoreOptions();
});

function saveOptions() {
    const highlighterEnabled = highlighterInput.checked,
        doubleClickWordSelectionEnabled = doubleClickWordSelectionInput.checked,
        pullRequestActionsControlEnabled = pullRequestActionsControlInput.checked,
        minApprovals = pullRequestActionsControlEnabled ? parseInt(minApprovalsInput.value) : 2;

    window.StorageHelper.storage.set({
        highlighterEnabled,
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

        highlighterInput.checked = items.highlighterEnabled;
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
