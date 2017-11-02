'use strict';

import test from 'ava';
import jsdom from 'jsdom';
import { h } from 'dom-chef';
import delay from 'yoctodelay';
import elementReady from 'element-ready';

import loadAllDiffs from '../src/load-all-diffs';

import './setup-jsdom';

/**
 * Returns the `HTMLElement` representing the node that contains a pull request
 * @param {string[]} filenames
 * @return {HTMLDivElement}
 */
function getPullrequestNode(filename) {
    const escapedFilename = escape(filename);
    const node = (
        <div id="pr-tab-content">
            <div id="pullrequest-diff">
                {/* Header and file summary */}
                <section class="main">
                    <h1>Files changed <span>(1)</span></h1>
                    <ul id="commit-files-summary">
                        <li data-file-identifier={escapedFilename}><a>{filename}</a></li>
                    </ul>
                </section>

                {/* Diffs */}
                <div id="compare">
                    <section id="changeset-diff">
                        <div class="bb-patch bb-patch-unified">
                            {/* Failed diffs not initially loaded */}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );

    // Add the failed diff after some delay
    delay(20).then(() => {
        const failedDiff = (
            <section class="bb-udiff" data-identifier={escapedFilename}>
                <strong class="try-again">Oops! You've got a lot of code in this diff and it couldn't load with the page.</strong>
                <a class="load-diff try-again">Click here to give it another chance.</a>
            </section>
        );
        const diffsContainer = node.querySelector('div.bb-patch');
        diffsContainer.appendChild(failedDiff);
        failedDiff.querySelector('a.try-again').addEventListener('click', function() {
            // After some other delay, replace the failed diff with a successfull diff
            delay(20).then(() => {
                const loadedDiff = (
                    <section class="bb-udiff" data-identifier={escapedFilename}>
                        <div class="diff-container"></div>
                    </section>
                );

                diffsContainer.replaceChild(loadedDiff, failedDiff);
            });
        });
    });

    return node;
}

test('should load all failed diffs when button pressed', async t => {
    // Don't remove the spaces from this filename
    const filename = '/path/dummy file name.js';
    const node = getPullrequestNode(filename);

    loadAllDiffs.init(node);

    // Wait for the button to be added after all failed diffs are loaded in the page
    const button = await elementReadyWithTimeout('button[id="__refined_bitbucket_load_all_diffs"]', {target: node});

    // Assert the initial state of the button
    t.is(button.disabled, false);
    t.is(button.textContent, 'Load all failed diffs (1)');

    button.click();

    // Assert the state of the button after being clicked, when failed diffs are reloading
    t.is(button.disabled, true);
    t.is(button.textContent, 'Please wait');

    // Wait for the failed diffs to be reloaded
    await elementReadyWithTimeout(`section[data-identifier="${escape(filename)}"] > div.diff-container`, {target: node});

    // Wait for the button to be updated
    await elementReadyWithTimeout('button[id="__refined_bitbucket_load_all_diffs"][data-complete="true"]', {target: node});

    // Assert the state of the button after the operation is complete
    t.is(button.disabled, true);
    t.is(button.textContent, 'All diffs loaded successfully');
});

function elementReadyWithTimeout(selector, options, timeout = 1000) {
    const promise = elementReady(selector, options);
    setTimeout(function() {
        promise.cancel();
    }, timeout);
    return promise;
}
