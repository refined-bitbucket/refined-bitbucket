// @flow
// @jsx h

import { h } from 'dom-chef'
import onetime from 'onetime'
import { IUser, mapUserXhrToUser } from './_core/models'

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

export const getCurrentUser: () => IUser = onetime(
    (): IUser => {
        const data = document.body.dataset.currentUser
        if (!data) return null
        return mapUserXhrToUser(JSON.parse(data))
    }
)

export const getCurrentPullRequestAuthorAccountId: () => string = onetime(
    (): string => {
        const data = document.body.dataset.currentPr
        if (!data) return ''
        var pullRequest = JSON.parse(data)
        return (pullRequest.author && pullRequest.author['mention_id']) || ''
    }
)

export const getCurrentUserAccountId: () => string = onetime(
    (): string => getCurrentUser().account_id
)

export const getMainBranch: () => string = onetime(
    (): string => {
        const data = document.body.dataset.currentRepo
        if (!data) return
        const json = Object.assign({ mainbranch: {} }, JSON.parse(data))
        return json.mainbranch.name
    }
)

export const getMainBranchNew: () => string = onetime(
    (): string => {
        setInitialStateInBodyEl()
        // $FlowIgnore There's always going to be a body
        const data = document.body.dataset.initialState
        if (!data) return
        const json = Object.assign(
            { section: { repository: { currentRepository: { mainbranch: {} } } } }, // prettier-ignore
            JSON.parse(data)
        )
        return json.section.repository.currentRepository.mainbranch.name
    }
)

export const setInitialStateInBodyEl: () => void = onetime(() => {
    const code = () => {
        // $FlowIgnore There's always going to be a body
        document.body.setAttribute(
            'data-initial-state',
            JSON.stringify(window.__initial_state__)
        )
    }

    // $FlowIgnore There's always going to be a body
    document.body.appendChild(
        <script>
            ({code.toString()}
            )()
        </script>
    )
})

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
