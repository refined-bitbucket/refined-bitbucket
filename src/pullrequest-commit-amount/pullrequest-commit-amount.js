import { h } from 'dom-chef'
import elementReady from 'element-ready'
import { getRepoURL } from '../page-detect'
import logger from '../logger'
import { getApiToken } from '../utils'

import './pullrequest-commit-amount.css'

const getCommitsAmount = async prId => {
    const repoUrl = getRepoURL()
    const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${prId}/commits`
    const token = getApiToken()
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })
    const commitsData = await response.json()

    if (commitsData.error) {
        logger.error(
            `refined-bitbucket(pullrequest-commit-amount): ${
                commitsData.error.message
            }`
        )
        return
    }

    return commitsData.size
}

export default async function pullrequestCommitAmount() {
    const prNode = await elementReady('#pullrequest')
    const prId = prNode.dataset.localId

    const commitsAmount = await getCommitsAmount(prId)

    if (!commitsAmount) {
        return prNode
    }

    const badge = <span class="__rbb-commit-ammount">{commitsAmount}</span>
    const commitsLink = document.getElementById('pr-menu-commits')
    commitsLink.appendChild(badge)

    return prNode
}
