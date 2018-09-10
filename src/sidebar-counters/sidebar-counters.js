// @flow
// @jsx h
import { h } from 'dom-chef'
import { getApiToken } from '../utils'
import api from '../api'

import './sidebar-counters.css'

export const addBadge = (
    a: HTMLAnchorElement,
    resources: {| size: number |} | void
) => {
    const div: HTMLElement = (a.parentNode: any)
    div.style.position = 'relative;'

    const size =
        resources == null || resources.size == null ? '?' : resources.size

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
    const navLinksSelector = 'a[href$="branches/"], a[href$="pull-requests/"]'
    const navLinks = document.querySelector(navLinksSelector)
    if (!navLinks) {
        return
    }

    // Keep going
    const [branches, pullrequests] = await Promise.all([
        api.getBranches(),
        api.getPullrequests(),
    ])

    const navigation: HTMLElement = (document.getElementById(
        'adg3-navigation'
    ): any)

    let branchesBadge = { remove: () => {} }
    let prBadge = { remove: () => {} }
    // $FlowIgnore
    navigation.observeSelector(navLinksSelector, function() {
        if (this.href.endsWith('branches/')) {
            branchesBadge.remove()
            branchesBadge = addBadge(this, branches)
        } else if (this.href.endsWith('pull-requests/')) {
            prBadge.remove()
            prBadge = addBadge(this, pullrequests)
        }
    })
}
