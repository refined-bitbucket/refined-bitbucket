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
import keymap from './keymap'
import loadAllDiffs from './load-all-diffs'
import occurrencesHighlighter from './occurrences-highlighter'
import pullrequestCommitAmount from './pullrequest-commit-amount'
import insertPullrequestTemplate from './pullrequest-template'
import insertShowComments from './show-comments'
import addSidebarCounters from './sidebar-counters'
import { syntaxHighlightOldUI, syntaxHighlightNewUI } from './syntax-highlight'
import comparePagePullRequest from './compare-page-pull-request'
import setTabSize from './tab-size'
import mergeCommitMessage from './merge-commit-message'
import mergeCommitMessageNew from './merge-commit-message-new'
import collapsePullRequestDescription from './collapse-pull-request-description'
import setStickyHeader from './sticky-header'
import setLineLengthLimit from './limit-line-length'
import setCompactPRFileTree from './compact-pull-request-file-tree'
import collapsePullRequestSideMenus from './collapse-pull-request-side-menus'
import totalLinesChanged from './total-lines-changed'

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
            insertPullrequestTemplate(
                config.prTemplateUrl,
                config.prTemplateCommits
            )
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
    config.ignorePullRequests =
        config.ignorePullRequests === undefined
            ? true
            : config.ignorePullRequests // Todo add proper config
    if (
        !config.ignoreWhitespace &&
        !config.augmentPrEntry &&
        !config.ignorePullRequests
    ) {
        return
    }
    if (config.ignorePullRequests) {
        // Todo: figure out how to run this code after the PRs are loaded, instead of this setInterval hack...
        setInterval(() => {
            let ignoredPrs = localStorage.getItem('ignoredPrs')
            if (ignoredPrs) {
                ignoredPrs = JSON.parse(ignoredPrs)
                $("tr[data-qa*='pull-request-row']").each((index, ele) => {
                    const prId = Number(
                        ele
                            .querySelector('a')
                            .href.match(/pull-requests\/(?<prId>\d+)/)[1]
                    )
                    ele.style['text-decoration'] =
                        ignoredPrs.indexOf(prId) === -1 ? '' : 'line-through'
                })
            }
        }, 1000)
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
    config.ignorePullRequests =
        config.ignorePullRequests === undefined
            ? true
            : config.ignorePullRequests // Todo add proper config
    if (config.ignorePullRequests) {
        // I can't figure out how to execute this *at the right time*, seems bitbucket first creates the entire page
        // then proceed to remove the entire page, then create the entire page again...
        // so i made this setInterval hack that works, but is a waste of cpu cycles
        setInterval(() => {
            if ($('#pull-requests-button').length > 0) {
                return
            }
            const pullRequestButton = document.createElement('span')
            pullRequestButton.id = 'pull-requests-button'
            pullRequestButton.innerHTML =
                '<div class="css-z25nd1"><button aria-pressed="false" aria-label="Ignore this pull request" tabindex="0" type="button" class="css-1v2ovpy"><span class="css-j8fq0c"><span class="css-8xpfx5"><span role="presentation" aria-hidden="true" style="--icon-primary-color: white; --icon-secondary-color: var(--ds-surface, #FFFFFF);" class="css-pxzk9z"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><circle fill="currentColor" cx="12" cy="12" r="10"></circle><path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z" fill="inherit"></path></g></svg></span></span><span class="css-mu6jxl"><span id="ignore-this-pr-inner-span">Ignore this pull request</span></span></span></button></div>'
            $(pullRequestButton).on('click', () => {
                const prId = Number(
                    document.location
                        .toString()
                        .match(/pull-requests\/(?<prId>\d+)/)[1]
                )
                let ignoredPrs = localStorage.getItem('ignoredPrs')
                if (ignoredPr) {
                    ignoredPrs = JSON.parse(ignoredPrs)
                } else {
                    ignoredPrs = []
                }
                const ignoreKey = ignoredPrs.indexOf(prId)
                // Todo find a better way to send the message.. also eslint-disable something
                const fixme = window.alert
                if (ignoreKey === -1) {
                    ignoredPrs.push(prId)
                    localStorage.setItem(
                        'ignoredPrs',
                        JSON.stringify(ignoredPrs)
                    )
                    fixme('added to ignoredPrs')
                } else {
                    ignoredPrs.splice(ignoreKey, 1)
                    localStorage.setItem(
                        'ignoredPrs',
                        JSON.stringify(ignoredPrs)
                    )
                    fixme('removed from ignoredPrs')
                }
            })
            $('.css-vxcmzt:first').prepend(pullRequestButton)
        }, 1000)
    }

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
                syntaxHighlightOldUI(
                    diff,
                    afterWordDiff,
                    config.syntaxHighlightTheme
                )
            }
        }
    }

    const summarySelectors = [
        '#compare-diff-content',
        '#pr-tab-content',
        '#commit',
        '#diff',
    ]
    const diffSelector = 'section.bb-udiff'
    const generalCommentsSelector = '#general-comments'
    const allSelectors = [
        ...new Set([
            ...summarySelectors,
            diffSelector,
            generalCommentsSelector,
        ]),
    ].join(', ')

    // Have to observe the DOM because some sections
    // load asynchronously by user interactions
    // eslint-disable-next-line no-new
    new SelectorObserver(document.body, allSelectors, function() {
        if (
            this.style.display === 'none' ||
            this.getAttribute('aria-hidden') === 'true'
        )
            return
        try {
            if (this.matches(summarySelectors.join(', '))) {
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
    })

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

    if (config.compactFileTree) {
        setCompactPRFileTree()
    }

    if (config.totalLinesChanged) {
        totalLinesChanged(window.location.href)
    }

    if (config.syntaxHighlight) {
        // eslint-disable-next-line no-new
        new SelectorObserver(
            document.body,
            'section[aria-label="Diffs"]',
            function() {
                if (config.syntaxHighlight) {
                    syntaxHighlightNewUI(this, config.syntaxHighlightTheme)
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
