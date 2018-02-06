/* eslint-disable import/imports-first */
global.jQuery = global.$ = require('jquery');

import OptionsSync from 'webext-options-sync';

import autocollapse from './autocollapse';
import closeAnchorBranch from './close-anchor-branch';
import collapseDiff from './collapse-diff';
import defaultMergeStrategy from './default-merge-strategy';
import diffIgnore from './diff-ignore';
import ignoreWhitespace from './ignore-whitespace';
import keymap from './keymap';
import loadAllDiffs from './load-all-diffs';
import occurrencesHighlighter from './occurrences-highlighter';
import insertPullrequestTemplate from './pullrequest-template';
import syntaxHighlight from './syntax-highlight';
import addSidebarCounters from './sidebar-counters';
import addSourceBranchToPrList from './source-branch';

import waitForPullRequestContents from './wait-for-pullrequest';
import {
    isPullRequest,
    isCreatePullRequestURL,
    isEditPullRequestURL,
    isPullRequestList,
    isCommit
} from './page-detect';

import 'selector-observer';

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
            ignoreWhitespace();
        }

        if (config.addSourceBranchToPrList) {
            addSourceBranchToPrList();
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

    if (config.improveFonts) {
        require('./improve-fonts.css');
    }

    if (config.addSidebarCounters) {
        addSidebarCounters();
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
