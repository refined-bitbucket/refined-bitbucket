// @flow

import elementReady from 'element-ready'
import marked from 'marked'
import { getRepoURL } from '../page-detect'
import { getFirstFileContents, getMainBranch } from '../utils'

export default async function fetchAndInsertPullrequestTemplate(
    externalUrl: string,
    prTemplateCommits: boolean
) {
    const pullrequestTemplateUrls = getPullrequestTemplateUrls()

    const template = await getFirstFileContents(
        pullrequestTemplateUrls,
        externalUrl
    )

    if (template) {
        insertPullrequestTemplate(template, prTemplateCommits)
    }
}

export function getPullrequestTemplateUrls() {
    const repoURL = getRepoURL()

    const mainBranch = getMainBranch()

    const pullrequestTemplateUrls = [
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/PULL_REQUEST_TEMPLATE.md`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/docs/PULL_REQUEST_TEMPLATE.md`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/.github/PULL_REQUEST_TEMPLATE.md`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/.bitbucket/PULL_REQUEST_TEMPLATE.md`,
    ]

    return pullrequestTemplateUrls
}

export async function insertPullrequestTemplate(
    template: string,
    prTemplateCommits: boolean
) {
    const defaultEditor = elementReady('textarea[id="id_description"]')
    const atlassianEditor = elementReady(
        '#ak_editor_description div[contenteditable="true"]'
    )
    const editorPromises = [defaultEditor, atlassianEditor]
    const editor = await Promise.race(editorPromises)
    // $FlowIgnore Resolve when `element-ready` libdefs have `p-cancelable` libdefs
    editorPromises.forEach(p => requestAnimationFrame(() => p.cancel()))

    if (editor instanceof HTMLTextAreaElement) {
        if (prTemplateCommits) {
            editor.value = template + editor.value
        } else {
            editor.value = template
        }
    } else if (editor instanceof HTMLDivElement) {
        let html = marked(template)
        if (prTemplateCommits) {
            html += editor.innerHTML
        }
        editor.innerHTML = html
    } else {
        console.warn(
            'refined-bitbucket(pullrequest-template): Could not find pull request editor.'
        )
    }
}
