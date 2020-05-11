// @flow
/* eslint-disable flowtype/no-types-missing-file-annotation */

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches

type Request = {
    token: string,
    repoUrl: string,
    name: $Values<typeof RequestTypes>,
}

type RequestById = Request & {
    id: number | string,
}

type RequestByTerm = Request & {
    term: string,
}

type BitbucketAPIErrorResponse = {|
    type: string,
    error: {
        message: string,
        detail?: string,
        data?: any,
    },
|}

export const RequestTypes = {
    getBranches: 'getBranches',
    getPullrequest: 'getPullrequest',
    getPullrequests: 'getPullrequests',
    getPullrequestActivity: 'getPullrequestActivity',
    getPullrequestCommits: 'getPullrequestCommits',
    getSearchedUsers: 'getSearchedUsers',
}

// eslint-disable-next-line flowtype/no-weak-types
async function get<T: Object>(
    url: string,
    token: string
): Promise<BitbucketAPIErrorResponse | T> {
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })
    const result: BitbucketAPIErrorResponse | T = await response.json()
    return result
}

function getUrl(request: Request | RequestById | RequestByTerm): string {
    const { repoUrl, name, id, term } = request
    switch (name) {
        case RequestTypes.getBranches:
            return `https://api.bitbucket.org/2.0/repositories/${repoUrl}/refs/branches`
        case RequestTypes.getPullrequests:
            return `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests`
        case RequestTypes.getPullrequest:
            return `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}`
        case RequestTypes.getPullrequestActivity:
            return `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/activity?pagelen=1`
        case RequestTypes.getPullrequestCommits:
            return `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/commits`
        case RequestTypes.getSearchedUsers:
            return `https://bitbucket.org/xhr/mentions/repositories/${repoUrl}?term=${term}`
        default:
            throw new Error(`Unhandled value: ${name}`)
    }
}

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
    (request: Request, sender, sendResponse) => {
        ;(async () => {
            try {
                const url = getUrl(request)
                const result = await get(url, request.token)
                sendResponse(result)
            } catch (error) {
                throw error
            }
        })()

        return true
    }
)
