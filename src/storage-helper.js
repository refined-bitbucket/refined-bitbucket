/* global chrome */

'use strict';

module.exports = (function storageHelper() {
    return {
        getConfig() {
            return new Promise(resolve => {
                chrome.storage.sync.get({
                    highlightSyntax: true,
                    highlightOcurrences: true,
                    autocollapsePaths: ['package-lock.json'],
                    ignorePaths: []
                }, options => {
                    resolve({
                        highlightSyntax: options.highlightSyntax,
                        highlightOcurrences: options.highlightOcurrences,
                        autocollapsePaths: options.autocollapsePaths,
                        ignorePaths: options.ignorePaths
                    });
                });
            });
        }
    };
})();
