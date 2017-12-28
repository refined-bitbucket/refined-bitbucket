'use strict';

import elementReady from 'element-ready';
import ignore from 'ignore';
import {toggleDiff} from '../collapse-diff/collapse-diff';

export default {
    init,
    collapseIfNeeded
};

let ig;

function init(autocollapsePaths) {
    ig = ignore().add(autocollapsePaths);
}

function collapseIfNeeded(section) {
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

    await elementReady('.__refined_bitbucket_collapse_diff_button', {target: section});
    toggleDiff(section);
}
