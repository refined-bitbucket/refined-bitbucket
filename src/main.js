/* global chrome */

const syntaxHighlight = require('./syntax-highlight');
const events = require('./events');

chrome.storage.sync.get({
    highlightSyntax: true,
    highlightOcurrences: true,
    minimumNumberOfApprovals: 2
}, options => {
    events.init();

    if (options.highlightSyntax) {
        syntaxHighlight.init();
    }
});
