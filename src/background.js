/* global chrome */

import OptionsSync from 'webext-options-sync'

const justInstalledOrUpdated = new Promise((resolve, reject) => {
    chrome.runtime.onInstalled.addListener(details => {
        if (details.reason === 'install' || details.reason === 'update') {
            resolve()
        } else {
            reject()
        }
    })
})

new OptionsSync().define({
    defaults: {
        syntaxHighlight: true,
        autolinker: true,
        highlightOcurrences: true,
        ignoreWhitespace: true,
        copyFilename: true,
        keymap: true,
        collapsePullRequestDescription: true,
        collapseDiff: true,
        loadAllDiffs: true,
        closeAnchorBranch: true,
        addSidebarCounters: true,
        diffPlusesAndMinuses: true,
        augmentPrEntry: true,
        comparePagePullRequest: true,
        prTemplateEnabled: true,
        prTemplateUrl: null,
        mergeCommitMessageEnabled: false,
        mergeCommitMessageUrl: null,
        pullrequestCommitAmount: true,
        showCommentsCheckbox: true,
        defaultMergeStrategy: 'merge_commit',
        autocollapsePaths: [
            'package-lock.json',
            'yarn.lock',
            'composer.lock',
        ].join('\n'),
        autocollapseDeletedFiles: true,
        ignorePaths: [''].join('\n'),
        customTabSizeEnabled: true,
        customTabSize: 4,
        customStyles: '',
        enableUpdateNotifications: true,
        stickyHeader: true,
    },
    migrations: [
        async savedOptions => {
            if (savedOptions.enableUpdateNotifications) {
                await justInstalledOrUpdated
                // DO NOT COMMIT THE FOLLOWING COMMENTED OUT CODE
                // window.open(
                //     'https://github.com/refined-bitbucket/refined-bitbucket/releases/latest'
                // )
            }
        },
        OptionsSync.migrations.removeUnused,
    ],
})
