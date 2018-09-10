// @flow
import elementReady from 'element-ready'
import { getRepoURL } from '../page-detect'
import { getFirstFileContents, getMainBranch } from '../utils'
import api from '../api'

export default async function mergeCommitMessage(externalUrl: string) {
    const mergeCommitTemplateUrls = getMergeCommitMessageTemplateUrls()

    const prNode = await elementReady('#pullrequest')
    const prId = prNode.dataset.localId

    const [template, dataToInject] = await Promise.all([
        getFirstFileContents(mergeCommitTemplateUrls, externalUrl),
        getDataToInject(prId),
    ])

    if (template && dataToInject) {
        insertMergeCommitTemplate(template, dataToInject)
    }
}

function getMergeCommitMessageTemplateUrls() {
    const repoURL = getRepoURL()

    const mainBranch = getMainBranch()

    const mergeCommitTemplateUrls = [
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/docs/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/.github/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/.bitbucket/MERGE_COMMIT_TEMPLATE`,
    ]

    return mergeCommitTemplateUrls
}

async function getDataToInject(prId) {
    const pullrequest = await api.getPullrequest(prId)

    if (pullrequest == null) {
        return
    }

    return {
        id: pullrequest.id,
        title: pullrequest.title,
        description: pullrequest.description,
        sourceBranch: pullrequest.source.branch.name,
        targetBranch: pullrequest.destination.branch.name,
        approvedByList: pullrequest.participants
            .filter(p => p.approved)
            .map(p => {
                return `Approved By: ${p.user.display_name} <${
                    p.user.username
                }>`
            })
            .join('\n'),
    }
}

function insertMergeCommitTemplate(template, dataToInject) {
    const fulfillPr: HTMLElement = (document.getElementById(
        'fulfill-pullrequest'
    ): any)

    const onFulfillPullrequest = async () => {
        fulfillPr.removeEventListener('click', onFulfillPullrequest)

        const textarea: HTMLTextAreaElement = (await elementReady(
            '#id_commit_message'
        ): any)
        textarea.value = template
            .replace(/{id}/g, dataToInject.id + '')
            .replace(/{title}/g, dataToInject.title)
            .replace(/{description}/g, dataToInject.description)
            .replace(/{sourceBranch}/g, dataToInject.sourceBranch)
            .replace(/{targetBranch}/g, dataToInject.targetBranch)
            .replace(/{approvedByList}/g, dataToInject.approvedByList)
    }

    fulfillPr.addEventListener('click', onFulfillPullrequest)
}
