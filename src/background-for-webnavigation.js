/* eslint-disable no-undef */

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    chrome.tabs.sendMessage(details.tabId, {
        message: 'onHistoryStateUpdated',
        details,
    })
})
