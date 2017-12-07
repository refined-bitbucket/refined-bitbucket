/* global chrome */

'use strict';

module.exports = (function storageHelper() {
    return {
        getConfig() {
            return new Promise(resolve => {
                chrome.storage.sync.get({
                    highlightSyntax: true,
                    highlightOcurrences: true,
                    ignoreWhitespace: true,
                    keymap: true,
                    collapseDiff: true,
                    loadAllDiffs: true,
                    defaultMergeStrategy: 'merge_commit',
                    autocollapsePaths: ['package-lock.json'],
                    ignorePaths: []
                }, options => {
                    resolve({
                        highlightSyntax: options.highlightSyntax,
                        highlightOcurrences: options.highlightOcurrences,
                        ignoreWhitespace: options.ignoreWhitespace,
                        keymap: options.keymap,
                        collapseDiff: options.collapseDiff,
                        loadAllDiffs: options.loadAllDiffs,
                        defaultMergeStrategy: options.defaultMergeStrategy,
                        autocollapsePaths: options.autocollapsePaths,
                        ignorePaths: options.ignorePaths
                    });
                });
            });
        }
    };
})();
