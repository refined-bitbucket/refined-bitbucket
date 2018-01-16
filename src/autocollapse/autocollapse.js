'use strict';

import elementReady from 'element-ready';
import ignore from 'ignore';
import {toggleDiff} from '../collapse-diff/collapse-diff';

export default {
    init,
    collapseIfNeeded
};

let ig;
let autocollapseDeletedFiles;

function init(autocollapsePaths, autocollapseDeletedFiles) {
    ig = ignore().add(autocollapsePaths);
    autocollapseDeletedFiles = autocollapseDeletedFiles;
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
    const isDeleted = section.querySelector('h1.filename span.diff-entry-lozenge.aui-lozenge-error');

    const shouldCollapse = ig.ignores(filename) || (autocollapseDeletedFiles && isDeleted);
    
    if (shouldCollapse) {
        await elementReady('.__refined_bitbucket_collapse_diff_button', {target: section});
        toggleDiff(section);
    }
}
