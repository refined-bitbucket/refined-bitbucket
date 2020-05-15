// @flow
// @jsx h

import { h } from 'dom-chef'
import elementReady from 'element-ready'
import api from '../api'
import SelectorObserver from 'selector-observer'

import './sidebar-counters.css'

export const HREF_BRANCHES = 'branches'
export const HREF_PULL_REQUESTS = 'pull-requests'
export const menus = [HREF_BRANCHES, HREF_PULL_REQUESTS]

const MAX_COUNTER = 99

type MenuCounter = $Exact<{
    [HREF_BRANCHES]: number,
    [HREF_PULL_REQUESTS]: number,
}>

export function getBadge(size: number): HTMLElement {
    const maxReached = size > MAX_COUNTER
    const isNumber = typeof size === 'number'

    return (
        <span class="__rbb-badge" title={isNumber ? size : ''}>
            <span
                class={
                    maxReached
                        ? '__rbb-badge-counter -max'
                        : '__rbb-badge-counter'
                }
            >
                {isNumber ? Math.min(size, MAX_COUNTER) : '!'}
            </span>
        </span>
    )
}

export async function addCounterToMenuItem(
    menu: HTMLElement,
    menusCounters: MenuCounter
) {
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
    const [branches, pullrequests] = await Promise.all([
        api.getBranches(),
        api.getPullrequests(),
    ])

    const branchesCount = (branches || {}).size
    const pullRequestsCount = (pullrequests || {}).size

    const menusCounters: MenuCounter = {
        [HREF_BRANCHES]: branchesCount,
        [HREF_PULL_REQUESTS]: pullRequestsCount,
    }

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
