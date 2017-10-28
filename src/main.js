/* global Mousetrap */

const storageHelper = require('./storage-helper');

const syntaxHighlight = require('./syntax-highlight/syntax-highlight');
const events = require('./events');
const occurrencesHighlighter = require('./occurrences-highlighter/occurrences-highlighter');
const keymap = require('./keymap/keymap');
import waitForPullRequestContents from './wait-for-pullrequest';
const collapseDiff = require('./collapse-diff/collapse-diff');
const pullrequestIgnore = require('./pullrequest-ignore/pullrequest-ignore');

storageHelper.getConfig().then(config => {
    events.init();

    if (config.highlightSyntax) {
        syntaxHighlight.init();
    }

    if (config.highlightOcurrences) {
        occurrencesHighlighter.init();
    }

    keymap.init(Mousetrap);

    waitForPullRequestContents().then(pullrequestNode => {
        collapseDiff.init(pullrequestNode);
        pullrequestIgnore.init(pullrequestNode, config.ignorePaths);
    })
    .catch(() => {
        // current page is not a pull request, ignore
    });
});
