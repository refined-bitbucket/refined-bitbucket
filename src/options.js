/* global chrome */

(function () {
    'use strict';

    const highlightSyntaxElement = document.getElementById('syntax-highlight');
    const highlightOcurrencesElement = document.getElementById('highlight-ocurrences');
    const ignorePathsElement = document.getElementById('ignore-paths');
    const statusElement = document.getElementById('status');

    function saveOptions() {
        const highlightSyntax = highlightSyntaxElement.checked;
        const highlightOcurrences = highlightOcurrencesElement.checked;
        const ignorePaths = ignorePathsElement.value.split('\n');

        chrome.storage.sync.set({
            highlightSyntax,
            highlightOcurrences,
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
            ignorePaths: ['package-lock.json']
        }, options => {
            console.log(options);
            console.log(options.ignorePaths.join('\n'));
            highlightSyntaxElement.checked = options.highlightSyntax;
            highlightOcurrencesElement.checked = options.highlightOcurrences;
            ignorePathsElement.value = options.ignorePaths.join('\n');
        });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
})();
