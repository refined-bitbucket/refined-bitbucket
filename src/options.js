/* global chrome */

(function () {
    'use strict';

    const highlightSyntaxElement = document.getElementById('syntax-highlight');
    const highlightOcurrencesElement = document.getElementById('highlight-ocurrences');
    const ignoreWhitespaceElement = document.getElementById('ignore-whitespace');
    const autocollapsePathsElement = document.getElementById('autocollapse-paths');
    const ignorePathsElement = document.getElementById('ignore-paths');
    const statusElement = document.getElementById('status');

    function saveOptions() {
        const highlightSyntax = highlightSyntaxElement.checked;
        const highlightOcurrences = highlightOcurrencesElement.checked;
        const ignoreWhitespace = ignoreWhitespaceElement.checked;
        const autocollapsePaths = autocollapsePathsElement.value.split('\n');
        const ignorePaths = ignorePathsElement.value.split('\n');

        chrome.storage.sync.set({
            highlightSyntax,
            highlightOcurrences,
            ignoreWhitespace,
            autocollapsePaths,
            ignorePaths
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
            ignoreWhitespace: true,
            autocollapsePaths: ['package-lock.json'],
            ignorePaths: []
        }, options => {
            highlightSyntaxElement.checked = options.highlightSyntax;
            highlightOcurrencesElement.checked = options.highlightOcurrences;
            ignoreWhitespaceElement.checked = options.ignoreWhitespace;
            autocollapsePathsElement.value = options.autocollapsePaths.join('\n');
            ignorePathsElement.value = options.ignorePaths.join('\n');
        });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
})();
