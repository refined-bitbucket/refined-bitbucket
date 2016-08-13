/* global chrome */

'use strict';

const DEFAULT_MINIMUM = 2;

module.exports = (function storageHelper() {
    return {
        getConfig() {
            return new Promise(resolve => {
                chrome.storage.sync.get({
                    highlightSyntax: true,
                    highlightOcurrences: true,
                    minimumNumberOfApprovals: DEFAULT_MINIMUM
                }, options => {
                    resolve({
                        highlightSyntax: options.highlightSyntax,
                        highlightOcurrences: options.highlightOcurrences,
                        minimumNumberOfApprovals: handleNumberOfApprovals(options.minimumNumberOfApprovals)
                    });
                });
            });
        }
    };
})();

function handleNumberOfApprovals(number) {
    if (number < 0) {
        return DEFAULT_MINIMUM;
    }
    return parseInt(number, 10);
}
