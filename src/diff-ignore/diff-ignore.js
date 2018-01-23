'use strict';

import elementReady from 'element-ready';
import ignore from 'ignore';
import { h } from 'dom-chef';
import { getFilepathFromElement } from '../syntax-highlight/source-handler';

let ig = null;

/**
 * @param {HTMLDivElement} node
 * @param {string[]} ignorePaths
 */
export function init(node, ignorePaths) {
    ig = ignore().add(ignorePaths);

    const filesChanged = node.querySelectorAll('#commit-files-summary > li');
    const filesToRemove = [...filesChanged].filter(li =>
        ig.ignores(getFilename(li))
    );

    filesToRemove.forEach(async li => {
        // Remove the link to the file from the files summary
        const filename = getFilename(li);
        const span = <span style={{ margin: 5 }}>{filename}</span>;
        const a = li.querySelector('a');
        li.replaceChild(span, a);

        // Remove the diff
        const dataIdentifier = li.getAttribute('data-file-identifier');
        const diff = await elementReady(
            `section[data-identifier="${dataIdentifier}"]`,
            { target: node }
        );
        diff.remove();
    });

    // Update the "Files changed" summary header to reflect the removed diffs count
    const summaryHeader = node.querySelector(
        '#pullrequest-diff > section.main > h1, #commit-summary > h1'
    );
    summaryHeader.textContent += ` - Showing ${filesChanged.length -
        filesToRemove.length} of ${filesChanged.length}`;
}

/**
 * @param {HTMLLIElement} li
 */
function getFilename(li) {
    return li.querySelector('a').textContent.trim();
}

/**
 * @param {HTMLSectionElement} section
 */
export function isIgnored(section) {
    const filename = getFilepathFromElement(section);
    return ig.ignores(filename);
}
