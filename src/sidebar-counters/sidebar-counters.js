// @flow
// @jsx h

import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'
import SelectorObserver from 'selector-observer'

import './sidebar-counters.css'

const HREF_BRANCHES = 'branches'
const HREF_PULL_REQUESTS = 'pull-requests'
export const menus = [HREF_BRANCHES, HREF_PULL_REQUESTS]

const MAX_COUNTER = 99

export let menusCounters = {
    HREF_BRANCHES: null,
    HREF_PULL_REQUESTS: null,
}

type ResultSize = $Exact<{ size: number }>

export function getBadge(size: number): HTMLElement {
    const maxReached = size > MAX_COUNTER
    return (
        <span class="__rbb-badge">
            <span class={`__rbb-badge-counter${maxReached ? ' -max' : ''}`}>
                {typeof size !== 'number' ? '!' : Math.min(size, MAX_COUNTER)}
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
    const wantedMenuFromHref = hrefParts.find(x => menus.includes(x))

    // Exit early if can't find one of the nav links
    // that we are going to augment with badge counters
    if (!wantedMenuFromHref) return

    const size = menusCounters[wantedMenuFromHref]
    const badge = getBadge(size)

    menu.style.overflow = 'hidden'
    link.style.position = 'relative'
    link.insertBefore(badge, link.firstChild)
}

export default async function addSideBarCounters() {
    menus.forEach(async menu => {
        const resources = await getCounterInfo(menu)
        const { size: currentSize } = resources || {}
        menusCounters[menu] = currentSize
    })
    const contentNavigationSelector =
        'div[data-testid="Content"] div[role="presentation"]'
    const contextualNavigationSelector =
        'div[data-testid="ContextualNavigation"] div[role="presentation"]'
    new SelectorObserver(
        document.body,
        [contentNavigationSelector, contextualNavigationSelector].join(', '),
        function() {
            addCounterToMenuItem(this, menusCounters)
        }
    )
}
