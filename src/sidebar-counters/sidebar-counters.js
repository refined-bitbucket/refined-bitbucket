// @flow
// @jsx h

import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'

import './sidebar-counters.css'

export const addBadge = (
    a: HTMLAnchorElement,
    resources: {| size: number |} | void
) => {
    const navLinksContainer: HTMLElement = (a.parentNode: any)
    navLinksContainer.style.overflow = 'hidden'

    a.style.position = 'relative'

    const size =
        // eslint-disable-next-line eqeqeq, no-eq-null
        resources == null || resources.size == null
            ? '?'
            : resources.size > 999999
                ? '999999+'
                : resources.size

    const badge = (
        <span class="__rbb-badge">
            <span class="__rbb-badge-counter">{size}</span>
        </span>
    )
    a.insertBefore(badge, a.firstChild)
    return badge
}

export default async function addSideBarCounters() {
    // Exit early if can't find any of the nav links
    // that we are going to augment with badge counters
    const branchesLink: HTMLAnchorElement = await elementReady(
        'a[href$="branches/"]'
    )
    const pullRequestsLink: HTMLAnchorElement = await elementReady(
        'a[href$="pull-requests/"]'
    )

    if (!branchesLink || !pullRequestsLink) {
        return
    }

    const [branches, pullrequests] = await Promise.all([
        api.getBranches(),
        api.getPullrequests(),
    ])

    const branchesBadge = addBadge(branchesLink, branches)
    const prBadge = addBadge(pullRequestsLink, pullrequests)

    const resizeButton: HTMLButtonElement = await elementReady(
        '.ak-navigation-resize-button'
    )
    if (resizeButton) {
        resizeButton.addEventListener('click', () => {
            const isExpanded =
                resizeButton.getAttribute('aria-expanded') === 'true'
            branchesBadge.style.bottom = isExpanded ? '-1px' : 'unset'
            prBadge.style.bottom = isExpanded ? '-1px' : 'unset'
        })
    }
}
