/* jshint esversion: 6 */

(() => {
    'use strict';
    
    window.StorageHelper = (() => {
        const defaults = {
            highlighterEnabled: false,
            doubleClickWordSelectionEnabled: false,
            pullRequestActionsControlEnabled: false,
            minApprovals: 2
        };

        const store = {
            storage: {
                get: cb => {
                    window.chrome.storage.sync.get(defaults, items => {
                        cb(null, items);
                    });
                },
                set: obj => {
                    window.chrome.storage.sync.set(obj);
                }
            }
        };

        store.defaults = defaults;

        return store;
    })();
})();
