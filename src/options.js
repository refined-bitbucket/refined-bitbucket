/* global chrome */

(function () {
    'use strict';

    const highlightSyntaxElement = document.getElementById('syntax-highlight');
    const highlightOcurrencesElement = document.getElementById('highlight-ocurrences');
    const ignoreWhitespaceElement = document.getElementById('ignore-whitespace');
    const keymapElement = document.getElementById('keymap');
    const collapseDiffElement = document.getElementById('collapse-diff');
    const loadAllDiffsElement = document.getElementById('load-all-diffs');
    const autocollapsePathsElement = document.getElementById('autocollapse-paths');
    const ignorePathsElement = document.getElementById('ignore-paths');
    const statusElement = document.getElementById('status');

    function saveOptions() {
        const highlightSyntax = highlightSyntaxElement.checked;
        const highlightOcurrences = highlightOcurrencesElement.checked;
        const ignoreWhitespace = ignoreWhitespaceElement.checked;
        const keymap = keymapElement.checked;
        const collapseDiff = collapseDiffElement.checked;
        const loadAllDiffs = loadAllDiffsElement.checked;
        const autocollapsePaths = autocollapsePathsElement.value.split('\n');
        const ignorePaths = ignorePathsElement.value.split('\n');

        chrome.storage.sync.set({
            highlightSyntax,
            highlightOcurrences,
            ignoreWhitespace,
            keymap,
            collapseDiff,
            loadAllDiffs,
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
            keymap: true,
            collapseDiff: true,
            loadAllDiffs: true,
            autocollapsePaths: ['package-lock.json'],
            ignorePaths: []
        }, options => {
            highlightSyntaxElement.checked = options.highlightSyntax;
            highlightOcurrencesElement.checked = options.highlightOcurrences;
            ignoreWhitespaceElement.checked = options.ignoreWhitespace;
            keymapElement.checked = options.keymap;
            collapseDiffElement.checked = options.collapseDiff;
            loadAllDiffsElement.checked = options.loadAllDiffs;
            autocollapsePathsElement.value = options.autocollapsePaths.join('\n');
            ignorePathsElement.value = options.ignorePaths.join('\n');
        });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
})();
