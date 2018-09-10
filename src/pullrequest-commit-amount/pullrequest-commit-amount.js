// @flow
// @jsx h
import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'

import './pullrequest-commit-amount.css'

export default async function pullrequestCommitAmount() {
    const prNode = await elementReady('#pullrequest')
    const prId = prNode.dataset.localId

    const pullrequestCommits = await api.getPullrequestCommits(prId)

    if (pullrequestCommits && pullrequestCommits.size != null) {
        const badge = (
            <span class="__rbb-commit-ammount">{pullrequestCommits.size}</span>
        )
        const commitsLink: HTMLElement = (document.getElementById(
            'pr-menu-commits'
        ): any)
        commitsLink.appendChild(badge)
    }

    return prNode
}
