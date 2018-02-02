/* global chrome */

import OptionsSync from 'webext-options-sync';

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install' || details.reason === 'update') {
        window.open(
            'https://github.com/refined-bitbucket/refined-bitbucket/releases/latest'
        );
    }
});

/**
 *  Needed to migrate any saved settings from v3.3.0
 *  and below to v3.4.0 and above
 */
// null to get the entire storage
chrome.storage.sync.get(null, deprecatedOptions => {
    new OptionsSync().define({
        defaults: {
            highlightSyntax: true,
            highlightOcurrences: true,
            ignoreWhitespace: true,
            keymap: true,
            collapseDiff: true,
            loadAllDiffs: true,
            closeAnchorBranch: true,
            improveFonts: true,
            addSidebarCounters: true,
            prTemplateEnabled: true,
            defaultMergeStrategy: 'merge_commit',
            autocollapsePaths: ['package-lock.json', 'yarn.lock'],
            autocollapseDeletedFiles: true,
            ignorePaths: ['']
        },
        migrations: [
            (newOptions, currentDefaults) => {
                Object.keys(currentDefaults).forEach(key => {
                    if (key in deprecatedOptions) {
                        newOptions[key] = deprecatedOptions[key];
                    }
                });

                // Until v3.3.0, these paths were saved as arrays.
                // Since we are now using 'webext-options-sync',
                // every stored value must be a primitive
                if (Array.isArray(newOptions.ignorePaths)) {
                    newOptions.ignorePaths = newOptions.ignorePaths.join('\n');
                }
                if (Array.isArray(newOptions.autocollapsePaths)) {
                    newOptions.autocollapsePaths = newOptions.autocollapsePaths.join(
                        '\n'
                    );
                }

                chrome.storage.sync.clear();
            },
            OptionsSync.migrations.removeUnused
        ]
    });
});
