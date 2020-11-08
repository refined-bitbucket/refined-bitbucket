// eslint-disable-next-line import/no-extraneous-dependencies
import { findAllByText } from '@testing-library/dom'
import elementReady from 'element-ready'
import { getRepoURL, getPullRequestId } from '../page-detect'
import { getFirstFileContents, setInitialStateInBodyEl } from '../utils'
import api from '../api'

export default async function mergeCommitMessageNew(externalUrl) {
    const mergeCommitTemplateUrls = await getMergeCommitMessageTemplateUrls()

    setInitialStateInBodyEl()

    const prId = getPullRequestId()

    const [template, dataToInject] = await Promise.all([
        getFirstFileContents(mergeCommitTemplateUrls, externalUrl),
        getDataToInject(prId),
    ])

    if (template && dataToInject) {
        await insertMergeCommitTemplate(template, dataToInject)
    }
}

async function getMergeCommitMessageTemplateUrls() {
    const repoURL = getRepoURL()

    const mainBranch = await getMainBranch()

    const mergeCommitTemplateUrls = [
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/docs/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/.github/MERGE_COMMIT_TEMPLATE`,
        `https://bitbucket.org/${repoURL}/raw/${mainBranch}/.bitbucket/MERGE_COMMIT_TEMPLATE`,
    ]

    return mergeCommitTemplateUrls
}

async function getMainBranch() {
    const repo = await api.getRepo()
    return repo.mainbranch.name
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
                    p.user.nickname
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
            timeout: 90000,
        }
    )
    const mergeBtns = mergeSpans.map(span => span.closest('button'))

    const onFulfillPullrequest = async () => {
        const dialog = await elementReady('[role="dialog"]')
        if (dialog) {
            const textarea = dialog.querySelector('textarea')
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
    }

    mergeBtns.forEach(b => b.addEventListener('click', onFulfillPullrequest))
}
