// @flow
// @jsx h

import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'

import './total-lines-changed.css'

const FILES_TAB_SELECTOR = '[data-testid="sidebar-tab-files"]'

function toReadableNumber(num: number): string {
    if (num > 1000000) {
        return String(Math.round(num / 1000000)) + 'M'
    } else if (num > 1000) {
        return String(Math.round(num / 1000)) + 'K'
    }
    return String(num)
}

function handleDiffStats(diffStats) {
    if (diffStats && diffStats.size) {
        if (diffStats.size < 1000) {
            const totalAdded: number = diffStats.values
                .map(val => val.lines_added)
                .reduce((partialSum, a) => partialSum + a, 0)
            const totalRemoved: number = diffStats.values
                .map(val => val.lines_removed)
                .reduce((partialSum, a) => partialSum + a, 0)

            const linesAddedBadge = (
                <span class="__rbb-total-lines-added">
                    +{toReadableNumber(totalAdded)}
                </span>
            )
            const linesRemovedBadge = (
                <span class="__rbb-total-lines-removed">
                    -{toReadableNumber(totalRemoved)}
                </span>
            )
            // Refetch since the element could have been re-rendered in the meantime
            const filesTab: HTMLElement | nullfilesTab = document.querySelector(
                FILES_TAB_SELECTOR
            )
            const filesCounter = document.querySelector(
                `${FILES_TAB_SELECTOR} > span:nth-child(2)`
            )
            if (filesTab && filesCounter) {
                filesTab.insertBefore(
                    linesRemovedBadge,
                    filesCounter.nextSibling
                )
                filesTab.insertBefore(linesAddedBadge, filesCounter.nextSibling)
            } else {
                console.warn('Failed to find files tab counter')
            }
        } else {
            console.warn(
                'More than a 1000 files changed, skipping total calculation'
            )
        }
    } else {
        console.warn('There seem to be no changed files')
    }
}

export default async function totalLinesChanged(url: string) {
    let filesTab: HTMLElement | null = await elementReady(
        `${FILES_TAB_SELECTOR} > span:nth-child(2)`
    )

    const matches = url.match(/\/pull-requests\/(\d+)/)
    const prId: string | typeof undefined = (matches || [])[1]

    if (prId) {
        const commits = await api.getPullrequestCommits(prId)
        const activity = await api.getPullrequestActivity(prId)

        const hash1 = (((commits || {}).values || [])[0] || {}).hash
        const hash2 = (
            (
                (
                    (
                        ((activity || {}).values || []).find(value =>
                            Boolean((value: any).update)
                        ) || {}
                    ).update || {}
                ).destination || {}
            ).commit || {}
        ).hash

        if (hash1 && hash2) {
            const diffStats = await api.getPullrequestFiles(prId, hash1, hash2)
            handleDiffStats(diffStats)
        } else {
            console.warn('Could not find hashes to fetch file diffs')
        }
    } else {
        console.warn('Could not find pull request id')
    }

    return document.querySelector(FILES_TAB_SELECTOR)
}
