import { h } from 'dom-chef'

import getApiToken from '../get-api-token'
import logger from '../logger'
import { getRepoURL } from '../page-detect'

import './sidebar-counters.css'

const baseApiUrl = 'https://api.bitbucket.org/2.0/repositories'

export const getResourcesCount = async url => {
    const token = getApiToken()
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })

    const resources = await response.json()
    if (resources.error) {
        logger.error(
            `refined-bitbucket(sidebar-counters): ${resources.error.message}`
        )
        return '?'
    }

    return resources.size
}

export const getPrCount = repoUrl =>
    getResourcesCount(`${baseApiUrl}/${repoUrl}/pullrequests`)

export const getBranchesCount = repoUrl =>
    getResourcesCount(`${baseApiUrl}/${repoUrl}/refs/branches`)

export const addBadge = (a, resourcesCount) => {
    const div = a.parentNode
    div.style = 'position: relative;'

    const badge = (
        <span class="__rbb-badge">
            <span class="__rbb-badge-counter">{resourcesCount}</span>
        </span>
    )
    a.insertBefore(badge, a.firstChild)
    return badge
}

export default async function addSideBarCounters() {
    // Exit early if can't find any of the nav links
    // that we are going to augment with badge counters
    const navLinksSelector = 'a[href$="branches/"], a[href$="pull-requests/"]'
    const navLinks = document.querySelector(navLinksSelector)
    if (!navLinks) {
        return
    }

    // Keep going
    const repoUrl = getRepoURL()
    const branchesCount = await getBranchesCount(repoUrl)
    const pullrequestsCount = await getPrCount(repoUrl)

    const navigation = document.getElementById('adg3-navigation')

    let branchesBadge = { remove: () => {} }
    let prBadge = { remove: () => {} }
    navigation.observeSelector(navLinksSelector, function() {
        if (this.href.endsWith('branches/')) {
            branchesBadge.remove()
            branchesBadge = addBadge(this, branchesCount)
        } else if (this.href.endsWith('pull-requests/')) {
            prBadge.remove()
            prBadge = addBadge(this, pullrequestsCount)
        }
    })
}
