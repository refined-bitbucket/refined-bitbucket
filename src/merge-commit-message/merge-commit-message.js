import elementReady from 'element-ready'
import { getRepoURL } from '../page-detect'
import getApiToken from '../get-api-token'
import logger from '../logger'

async function getPrData(prId) {
    const repoUrl = getRepoURL()
    const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${prId}`
    const token = getApiToken()
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })

    const result = await response.json()

    if (result.error) {
        logger.error(
            `refined-bitbucket(augment-pr-entry): ${result.error.message}`
        )
        return
    }

    return {
        id: result.id,
        title: result.title,
        description: result.description,
        sourceBranch: result.source.branch.name,
        targetBranch: result.destination.branch.name,
        approvedByList: result.participants
            .filter(p => p.approved)
            .map(p => {
                return `Approved By: ${p.user.display_name} <${
                    p.user.username
                }>`
            })
            .join('\n'),
    }
}

export default async function mergeCommitMessage(externalUrl) {
    const mergeCommitTemplateUrls = getMergeCommitMessageTemplateUrls()
    const requests = mergeCommitTemplateUrls.map(url =>
        fetch(url, { credentials: 'include' })
    )

    if (externalUrl) {
        requests.push(fetch(externalUrl))
    }

    const template = await getMergeCommitTemplate(requests)

    insertMergeCommitTemplate(template)
}

function getMergeCommitMessageTemplateUrls() {
    const repoURL = getRepoURL()

    // TODO get this properly
    const defaultBranch = 'master'

    const mergeCommitTemplateUrls = [
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/docs/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/.github/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/.bitbucket/MERGE_COMMIT_TEMPLATE`,
    ]

    return mergeCommitTemplateUrls
}

async function getMergeCommitTemplate(requests) {
    const responses = await Promise.all(
        requests.map(p => p.catch(err => ({ ok: false, err })))
    )
    const firstSuccessfulResponse = responses.find(response => response.ok)
    if (!firstSuccessfulResponse) {
        return
    }

    const template = await firstSuccessfulResponse.text()

    return template
}

async function insertMergeCommitTemplate(template) {
    const prNode = await elementReady('#pullrequest')
    const prId = prNode.dataset.localId

    const data = await getPrData(prId)

    if (!data) {
        return
    }

    const fulfillPr = document.getElementById('fulfill-pullrequest')
    const onFulfillPullrequest = async () => {
        fulfillPr.removeEventListener('click', onFulfillPullrequest)
        const textarea = await elementReady('#id_commit_message')
        textarea.value = template
            .replace(/{id}/g, data.id)
            .replace(/{title}/g, data.title)
            .replace(/{description}/g, data.description)
            .replace(/{sourceBranch}/g, data.sourceBranch)
            .replace(/{targetBranch}/g, data.targetBranch)
            .replace(/{approvedByList}/g, data.approvedByList)
    }
    fulfillPr.addEventListener('click', onFulfillPullrequest)
}
