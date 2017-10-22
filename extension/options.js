/* global chrome */

(function () {
    'use strict';

    const highlightSyntaxElement = document.getElementById('syntax-highlight');
    const highlightOcurrencesElement = document.getElementById('highlight-ocurrences');
    const statusElement = document.getElementById('status');

    function saveOptions() {
        const highlightSyntax = highlightSyntaxElement.checked;
        const highlightOcurrences = highlightOcurrencesElement.checked;

        chrome.storage.sync.set({
            highlightSyntax,
            highlightOcurrences,
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
        }, options => {
            highlightSyntaxElement.checked = options.highlightSyntax;
            highlightOcurrencesElement.checked = options.highlightOcurrences;
        });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
})();
