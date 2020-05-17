// @flow

import ignore, { type Ignore } from 'ignore'
import { toggleDiff } from '../collapse-diff'

let ig: Ignore
let autocollapseDeletedFiles: boolean

export function init(
    autocollapsePaths: string[],
    collapseDeletedFiles: boolean
) {
    ig = ignore().add(autocollapsePaths)
    autocollapseDeletedFiles = collapseDeletedFiles
}

export function collapseIfNeeded(section: HTMLElement): Boolean {
    if (ig) {
        return collapseIfNeededAsync(section)
    } else {
        console.error(
            `refined-bitbucket: You need to call \`.${init.name}\` before \`.${
                collapseIfNeeded.name
            }\``
        )
        return false
    }
}

function collapseIfNeededAsync(section: HTMLElement): Boolean {
    const filename = ((section.getAttribute(
        'data-filename'
    ): any): string).trim()
    const isDeleted = Boolean(
        section.querySelector(
            'h1.filename span.diff-entry-lozenge.aui-lozenge-error'
        )
    )

    const shouldCollapse =
        ig.ignores(filename) || (autocollapseDeletedFiles && isDeleted)

    if (shouldCollapse) {
        toggleDiff(section)
    }

    return shouldCollapse
}
