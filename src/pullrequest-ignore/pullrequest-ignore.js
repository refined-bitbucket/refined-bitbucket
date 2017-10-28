'use strict';

import waitForRender from '../wait-for-render';
import elementReady from 'element-ready';
import ignore from 'ignore';


export function init(pullrequestNode, ignorePaths) {
    const ig = ignore().add(ignorePaths);

    pullRequestContentsNode.observeSelector('div.diff-container', function () {
        collapseIfNeeded(ig, this.closest('section'));
    });
}

function collapseIfNeeded(ig, section) {
    const filename = section.getAttribute('data-identifier');

    if (!ig.ignores(filename)) {
        return;
    }

    // if diff was not loaded, collapse button won't exist
    const diffLoaded = !section.querySelector('div.too-big-message');
    if (diffLoaded) {
        // const button = await elementReady('.__refined_bitbucket_collapse_diff_button', {target: section});
        const button = await elementReady('section[data-identifier="${filename}"] > .__refined_bitbucket_collapse_diff_button');
        button.click();
    }
    return;

    // const filesChanged = [...pullrequestNode.querySelectorAll('#commit-files-summary > li')]
    //     .map(li => li.getAttribute('data-file-identifier'))
    //     .filter(filename => ig.ignores(filename))
    //     .forEach(async filename => {
    //         const section = await waitForRender(`section[data-identifier="${filename}"]`);
    //         // if diff was not loaded, collapse button won't exist
    //         const diffLoaded = !section.querySelector('div.too-big-message');
    //         if (diffLoaded) {
    //             const button = await elementReady('.__refined_bitbucket_collapse_diff_button', {target:section});
    //             button.click();
    //         }
    //     });
}