/* global chrome */

(function () {
    'use strict';

    const highlightSyntaxElement = document.getElementById('syntax-highlight');
    const highlightOcurrencesElement = document.getElementById('highlight-ocurrences');
    const autocollapsePathsElement = document.getElementById('autocollapse-paths');
    const statusElement = document.getElementById('status');

    function saveOptions() {
        const highlightSyntax = highlightSyntaxElement.checked;
        const highlightOcurrences = highlightOcurrencesElement.checked;
        const autocollapsePaths = autocollapsePathsElement.value.split('\n');

        chrome.storage.sync.set({
            highlightSyntax,
            highlightOcurrences,
            autocollapsePaths
        }, () => {
            statusElement.textContent = 'Options saved.';
            setTimeout(() => {
                statusElement.textContent = '';
            }, 750);
        });
    }

    function restoreOptions() {
        chrome.storage.sync.get({
            highlightSyntax: true,
            highlightOcurrences: true,
            autocollapsePaths: ['package-lock.json']
        }, options => {
            highlightSyntaxElement.checked = options.highlightSyntax;
            highlightOcurrencesElement.checked = options.highlightOcurrences;
            autocollapsePathsElement.value = options.autocollapsePaths.join('\n');
        });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
})();
