// @flow

import { h } from 'dom-chef'
import onetime from 'onetime'

export const getApiToken: () => string = onetime(
    (): string => {
        const meta: HTMLMetaElement = (document.querySelector(
            'meta[name="apitoken"]'
        ): any)
        const apiTokenContent = meta.content
        const parsedApiTokenContent = JSON.parse(apiTokenContent)
        return parsedApiTokenContent.token
    }
)

export const getMainBranch: () => string = onetime(
    (): string =>
        JSON.parse((document.body || {}).dataset.currentRepo).mainbranch.name
)

export const getMainBranchNew: () => string = onetime(
    (): string => {
        const code = () => {
            document.body.setAttribute(
                'data-initial-state',
                JSON.stringify(window.__initial_state__)
            )
        }

        document.body.appendChild(
            <script>
                ({code.toString()}
                )()
            </script>
        )

        const mbn = JSON.parse(document.body.dataset.initialState).section
            .repository.currentRepository.mainbranch.name
        return mbn
    }
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
