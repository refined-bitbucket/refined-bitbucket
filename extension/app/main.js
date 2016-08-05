/* jshint esversion: 6 */

require({
    baseUrl: chrome.extension.getURL('/'),
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min'
    }
}, ['app/highlighter', 'app/doubleClickWordSelection', 'app/pullRequestActionsControl'],
    (highlighter, doubleClickWordSelection, pullRequestActionsControl) => {
        window.StorageHelper.storage.get((err, items) => {
            if (err) {
                throw err;
            }

            highlighter.init();

            if (items.doubleClickWordSelectionEnabled) {
                doubleClickWordSelection.run();
            }

            if (items.pullRequestActionsControlEnabled) {
                pullRequestActionsControl.run();
            }
        });
    }
);
