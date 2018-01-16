'use strict';

/* eslint-disable import/imports-first */
global.jQuery = global.$ = require('jquery');

import waitForPullRequestContents from './wait-for-pullrequest';
import collapseDiff from './collapse-diff/collapse-diff';
import autocollapse from './autocollapse/autocollapse';
import pullrequestIgnore from './pullrequest-ignore';
import loadAllDiffs from './load-all-diffs';
import syntaxHighlight from './syntax-highlight';
import ignoreWhitespace from './ignore-whitespace';
import defaultMergeStrategy from './default-merge-strategy';

import 'selector-observer';

const storageHelper = require('./storage-helper');
const occurrencesHighlighter = require('./occurrences-highlighter/occurrences-highlighter');
const keymap = require('./keymap/keymap');

storageHelper.getConfig().then(config => {
    if (config.highlightOcurrences) {
        occurrencesHighlighter.init();
    }

    if (config.keymap) {
        keymap.init();
    }

    if (config.ignoreWhitespace) {
        ignoreWhitespace.init();
    }

    defaultMergeStrategy.init(config.defaultMergeStrategy);

    waitForPullRequestContents().then(pullrequestNode => {
        autocollapse.init(config.autocollapsePaths, config.autocollapseDeletedFiles);

        pullrequestIgnore.init(pullrequestNode, config.ignorePaths);

        if (config.loadAllDiffs) {
            loadAllDiffs.init(pullrequestNode);
        }

        // have to observe the DOM because some sections
        // load asynchronously by user demand
        pullrequestNode.observeSelector('section.bb-udiff', function () {
            if (config.collapseDiff) {
                collapseDiff.insertCollapseDiffButton(this);
            }
            autocollapse.collapseIfNeeded(this);

            if (config.highlightSyntax && !pullrequestIgnore.isIgnored(this)) {
                syntaxHighlight(this);
            }
        });
    })
    .catch(() => {
        // current page is not a pull request, ignore
    });
});
