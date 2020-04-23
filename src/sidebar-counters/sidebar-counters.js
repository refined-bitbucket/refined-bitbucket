// @flow
// @jsx h

import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'
import SelectorObserver from 'selector-observer'

import './sidebar-counters.css'

const HREF_BRANCHES = 'branches'
const HREF_PULL_REQUESTS = 'pull-requests'

type ResultSize = $Exact<{ size: number }>

export function getBadge(resources: ResultSize | void): HTMLElement {
    const size = resources ? resources.size : undefined
    return (
        <span class="__rbb-badge">
            <span class="__rbb-badge-counter">
                {typeof size !== 'number' ? '!' : size > 99 ? '+99' : size}
            </span>
        </span>
    )
}

async function getCounterInfo(wantedMenuFromHref: string): Promise {
    switch (wantedMenuFromHref) {
        case HREF_BRANCHES:
            return api.getBranches()
        case HREF_PULL_REQUESTS:
            return api.getPullrequests()
        default:
            return
    }
}

export async function addCounterToMenuItem(menu: HTMLElement) {
    const link: HTMLAnchorElement = menu.querySelector('a')

    if (!link) return

    const hrefParts = link.getAttribute('href').split('/')
    const wantedMenuFromHref = hrefParts.find(x =>
        [HREF_BRANCHES, HREF_PULL_REQUESTS].includes(x)
    )

    // Exit early if can't find one of the nav links
    // that we are going to augment with badge counters
    if (!wantedMenuFromHref) return

    const resources: ResultSize | void = await getCounterInfo(
        wantedMenuFromHref
    )

    const badge = getBadge(resources)

    menu.style.overflow = 'hidden'
    link.style.position = 'relative'
    link.insertBefore(badge, link.firstChild)
}

export default async function addSideBarCounters() {
    const contentNavigationSelector =
        'div[data-testid="Content"] div[role="presentation"]'
    const contextualNavigationSelector =
        'div[data-testid="ContextualNavigation"] div[role="presentation"]'
    new SelectorObserver(
        document.body,
        [contentNavigationSelector, contextualNavigationSelector].join(', '),
        function() {
            addCounterToMenuItem(this)
        }
    )
}
