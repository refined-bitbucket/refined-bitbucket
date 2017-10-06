/* global chrome */

(function () {
    'use strict';

    const highlightSyntaxElement = document.getElementById('syntax-highlight');
    const highlightOcurrencesElement = document.getElementById('highlight-ocurrences');
    const approvalsElement = document.getElementById('approvals');
    const bitbucketServerDomainElement = document.getElementById('bitbucket-server-domain');
    const statusElement = document.getElementById('status');

    async function saveOptions() {
        if (!bitbucketServerDomainElement.value) {
            storeOptions();
            return;
        } else {
            if (!chrome.permissions) {
                setFailedStatus('Your browser doesn\'t support the `permissions` API to authorize a custom Bitbucket Server domain.');
                return;
            }

            await removePreviousOptionalPermissionsOrigins();

            const origin = getURLOrigin(bitbucketServerDomainElement.value);

            if (!origin) {
                setFailedStatus(`'${bitbucketServerDomainElement.value}' is not a valid URL.`);
                return;
            }

            chrome.permissions.request({
                origins: [
                    `${origin}/*`
                ]
            }, granted => {
                if (granted) {
                    storeOptions();
                } else {
                    setFailedStatus('Couldn\'t grant permissions to authorize a custom Bitbucket Server domain.');
                }
            });
        }
    }

    function removePreviousOptionalPermissionsOrigins() {
        return new Promise(async resolve => {
            const permissions = await new Promise(r => chrome.permissions.getAll(r));

            const promises = permissions.origins.map(o => {
                return new Promise(r => {
                    chrome.permissions.remove({ 
                        origins: [o] 
                    }, removed => {
                        if (chrome.runtime.lastError) {
                            // Ignore remove attempt of required permissions
                        }
                        r();
                    });
                });
            });

            await Promise.all(promises);
            resolve();
        });
    }

    function getURLOrigin(url) {
        try {
            return new URL(url).origin;
        } catch (e) {
        }
    }

    function storeOptions() {
        const highlightSyntax = highlightSyntaxElement.checked;
        const highlightOcurrences = highlightOcurrencesElement.checked;
        const minimumNumberOfApprovals = approvalsElement.value;
        const bitbucketServerDomain = bitbucketServerDomainElement.value;

        chrome.storage.sync.set({
            highlightSyntax,
            highlightOcurrences,
            minimumNumberOfApprovals,
            bitbucketServerDomain
        }, () => {
            setSuccessfulStatus('Options saved.');
            setTimeout(() => {
                setSuccessfulStatus('');
            }, 1500);
        });
    }

    function restoreOptions() {
        chrome.storage.sync.get({
            highlightSyntax: true,
            highlightOcurrences: true,
            minimumNumberOfApprovals: 2,
            bitbucketServerDomain: '',
        }, options => {
            highlightSyntaxElement.checked = options.highlightSyntax;
            highlightOcurrencesElement.checked = options.highlightOcurrences;
            approvalsElement.value = options.minimumNumberOfApprovals;
            bitbucketServerDomainElement.value = options.bitbucketServerDomain;
        });
    }

    function setFailedStatus(textContent) {
        statusElement.style = 'color: red';
        statusElement.textContent = textContent;
    }

    function setSuccessfulStatus(textContent) {
        statusElement.style = 'color: green';
        statusElement.textContent = textContent;
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
})();
