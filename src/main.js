/* global Mousetrap */

import waitForPullRequestContents from './wait-for-pullrequest';
import collapseDiff from './collapse-diff/collapse-diff';
import autocollapse from './autocollapse/autocollapse';
import pullrequestIgnore from './pullrequest-ignore';

import 'selector-observer';

const storageHelper = require('./storage-helper');
const syntaxHighlight = require('./syntax-highlight/syntax-highlight');
const events = require('./events');
const occurrencesHighlighter = require('./occurrences-highlighter/occurrences-highlighter');
const keymap = require('./keymap/keymap');

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
        collapseDiff.init();
        autocollapse.init(config.autocollapsePaths);
        pullrequestIgnore.init(pullrequestNode, config.ignorePaths);

        // have to observe the DOM because some sections
        // load asynchronously by user demand
        pullrequestNode.observeSelector('section.bb-udiff', function () {
            collapseDiff.insertCollapseDiffButton(this);
            autocollapse.collapseIfNeeded(this);
        });
    })
    .catch(() => {
        // current page is not a pull request, ignore
    });
});
