const storageHelper = require('./storage-helper');

const syntaxHighlight = require('./syntax-highlight');
const events = require('./events');
const approvals = require('./approvals/approvals');

storageHelper.getConfig().then(config => {
    events.init();

    if (config.highlightSyntax) {
        syntaxHighlight.init();
    }
    if (config.minimumNumberOfApprovals > 0) {
        approvals.init({
            mergeButtonStartsDisabled: true
        });
    }
});
