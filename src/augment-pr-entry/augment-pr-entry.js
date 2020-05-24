// @flow
// @jsx h

import { h } from 'dom-chef'
import api, { type PullRequestActivity } from '../api'

declare var $: any

export function addSourceBranch(prRow: HTMLElement) {
    if (window.innerWidth <= 1200)
        $(prRow)
            .find('td :hidden')
            .has('div[role="button"]:hidden')
            .show()
}

export const addUsernameWithLatestUpdate = (
    prRow: HTMLElement,
    prActivity: PullRequestActivity
) => {
    // Pull requests by default have the initial commit info as an activity
    const mostRecentAction = prActivity.values[0]
    let author = ''
    let activityType = ''

    // Merges, commit updates
    if (mostRecentAction.update) {
        author = mostRecentAction.update.author.display_name
        activityType = 'Committed'
    } else if (mostRecentAction.approval) {
        // Approvals
        author = mostRecentAction.approval.user.display_name
        activityType = 'Approved'
    } else if (mostRecentAction.comment) {
        // Comments
        author = mostRecentAction.comment.user.display_name
        activityType = 'Commented'
    }

    const prSubline = ((prRow.querySelector('td small'): any): HTMLElement)

    if (author && prSubline) {
        prSubline.append(` by ${author} (${activityType})`)
    }
}

export default function augmentPrEntry(prRow: HTMLElement) {
    addSourceBranch(prRow)

    const link: HTMLAnchorElement = (prRow.querySelector(
        'a[data-qa="pull-request-row-link"]'
    ): any)
    const url = new URL(link.href)
    const splitPath = url.pathname.split('/')
    const prId = splitPath[splitPath.length - 1]

    if (!prId) {
        return
    }

    api.getPullrequestActivity(prId).then(prActivity => {
        if (prActivity) {
            addUsernameWithLatestUpdate(prRow, prActivity)
        }
    })
}
