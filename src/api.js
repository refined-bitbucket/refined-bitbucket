// @flow

import logger from './logger'
import { getRepoURL } from './page-detect'
import { getApiToken } from './utils'

type BitbucketAPIErrorResponse = {|
    type: string,
    error: {
        message: string,
        detail?: string,
        data?: any,
    },
|}

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
            username: string,
            display_name: string,
        },
    }>,
|}

// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/activity
export type PullRequestActivity = {|
    values: Array<
        | {|
              update: { author: { display_name: string } },
          |}
        | {|
              approval: { user: { display_name: string } },
          |}
        | {| comment: { user: { display_name: string } } |}
    >,
|}

const repoUrl = getRepoURL()
const token = getApiToken()

const api = {
    getBranches(): Promise<{| size: number |} | void> {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/refs/branches`
        return get(url)
    },
    getPullrequests(): Promise<{| size: number |} | void> {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests`
        return get(url)
    },
    getPullrequest(id: number | string): Promise<PullRequest | void> {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}`
        return get(url)
    },
    getPullrequestActivity(
        id: number | string
    ): Promise<PullRequestActivity | void> {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/activity?pagelen=1`
        return get(url)
    },
    getPullrequestCommits(
        id: number | string
    ): Promise<{| size: number |} | void> {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/commits`
        return get(url)
    },
}

// eslint-disable-next-line flowtype/no-weak-types
async function get<T: Object>(url: string): Promise<T | void> {
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })
    const result: BitbucketAPIErrorResponse | T = await response.json()

    if (result.error) {
        logger.error(
            `refined-bitbucket(augment-pr-entry): ${result.error.message}`
        )
        return
    }

    return result
}

export default api
