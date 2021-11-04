/* eslint-disable flowtype/no-types-missing-file-annotation */

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches

type Request = { token: string, repoUrl: string } & (
    | {
          name: 'getRepo',
      }
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
    | {
          name: 'getPullrequestFiles',
          id: number | string,
      }
)

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
    (request: Request, sender, sendResponse) => {
        ;(async () => {
            const { repoUrl, token } = request

            let url
            if (request.name === 'getRepo') {
                url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}`
            } else if (request.name === 'getBranches') {
                url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/refs/branches`
            } else if (request.name === 'getPullrequests') {
                url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests`
            } else if (request.name === 'getPullrequest') {
                const { id } = request
                url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}`
            } else if (request.name === 'getPullrequestActivity') {
                const { id } = request
                url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/activity?pagelen=50`
            } else if (request.name === 'getPullrequestCommits') {
                const { id } = request
                url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/commits`
            } else if (request.name === 'getPullrequestFiles') {
                const { id, hash1, hash2 } = request
                url = `https://bitbucket.org/!api/2.0/repositories/${repoUrl}/diffstat/${repoUrl}:${hash1}%0D${hash2}?from_pullrequest_id=${id}&pagelen=1000`
            } else {
                exhaustiveCheck(request.name)
            }

            const result = await get(url, token)

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
    try {
        const result: BitbucketAPIErrorResponse | T = await response.json()
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}

function exhaustiveCheck(value: empty) {
    throw new Error(`Unhandled value: ${value}`)
}
