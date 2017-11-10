/* global Mousetrap */

'use strict';

import waitForPullRequestContents from './wait-for-pullrequest';
import collapseDiff from './collapse-diff/collapse-diff';
import autocollapse from './autocollapse/autocollapse';
import pullrequestIgnore from './pullrequest-ignore';
import loadAllDiffs from './load-all-diffs';
import syntaxHighlight from './syntax-highlight';

import 'selector-observer';

const storageHelper = require('./storage-helper');
const occurrencesHighlighter = require('./occurrences-highlighter/occurrences-highlighter');
const keymap = require('./keymap/keymap');

storageHelper.getConfig().then(config => {
    if (config.highlightOcurrences) {
        occurrencesHighlighter.init();
    }

    keymap.init(Mousetrap);

    waitForPullRequestContents().then(pullrequestNode => {
        collapseDiff.init();
        autocollapse.init(config.autocollapsePaths);
        pullrequestIgnore.init(pullrequestNode, config.ignorePaths);
        loadAllDiffs.init(pullrequestNode);

        if (config.highlightSyntax) {
            syntaxHighlight.init();
        }

        // have to observe the DOM because some sections
        // load asynchronously by user demand
        pullrequestNode.observeSelector('section.bb-udiff', function () {
            collapseDiff.insertCollapseDiffButton(this);
            autocollapse.collapseIfNeeded(this);

            if (config.highlightSyntax && !pullrequestIgnore.isIgnored(this)) {
                syntaxHighlight.syntaxHighlight(this);
            }
        });
    })
    .catch(() => {
        // current page is not a pull request, ignore
    });
});
