// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import { findAllByText, findByText } from '@testing-library/dom'
import { getRepoURL } from '../page-detect'
import { getFirstFileContents, getMainBranchNew } from '../utils'
import api from '../api'

export default async function mergeCommitMessageNew(externalUrl: string) {
    const mergeCommitTemplateUrls = getMergeCommitMessageTemplateUrls()

    const prId = JSON.parse(document.body.dataset.initialState).repository
        .pullRequest.currentPullRequest.id

    const [template, dataToInject] = await Promise.all([
        getFirstFileContents(mergeCommitTemplateUrls, externalUrl),
        getDataToInject(prId),
    ])

    if (template && dataToInject) {
        await insertMergeCommitTemplate(template, dataToInject)
    }
}

function getMergeCommitMessageTemplateUrls() {
    const repoURL = getRepoURL()

    const mainBranch = getMainBranchNew()

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

    // eslint-disable-next-line eqeqeq, no-eq-null
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

async function insertMergeCommitTemplate(template, dataToInject) {
    const mergeSpans = await findAllByText(
        document.body,
        'Merge',
        {},
        {
            timeout: 10000,
        }
    )
    const mergeBtns = mergeSpans.map(span => span.closest('button'))

    const onFulfillPullrequest = async () => {
        const mergeDialogHeader = await findByText(
            document.body,
            'Merge pull request'
        )
        const textarea = mergeDialogHeader
            .closest('[role="dialog"]')
            .querySelector('textarea')
        const value = template
            .replace(/{id}/g, String(dataToInject.id))
            .replace(/{title}/g, dataToInject.title)
            .replace(/{description}/g, dataToInject.description)
            .replace(/{sourceBranch}/g, dataToInject.sourceBranch)
            .replace(/{targetBranch}/g, dataToInject.targetBranch)
            .replace(/{approvedByList}/g, dataToInject.approvedByList)

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
        ).set
        nativeInputValueSetter.call(textarea, value)
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
    }

    mergeBtns.forEach(b => b.addEventListener('click', onFulfillPullrequest))
}
