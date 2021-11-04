// @flow
/* eslint-disable no-undef */

import { getRepoURL } from './page-detect'
import { getApiToken } from './utils'

// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
export type PullRequest = {|
    id: number,
    title: string,
    description: string,
    created_on: Date,
    source: { branch: { name: string } },
    destination: { branch: { name: string } },
    participants: Array<{
        approved: boolean,
        user: {
            nickname: string,
            display_name: string,
        },
    }>,
|}

// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/activity
export type PullRequestActivity = {|
    values: Array<
        | {|
              update: {
                  author: { display_name: string },
                  destination: { commit: { hash: string, type: string } },
              },
          |}
        | {|
              approval: { user: { display_name: string } },
          |}
        | {| comment: { user: { display_name: string } } |}
    >,
|}

// https://bitbucket.org/!api/2.0/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7DprId%7B/commits
export type PullRequestCommits = {|
    pagelen: number,
    page: number,
    values: Array<{|
        hash: string,
        type: string,
        message: string,
        date: string,
    |}>,
|}

//
export type PullRequestDiffStats = {|
    size: number,
    values: Array<{|
        lines_added: number,
        lines_removed: number,
    |}>,
|}

const repoUrl = getRepoURL()
const token = getApiToken()
const sendMessageCb = sendMessage(repoUrl, token)

const api = {
    getRepo(): Promise<{ mainbranch: { type: string, name: string } }> {
        return sendMessageCb('getRepo')
    },
    getBranches(): Promise<{| size: number |} | void> {
        return sendMessageCb('getBranches')
    },
    getPullrequests(): Promise<{| size: number |} | void> {
        return sendMessageCb('getPullrequests')
    },
    getPullrequest(id: number | string): Promise<PullRequest | void> {
        return sendMessageCb('getPullrequest', { id })
    },
    getPullrequestActivity(
        id: number | string
    ): Promise<PullRequestActivity | void> {
        return sendMessageCb('getPullrequestActivity', { id })
    },
    getPullrequestCommits(
        id: number | string
    ): Promise<PullRequestCommits | void> {
        return sendMessageCb('getPullrequestCommits', { id })
    },
    getPullrequestFiles(
        id: number | string,
        hash1: string,
        hash2: string
    ): Promise<PullRequestDiffStats | void> {
        return sendMessageCb('getPullrequestFiles', { id, hash1, hash2 })
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
