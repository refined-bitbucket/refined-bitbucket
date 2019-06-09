// @flow
// @jsx h

import { h } from 'dom-chef'
import api, { type PullRequestActivity } from '../api'

export const addUsernameWithLatestUpdate = (
    prNode: HTMLElement,
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

    const prUpdateTime = ((prNode.querySelector(
        '.pr-number-and-timestamp'
    ): any): HTMLElement).firstElementChild

    if (author && prUpdateTime) {
        prUpdateTime.append(` by ${author} (${activityType})`)
    }
}

export default function augmentPrEntry(prNode: HTMLElement) {
    const prId = prNode.dataset.pullRequestId

    if (!prId) {
        return
    }

    api.getPullrequestActivity(prId).then(prActivity => {
        if (prActivity) {
            addUsernameWithLatestUpdate(prNode, prActivity)
        }
    })
}
