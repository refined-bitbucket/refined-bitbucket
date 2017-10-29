'use strict';

import waitForRender from '../wait-for-render';
import elementReady from 'element-ready';
import ignore from 'ignore';

export default {
    init,
    collapseIfNeeded
};

let ig;

export function init(autocollapsePaths) {
    ig = ignore().add(autocollapsePaths);
}

export function collapseIfNeeded(section) {
    if (ig) {
        collapseIfNeededAsync(section);
    } else {
        console.error(`refined-bitbucket: You need to call \`.${init.name}\` before \`.${collapseIfNeeded.name}\``);
    }
}

async function collapseIfNeededAsync(section) {
    const filename = section.getAttribute('data-filename').trim();

    if (!ig.ignores(filename)) {
        return;
    }

    // Use the commented line below instead of the one below it when this issue is resolved https://github.com/sindresorhus/element-ready/issues/10
    // const button = await elementReady('.__refined_bitbucket_collapse_diff_button', {target: section});
    const button = await elementReady(`section[data-identifier="${section.getAttribute('data-identifier')}"] .__refined_bitbucket_collapse_diff_button`);
    button.click();
}
