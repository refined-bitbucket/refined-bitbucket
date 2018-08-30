import { h } from 'dom-chef'
import { ago } from 'time-ago'
import { getRepoURL } from '../page-detect'
import api from '../api'

import './augment-pr-entry.css'
import linkifyTargetBranch from '../linkify-target-branch/linkify-target-branch'

const buildSourceBranchNode = branchName => {
    const repoUrl = getRepoURL()
    return (
        <span class="__rbb-pull-request-source-branch">
            <span class="ref-label">
                <span class="ref branch">
                    <span class="name" aria-label={`branch ${branchName}`}>
                        <a
                            style={{ color: '#707070' }}
                            title={branchName}
                            href={`https://bitbucket.org/${repoUrl}/branch/${branchName}`}
                        >
                            {branchName}
                        </a>
                    </span>
                </span>
            </span>
        </span>
    )
}

export const addSourceBranch = async (prNode, prData) => {
    const sourceBranchNode = buildSourceBranchNode(prData.source.branch.name)
    const arrow = prNode.querySelector('span.aui-iconfont-devtools-arrow-right')
    arrow.parentElement.insertBefore(sourceBranchNode, arrow)
}

export const addCreationDate = async (prNode, prData) => {
    const date = new Date(prData.created_on)
    const dateString = date.toDateString()
    const creationDateNode = (
        <div title={dateString} datetime={prData.created_on}>
            Created on {dateString} ({ago(date)})
        </div>
    )

    const prNumberAndTimestamp = prNode.querySelector(
        '.pr-number-and-timestamp'
    )
    prNumberAndTimestamp.append(<br />)
    prNumberAndTimestamp.appendChild(creationDateNode)
}

export const addUsernameWithLatestUpdate = async (prNode, prActivity) => {
    // pull requests by default have the initial commit info as an activity
    const mostRecentAction = prActivity.values[0]
    let author = ''

    // merges, commit updates
    if (mostRecentAction.update) {
        author = mostRecentAction.update.author.display_name
    } else if (mostRecentAction.approval) {
        // approvals
        author = mostRecentAction.approval.user.display_name
    } else if (mostRecentAction.comment) {
        // comments
        author = mostRecentAction.comment.user.display_name
    }

    const prUpdateTime = prNode.querySelector('.pr-number-and-timestamp')
        .firstElementChild

    if (author && prUpdateTime) {
        prUpdateTime.append(` by ${author}`)
    }
}

export default function augmentPrEntry(prNode) {
    linkifyTargetBranch(prNode)

    const prId = prNode.dataset.pullRequestId

    api.getPullrequest(prId).then(prData => {
        if (prData) {
            addSourceBranch(prNode, prData)
            addCreationDate(prNode, prData)
        }
    })

    api.getPullrequestActivity(prId).then(prActivity => {
        if (prActivity) {
            addUsernameWithLatestUpdate(prNode, prActivity)
        }
    })
}
