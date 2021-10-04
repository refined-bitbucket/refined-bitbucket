// @flow
// @jsx h

import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'

import './total-lines-changed.css'

const FILES_TAB_SELECTOR = '[data-testid="sidebar-tab-files"]'

let totalAdded: number
let totalRemoved: number

export default async function totalLinesChanged(url) {
    let filesTab: HTMLElement = await elementReady(
        `${FILES_TAB_SELECTOR} > span + span`
    )

    const matches = url.match(/\/pull-requests\/(\d+)/)
    const prId = matches[1]

    if (prId) {
        const commits = await api.getPullrequestCommits(prId)
        const activity = await api.getPullrequestActivity(prId)

        const hash1 = commits.values[0].hash
        const hash2 = (
            (
                (
                    (activity.values.find(value => Boolean(value.update)) || {})
                        .update || {}
                ).destination || {}
            ).commit || {}
        ).hash

        if (hash1 && hash2) {
            const diffStats = await api.getPullrequestFiles(prId, hash1, hash2)

            if (diffStats && diffStats.size) {
                totalAdded = diffStats.values
                    .map(val => val.lines_added)
                    .reduce((partialSum, a) => partialSum + a, 0)
                totalRemoved = diffStats.values
                    .map(val => val.lines_removed)
                    .reduce((partialSum, a) => partialSum + a, 0)
                const linesAddedBadge = (
                    <span class="__rbb-total-lines-added">+{totalAdded}</span>
                )
                const linesRemovedBadge = (
                    <span class="__rbb-total-lines-removed">
                        -{totalRemoved}
                    </span>
                )
                // Refetch since the element could have been re-rendered in the meantime
                filesTab = document.querySelector(FILES_TAB_SELECTOR)
                filesTab.appendChild(linesAddedBadge)
                filesTab.appendChild(linesRemovedBadge)
            } else {
                console.warn('There seem to be no changed files')
            }
        } else {
            console.warn('Could not find hashes to fetch file diffs')
        }
    } else {
        console.warn('Could not find pull request id')
    }

    return filesTab
}
