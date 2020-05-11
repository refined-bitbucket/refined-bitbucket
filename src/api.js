// @flow
/* eslint-disable no-undef */

import { getRepoURL } from './page-detect'
import { getApiToken } from './utils'
import { RequestTypes } from './background-for-requests'

export type User = {
    display_name: string,
    avatar_url: string,
    mention_id: string,
    nickname: string,
    uuid?: string,
}

// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
export type PullRequest = {
    id: number,
    title: string,
    description: string,
    created_on: Date,
    source: { branch: { name: string } },
    destination: { branch: { name: string } },
    participants: Array<{ approved: boolean, user: User }>,
}

// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/activity
export type PullRequestActivity = {|
    values: Array<
        | $Exact<{ update: { author: User } }>
        | $Exact<{ approval: { user: User } }>
        | $Exact<{ comment: { user: User } }>
    >,
|}

type DataSize = $Exact<{ size: number }>

const repoUrl = getRepoURL()
const token = getApiToken()
const sendMessageCb = sendMessage(repoUrl, token)

const api = {
    getBranches(): Promise<DataSize | void> {
        return sendMessageCb(RequestTypes.getBranches)
    },
    getPullrequests(): Promise<DataSize | void> {
        return sendMessageCb(RequestTypes.getPullrequests)
    },
    getPullrequest(id: number | string): Promise<PullRequest | void> {
        return sendMessageCb(RequestTypes.getPullrequest, { id })
    },
    getPullrequestActivity(
        id: number | string
    ): Promise<PullRequestActivity | void> {
        return sendMessageCb(RequestTypes.getPullrequestActivity, { id })
    },
    getPullrequestCommits(id: number | string): Promise<DataSize | void> {
        return sendMessageCb(RequestTypes.getPullrequestCommits, { id })
    },
    getSearchedUsers(term: string): Promise<User[]> {
        return sendMessageCb(RequestTypes.getSearchedUsers, { term })
    },
}

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
function sendMessage(repoUrl: string, token: string) {
    return (name: string, data?: {}) => {
        return new Promise(resolve => {
            // $FlowIgnore
            chrome.runtime.sendMessage(
                { repoUrl, token, name, ...data },
                resolve
            )
        })
    }
}

export default api
