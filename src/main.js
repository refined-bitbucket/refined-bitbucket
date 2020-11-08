// @flow

/* eslint-disable import/first */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
global.jQuery = global.$ = require('jquery')

import OptionsSync from 'webext-options-sync'
import SelectorObserver from 'selector-observer'

import augmentPrEntry from './augment-pr-entry'
import autocollapse from './autocollapse'
import closeAnchorBranch from './close-anchor-branch'
import collapseDiff from './collapse-diff'
import defaultMergeStrategy from './default-merge-strategy'
import diffIgnore from './diff-ignore'
import removeDiffsPlusesAndMinuses from './diff-pluses-and-minuses'
import {
    ignoreWhitespaceSearchParam,
    ignoreWhitespaceInit,
} from './ignore-whitespace'
import insertCopyFilename from './insert-copy-filename'
import insertCopyFilenameNew from './insert-copy-filename-new'
import keymap from './keymap'
import loadAllDiffs from './load-all-diffs'
import occurrencesHighlighter from './occurrences-highlighter'
import pullrequestCommitAmount from './pullrequest-commit-amount'
import insertPullrequestTemplate from './pullrequest-template'
import insertShowComments from './show-comments'
import addSidebarCounters from './sidebar-counters'
import syntaxHighlight from './syntax-highlight'
import comparePagePullRequest from './compare-page-pull-request'
import setTabSize from './tab-size'
import mergeCommitMessage from './merge-commit-message'
import mergeCommitMessageNew from './merge-commit-message-new'
import collapsePullRequestDescription from './collapse-pull-request-description'
import setStickyHeader from './sticky-header'
import setLineLengthLimit from './limit-line-length'
import collapsePullRequestSideMenus from './collapse-pull-request-side-menus'

import observeForWordDiffs from './observe-for-word-diffs'

import {
    isPullRequest,
    isCreatePullRequestURL,
    isPullRequestList,
    isCommit,
    isBranch,
    isComparePage,
    isDashBoardOverview,
} from './page-detect'

import addStyleToPage from './add-style'

function getIsNewExperience() {
    // $FlowIgnore There's always going to be a body
    const isNewExperience = document.body.dataset.auiVersion >= '7.9.9'
    return isNewExperience
}

new OptionsSync().getAll().then(options => {
    const config = {
        ...options,
        autocollapsePaths: (options.autocollapsePaths || '').split('\n'),
        ignorePaths: (options.ignorePaths || '').split('\n'),
    }

    init(config)

    if (getIsNewExperience()) {
        // $FlowIgnore
        chrome.runtime.onMessage.addListener(request => {
            if (request.message === 'onHistoryStateUpdated') {
                if (isPullRequest()) {
                    codeReviewFeatures(config)
                    pullrequestRelatedFeatures(config)
                }
            }
        })
    }
})

function init(config) {
    if (isBranch()) {
        codeReviewFeatures(config)
    } else if (isPullRequest()) {
        codeReviewFeatures(config)
        pullrequestRelatedFeatures(config)
    } else if (isPullRequestList() || isDashBoardOverview()) {
        pullrequestListRelatedFeatures(config)
    } else if (isCreatePullRequestURL()) {
        if (config.prTemplateEnabled) {
            insertPullrequestTemplate(config.prTemplateUrl)
        }

        if (config.closeAnchorBranch) {
            closeAnchorBranch()
        }

        codeReviewFeatures(config)
    } else if (isCommit()) {
        codeReviewFeatures(config)
    } else if (isComparePage()) {
        if (config.comparePagePullRequest) {
            comparePagePullRequest()
        }
        codeReviewFeatures(config)
    }

    if (config.addSidebarCounters) {
        addSidebarCounters()
    }

    if (config.customTabSizeEnabled) {
        const numSpaces = config.customTabSize
        setTabSize(numSpaces)
    }

    if (config.customStyles) {
        addStyleToPage(config.customStyles)
    }
}

function pullrequestListRelatedFeatures(config) {
    // Exit early if none of the pr list related features are enabled
    if (!config.ignoreWhitespace && !config.augmentPrEntry) {
        return
    }

    // eslint-disable-next-line no-new
    new SelectorObserver(
        document.body,
        'tr[data-qa="pull-request-row"]',
        function() {
            if (config.ignoreWhitespace) {
                ignoreWhitespaceSearchParam(this)
            }

            if (config.augmentPrEntry) {
                augmentPrEntry(this)
            }
        }
    )
}

function codeReviewFeatures(config) {
    autocollapse.init(config.autocollapsePaths, config.autocollapseDeletedFiles)

    diffIgnore.init(config.ignorePaths)

    if (config.autolinker) {
        require('./vendor/prism-autolinker.min')
    }

    const manipulateSummary = summaryNode => {
        if (config.ignorePaths.length !== 0) {
            diffIgnore.execute(summaryNode)
        }

        if (config.loadAllDiffs) {
            loadAllDiffs.init(summaryNode)
        }
    }

    const manipulateGeneralComments = comments => {
        if (config.showCommentsCheckbox) {
            insertShowComments(comments, true)
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
            insertShowComments(diff, false)
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

    const summarySelectors =
        '#compare-diff-content, #pr-tab-content, #commit, #diff'
    const diffSelector = 'section.bb-udiff'

    const generalCommentsSelector = '#general-comments'

    // Have to observe the DOM because some sections
    // load asynchronously by user interactions
    // eslint-disable-next-line no-new
    new SelectorObserver(
        document.body,
        [summarySelectors, diffSelector, generalCommentsSelector].join(', '),
        function() {
            try {
                if (this.matches(summarySelectors)) {
                    return manipulateSummary(this)
                }

                if (this.matches(diffSelector)) {
                    return manipulateDiff(this)
                }

                if (this.matches(generalCommentsSelector)) {
                    return manipulateGeneralComments(this)
                }
            } catch (error) {
                // Something went wrong
                console.error('refined-bitbucket(code-review): ', error)
            }
        }
    )

    if (config.lineLengthLimitEnabled) {
        setLineLengthLimit(config.lineLengthLimit)
    }

    const isNewExperience = getIsNewExperience()
    if (!isNewExperience && config.ignoreWhitespace) {
        ignoreWhitespaceInit()
    }

    if (config.stickyHeader) {
        setStickyHeader()
    }
}

function pullrequestRelatedFeatures(config) {
    const isNewExperience = getIsNewExperience()

    if (isNewExperience) {
        pullrequestRelatedFeaturesNew(config)
    } else {
        pullrequestRelatedFeaturesOld(config)
    }
}

function pullrequestRelatedFeaturesNew(config) {
    if (config.mergeCommitMessageEnabled) {
        mergeCommitMessageNew(config.mergeCommitMessageUrl)
    }

    if (config.collapsePullRequestSideMenus) {
        collapsePullRequestSideMenus(config.collapsePrSideMenusResolutionSize)
    }

    if (config.copyFilename) {
        // eslint-disable-next-line no-new
        new SelectorObserver(
            document.body,
            'article[data-qa="pr-diff-file-styles"]',
            function() {
                if (config.copyFilename) {
                    insertCopyFilenameNew(this)
                }
            }
        )
    }
}

function pullrequestRelatedFeaturesOld(config) {
    if (config.defaultMergeStrategy !== 'none') {
        defaultMergeStrategy.init(config.defaultMergeStrategy)
    }

    if (config.keymap) {
        keymap.init()
    }

    if (config.pullrequestCommitAmount) {
        pullrequestCommitAmount()
    }

    if (config.mergeCommitMessageEnabled) {
        mergeCommitMessage(config.mergeCommitMessageUrl)
    }

    if (config.collapsePullRequestDescription) {
        collapsePullRequestDescription()
    }

    if (config.collapsePullRequestSideMenus) {
        collapsePullRequestSideMenus(config.collapsePrSideMenusResolutionSize)
    }
}
