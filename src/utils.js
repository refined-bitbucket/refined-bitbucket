// @flow
import onetime from 'onetime'

export const getApiToken: () => string = onetime(() => {
    let meta = document.querySelector('meta[name="apitoken"]')
    meta = ((meta: any): HTMLMetaElement)
    const apiTokenContent = meta.content
    const parsedApiTokenContent = JSON.parse(apiTokenContent)
    return parsedApiTokenContent.token
})

export const getMainBranch: () => string = onetime(
    () => JSON.parse((document.body || {}).dataset.currentRepo).mainbranch.name
)

export function getFirstFileContents(
    localUrls: string[],
    externalUrl: string
): Promise<string | void> {
    const requests = localUrls.map(url =>
        fetch(url, { credentials: 'include' })
    )

    if (externalUrl) {
        requests.push(fetch(externalUrl))
    }

    return getFirstSuccessfulResponseText(requests)
}

export async function getFirstSuccessfulResponseText(
    requests: Promise<Response>[]
): Promise<string | void> {
    const responses: Array<
        | Response
        | {
              ok: false,
              error: any,
          }
    > = await Promise.all(
        requests.map(p => p.catch(error => ({ ok: false, error })))
    )
    const firstSuccessfulResponse = responses.find(response => response.ok)

    if (firstSuccessfulResponse && firstSuccessfulResponse.ok) {
        return firstSuccessfulResponse.text()
    }
}
