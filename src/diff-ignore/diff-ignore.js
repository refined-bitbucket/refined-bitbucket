'use strict'

import elementReady from 'element-ready'
import ignore from 'ignore'
import { h } from 'dom-chef'
import { getFilepathFromElement } from '../syntax-highlight/source-handler'

let ig = null

/**
 * Get the filename from the HTMLElement
 * @param {HTMLLIElement} li Node with the filename changed
 * @returns {string} Filename
 * */
const getFilename = li => li.querySelector('a').textContent.trim()

export function init(ignorePaths) {
    ig = ignore().add(ignorePaths)
}

/**
 * Removes the diffs that are ignored
 * @param {HTMLDivElement} summaryNode Node with the summary of the changes
 * @param {string[]} ignorePaths Paths to ignore
 */
export async function execute(summaryNode) {
    await elementReady('#commit-files-summary > li', {
        target: summaryNode,
    })

    const filesChanged = summaryNode.querySelectorAll(
        '#commit-files-summary > li'
    )
    const filesToRemove = [...filesChanged].filter(li =>
        ig.ignores(getFilename(li))
    )

    filesToRemove.forEach(async li => {
        // Remove the link to the file from the files summary
        const filename = getFilename(li)
        const span = <span style={{ margin: 5 }}>{filename}</span>
        const a = li.querySelector('a')
        li.replaceChild(span, a)

        // Remove the diff
        const dataIdentifier = li.getAttribute('data-file-identifier')
        const diff = await elementReady(
            `section[data-identifier="${dataIdentifier}"]`,
            { target: summaryNode }
        )
        diff.remove()
    })

    // Update the "Files changed" summary header to reflect the removed diffs count
    const summaryHeader = summaryNode.querySelector(
        '#pullrequest-diff > section.main > h1, #commit-summary > h1, #compare-diff-content > h1, ' +
            '#diff > h1'
    )
    summaryHeader.textContent += ` - Showing ${filesChanged.length -
        filesToRemove.length} of ${filesChanged.length}`
}

/**
 * Is this diff ignored?
 * @param {HTMLSectionElement} diff Diff
 * @returns {boolean} Wether the diff is ignored
 **/
export function isIgnored(diff) {
    const filename = getFilepathFromElement(diff)
    return ig.ignores(filename)
}
