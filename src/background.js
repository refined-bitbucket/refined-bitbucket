/* global chrome */

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install' || details.reason === 'update') {
        window.open('https://github.com/refined-bitbucket/refined-bitbucket/releases/latest');
    }
});
