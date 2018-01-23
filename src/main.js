'use strict';

/* eslint-disable import/imports-first */
global.jQuery = global.$ = require('jquery');

import OptionsSync from 'webext-options-sync';

import waitForPullRequestContents from './wait-for-pullrequest';
import collapseDiff from './collapse-diff/collapse-diff';
import autocollapse from './autocollapse/autocollapse';
import diffIgnore from './diff-ignore';
import loadAllDiffs from './load-all-diffs';
import syntaxHighlight from './syntax-highlight';
import ignoreWhitespace from './ignore-whitespace';
import defaultMergeStrategy from './default-merge-strategy';
import insertPullrequestTemplate from './pullrequest-template';
import closeAnchorBranch from './close-anchor-branch';
import {
    isPullRequest,
    isCreatePullRequestURL,
    isEditPullRequestURL,
    isPullRequestList,
    isCommit
} from './page-detect';

import 'selector-observer';

const occurrencesHighlighter = require('./occurrences-highlighter/occurrences-highlighter');
const keymap = require('./keymap/keymap');

new OptionsSync().getAll().then(options => {
    const config = {
        ...options,
        autocollapsePaths: (options.autocollapsePaths || '').split('\n'),
        ignorePaths: (options.ignorePaths || '').split('\n')
    };

    init(config);
});

function init(config) {
    if (isPullRequest()) {
        const getPullrequestNodePromise = waitForPullRequestContents();
        codeReviewFeatures(config, getPullrequestNodePromise);
        pullrequestRelatedFeatures(config);
    } else if (isPullRequestList()) {
        if (config.ignoreWhitespace) {
            ignoreWhitespace.init();
        }
    } else if (isCreatePullRequestURL() || isEditPullRequestURL()) {
        if (isCreatePullRequestURL() && config.prTemplateEnabled) {
            insertPullrequestTemplate(config.prTemplateUrl);
        }

        if (config.closeAnchorBranch) {
            closeAnchorBranch();
        }
    } else if (isCommit()) {
        const getCommitsNodePromise = Promise.resolve(
            document.getElementById('commit')
        );
        codeReviewFeatures(config, getCommitsNodePromise);
    }
}

function codeReviewFeatures(config, getNodePromise) {
    if (config.highlightOcurrences) {
        occurrencesHighlighter.init();
    }

    autocollapse.init(
        config.autocollapsePaths,
        config.autocollapseDeletedFiles
    );

    getNodePromise
        .then(node => {
            diffIgnore.init(node, config.ignorePaths);

            if (config.loadAllDiffs) {
                loadAllDiffs.init(node);
            }

            // have to observe the DOM because some sections
            // load asynchronously by user demand
            node.observeSelector('section.bb-udiff', function() {
                if (config.collapseDiff) {
                    collapseDiff.insertCollapseDiffButton(this);
                }
                autocollapse.collapseIfNeeded(this);

                if (config.highlightSyntax && !diffIgnore.isIgnored(this)) {
                    syntaxHighlight(this);
                }
            });
        })
        .catch(err => {
            // something went wrong
            console.error('refined-bitbucket(code-review): ', err);
        });
}

function pullrequestRelatedFeatures(config) {
    defaultMergeStrategy.init(config.defaultMergeStrategy);

    if (config.keymap) {
        keymap.init();
    }
}
