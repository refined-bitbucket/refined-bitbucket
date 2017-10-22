/* global chrome */

'use strict';

module.exports = (function storageHelper() {
    return {
        getConfig() {
            return new Promise(resolve => {
                chrome.storage.sync.get({
                    highlightSyntax: true,
                    highlightOcurrences: true
                }, options => {
                    resolve({
                        highlightSyntax: options.highlightSyntax,
                        highlightOcurrences: options.highlightOcurrences
                    });
                });
            });
        }
    };
})();
