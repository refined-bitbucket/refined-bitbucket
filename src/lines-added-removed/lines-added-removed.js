'use strict'

import elementReady from 'element-ready'
import { h } from 'dom-chef'

const sum = (num, currentSum) => num + currentSum

const totalChangedLines = nodeList =>
    Array.from(nodeList)
        .map(span => Math.abs(parseInt(span.textContent, 10)))
        .reduce(sum, 0)

function totalStatRow(node) {
    const linesAdded = totalChangedLines(
        node.querySelectorAll('span.lines-added')
    )
    const linesRemoved = totalChangedLines(
        node.querySelectorAll('span.lines-removed')
    )

    return (
        <li
            class="iterable-item file file-modified"
            id="__refined_bitbucket_total_modified"
        >
            <div class="commit-file-diff-stats">
                <span class="lines-added">+{linesAdded}</span>
                <span class="lines-removed">-{linesRemoved}</span>
            </div>
            <span class="diff-summary-lozenge aui-lozenge aui-lozenge-subtle aui-lozenge-complete">
                +/-
            </span>
            <span class="commit-files-summary--filename">
                <b>Total Lines Changed</b>
            </span>
        </li>
    )
}

export default async function linesAddedRemoved(node) {
    // Wait for all sections to be loaded into the view
    await elementReady('#commit-files-summary > li', {
        target: node,
    })

    const filesSummary = node.querySelector('ul#commit-files-summary')

    // Prepend a line with the total lines removed and added to the file summary list.
    filesSummary.insertBefore(
        totalStatRow(node),
        filesSummary.firstElementChild
    )
}
