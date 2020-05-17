/* eslint-disable flowtype/no-types-missing-file-annotation */

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches

type Request = { token: string, repoUrl: string } & (
    | {
          name: 'getBranches',
      }
    | {
          name: 'getPullrequests',
      }
    | {
          name: 'getPullrequest',
          id: number | string,
      }
    | {
          name: 'getPullrequestActivity',
          id: number | string,
      }
    | {
          name: 'getPullrequestCommits',
          id: number | string,
      }
)

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
    (request: Request, sender, sendResponse) => {
        ;(async () => {
            const { repoUrl, token } = request

            let resultPromise
            if (request.name === 'getBranches') {
                const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/refs/branches`
                resultPromise = get(url, token)
            } else if (request.name === 'getPullrequests') {
                const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests`
                resultPromise = get(url, token)
            } else if (request.name === 'getPullrequest') {
                const { id } = request
                const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}`
                resultPromise = get(url, token)
            } else if (request.name === 'getPullrequestActivity') {
                const { id } = request
                const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/activity?pagelen=1`
                resultPromise = get(url, token)
            } else if (request.name === 'getPullrequestCommits') {
                const { id } = request
                const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/commits`
                resultPromise = get(url, token)
            } else {
                exhaustiveCheck(request.name)
            }

            const result = await resultPromise

            sendResponse(result)
        })()

        return true
    }
)

type BitbucketAPIErrorResponse = {|
    type: string,
    error: {
        message: string,
        detail?: string,
        data?: any,
    },
|}

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

function exhaustiveCheck(value: empty) {
    throw new Error(`Unhandled value: ${value}`)
}
