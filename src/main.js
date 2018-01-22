'use strict';

/* eslint-disable import/imports-first */
global.jQuery = global.$ = require('jquery');

import OptionsSync from 'webext-options-sync';

import waitForPullRequestContents from './wait-for-pullrequest';
import collapseDiff from './collapse-diff/collapse-diff';
import autocollapse from './autocollapse/autocollapse';
import pullrequestIgnore from './pullrequest-ignore';
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
    isPullRequestList
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
    }
}

function pullrequestRelatedFeatures(config) {
    if (config.highlightOcurrences) {
        occurrencesHighlighter.init();
    }

    if (config.keymap) {
        keymap.init();
    }

    defaultMergeStrategy.init(config.defaultMergeStrategy);

    waitForPullRequestContents()
        .then(pullrequestNode => {
            autocollapse.init(
                config.autocollapsePaths,
                config.autocollapseDeletedFiles
            );

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

                if (
                    config.highlightSyntax &&
                    !pullrequestIgnore.isIgnored(this)
                ) {
                    syntaxHighlight(this);
                }
            });
        })
        .catch(() => {
            // current page is not a pull request, ignore
        });
}
