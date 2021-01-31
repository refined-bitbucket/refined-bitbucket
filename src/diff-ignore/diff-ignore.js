// @flow
// @jsx h

import elementReady from 'element-ready'
import ignore, { type Ignore } from 'ignore'
import { h } from 'dom-chef'
import { getFilepathFromElement } from '../syntax-highlight/old-ui/get-file-path'

let ig: Ignore

/**
 * Get the filename from the HTMLElement
 * @param {HTMLLIElement} li Node with the filename changed
 * @returns {string} Filename
 **/
const getFilename = li =>
    ((li.querySelector('a'): any): HTMLAnchorElement).textContent.trim()

export function init(ignorePaths: string[]) {
    ig = ignore().add(ignorePaths)
}

/**
 * Removes the diffs that are ignored
 * @param {HTMLDivElement} summaryNode Node with the summary of the changes
 */
export async function execute(summaryNode: HTMLElement) {
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
        const a: HTMLAnchorElement = (li.querySelector('a'): any)
        li.replaceChild(span, a)

        // Remove the diff
        const dataIdentifier = li.getAttribute('data-file-identifier') || ''
        const diff = await elementReady(
            `section[data-identifier="${dataIdentifier}"]`,
            { target: summaryNode }
        )
        diff.remove()
    })

    // Update the "Files changed" summary header to reflect the removed diffs count
    const summaryHeader: HTMLHeadingElement = (summaryNode.querySelector(
        '#pullrequest-diff > section.main > h1, #commit-summary > h1, #compare-diff-content > h1, ' +
            '#diff > h1'
    ): any)
    summaryHeader.textContent += ` - Showing ${filesChanged.length -
        filesToRemove.length} of ${filesChanged.length}`
}

/**
 * Is this diff ignored?
 * @param {HTMLSectionElement} diff Diff
 * @returns {boolean} Wether the diff is ignored
 **/
export function isIgnored(diff: HTMLElement): boolean {
    const filename = getFilepathFromElement(diff)
    return ig.ignores(filename)
}
