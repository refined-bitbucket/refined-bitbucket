import onetime from 'onetime'

export const getApiToken = onetime(() => {
    const apiTokenContent = document.querySelector('meta[name="apitoken"]')
        .content
    const parsedApiTokenContent = JSON.parse(apiTokenContent)
    return parsedApiTokenContent.token
})

export const getMainBranch = onetime(
    () => JSON.parse(document.body.dataset.currentRepo).mainbranch.name
)

export function getFirstFileContents(localUrls, externalUrl) {
    const requests = localUrls.map(url =>
        fetch(url, { credentials: 'include' })
    )

    if (externalUrl) {
        requests.push(fetch(externalUrl))
    }

    return getFirstSuccessfulResponseText(requests)
}

export async function getFirstSuccessfulResponseText(
    requests /* : Promise[] */
) /* : Promise<string> | void */ {
    const responses = await Promise.all(
        requests.map(p => p.catch(error => ({ ok: false, error })))
    )
    const firstSuccessfulResponse = responses.find(response => response.ok)

    if (firstSuccessfulResponse) {
        return firstSuccessfulResponse.text()
    }
}
