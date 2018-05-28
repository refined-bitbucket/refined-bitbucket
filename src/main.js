/* eslint-disable import/imports-first */
global.jQuery = global.$ = require('jquery')

import OptionsSync from 'webext-options-sync'

import augmentPrEntry from './augment-pr-entry'
import autocollapse from './autocollapse'
import closeAnchorBranch from './close-anchor-branch'
import collapseDiff from './collapse-diff'
import defaultMergeStrategy from './default-merge-strategy'
import diffIgnore from './diff-ignore'
import removeDiffsPlusesAndMinuses from './diff-pluses-and-minuses'
import ignoreWhitespace from './ignore-whitespace'
import insertCopyFilename from './insert-copy-filename'
import keymap from './keymap'
import linkifyTargetBranch from './linkify-target-branch'
import loadAllDiffs from './load-all-diffs'
import occurrencesHighlighter from './occurrences-highlighter'
import pullrequestCommitAmount from './pullrequest-commit-amount'
import insertPullrequestTemplate from './pullrequest-template'
import insertShowComments from './show-comments'
import addSidebarCounters from './sidebar-counters'
import syntaxHighlight from './syntax-highlight'
import comparePagePullRequest from './compare-page-pull-request'
import setTabSize from './tab-size'

import observeForWordDiffs from './observe-for-word-diffs'

import {
    isPullRequest,
    isCreatePullRequestURL,
    isPullRequestList,
    isCommit,
    isBranch,
    isComparePage,
} from './page-detect'

import 'selector-observer'

new OptionsSync().getAll().then(options => {
    const config = {
        ...options,
        autocollapsePaths: (options.autocollapsePaths || '').split('\n'),
        ignorePaths: (options.ignorePaths || '').split('\n'),
    }

    init(config)
})

function init(config) {
    if (isBranch()) {
        codeReviewFeatures(config)
    } else if (isPullRequest()) {
        codeReviewFeatures(config)
        pullrequestRelatedFeatures(config)
    } else if (isPullRequestList()) {
        pullrequestListRelatedFeatures(config)
    } else if (isCreatePullRequestURL()) {
        if (config.prTemplateEnabled) {
            insertPullrequestTemplate(config.prTemplateUrl)
        }

        if (config.closeAnchorBranch) {
            closeAnchorBranch()
        }
    } else if (isCommit()) {
        codeReviewFeatures(config)
    } else if (isComparePage()) {
        if (config.comparePagePullRequest) {
            comparePagePullRequest()
        }
    }

    if (config.improveFonts) {
        require('./improve-fonts.css')
    }

    if (config.addSidebarCounters) {
        addSidebarCounters()
    }

    if (config.customTabSizeEnabled) {
        const numSpaces = config.customTabSize
        setTabSize(numSpaces)
    }
}

function pullrequestListRelatedFeatures(config) {
    // Exit early if none of the pr list related features are enabled
    if (!config.ignoreWhitespace && !config.augmentPrEntry) {
        return
    }

    const prTable = document.querySelector('.pull-requests-table')

    prTable.observeSelector('tr.pull-request-row', function() {
        if (config.ignoreWhitespace) {
            ignoreWhitespace(this)
        }

        if (config.augmentPrEntry) {
            linkifyTargetBranch(this)
            augmentPrEntry(this)
        }
    })
}

function codeReviewFeatures(config) {
    autocollapse.init(config.autocollapsePaths, config.autocollapseDeletedFiles)

    diffIgnore.init(config.ignorePaths)

    const manipulateSummary = summaryNode => {
        if (config.ignorePaths.length) {
            diffIgnore.execute(summaryNode)
        }

        if (config.loadAllDiffs) {
            loadAllDiffs.init(summaryNode)
        }
    }

    const manipulateDiff = diff => {
        if (diffIgnore.isIgnored(diff)) {
            return
        }

        if (config.highlightOcurrences) {
            occurrencesHighlighter(diff)
        }

        if (config.collapseDiff) {
            collapseDiff.insertCollapseDiffButton(diff)
        }

        autocollapse.collapseIfNeeded(diff)

        if (config.showCommentsCheckbox) {
            insertShowComments(diff)
        }

        if (config.copyFilename) {
            insertCopyFilename(diff)
        }

        if (config.diffPlusesAndMinuses || config.syntaxHighlight) {
            const afterWordDiff = observeForWordDiffs(diff)

            if (config.diffPlusesAndMinuses) {
                removeDiffsPlusesAndMinuses(diff, afterWordDiff)
            }

            if (config.syntaxHighlight) {
                syntaxHighlight(diff, afterWordDiff)
            }
        }
    }

    const summarySelectors = '#compare-diff-content, #pr-tab-content, #commit'
    const diffSelector = 'section.bb-udiff'

    // have to observe the DOM because some sections
    // load asynchronously by user interactions
    document.body.observeSelector(
        [summarySelectors, diffSelector].join(', '),
        function() {
            try {
                if (this.matches(summarySelectors)) {
                    return manipulateSummary(this)
                }

                if (this.matches(diffSelector)) {
                    return manipulateDiff(this)
                }
            } catch (err) {
                // something went wrong
                console.error('refined-bitbucket(code-review): ', err)
            }
        }
    )
}

function pullrequestRelatedFeatures(config) {
    defaultMergeStrategy.init(config.defaultMergeStrategy)

    if (config.keymap) {
        keymap.init()
    }

    if (config.pullrequestCommitAmount) {
        pullrequestCommitAmount()
    }
}
