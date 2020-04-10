// @flow
// @jsx h

import elementReady from 'element-ready'
import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

export const filterStyle = {
    color: '#091E42',
    marginTop: '7px',
}

const classHide = '__refined_bitbucket_hide'

export const classFilter = id => `__refined_bitbucket_filter_${id}`

export const filterNames = {
    successfulBuilds: 'successfulBuilds',
    allTasksResolved: 'allTasksResolved',
    needsMyApproval: 'needsMyApproval',
}

const filtersHidingSelector = {
    successfulBuilds: 'span.aui-iconfont-error',
    allTasksResolved: 'div.list-stat span.aui-iconfont-editor-task',
    needsMyApproval: 'div.list-stat a.approval-link.approved',
    notMe: 'span.inline-user--name',
}

function isSavedFilterChecked(filterName) {
    return localStorage.getItem(classFilter(filterName)) === 'true'
}

function pullRequestRowWatcher() {
    return new SelectorObserver(
        document.body,
        '#pullrequests tr.iterable-item',
        () => {
            if (isSavedFilterChecked(filterNames.successfulBuilds)) {
                hide(
                    filtersHidingSelector.successfulBuilds,
                    filterNames.successfulBuilds
                )
            }
            if (isSavedFilterChecked(filterNames.allTasksResolved)) {
                hide(
                    filtersHidingSelector.allTasksResolved,
                    filterNames.allTasksResolved
                )
            }
            if (isSavedFilterChecked(filterNames.needsMyApproval)) {
                hide(
                    filtersHidingSelector.needsMyApproval,
                    filterNames.needsMyApproval,
                    true
                )
            }
        }
    )
}

async function newCheckbox(filterName, notMe) {
    const checked = isSavedFilterChecked(filterName)
    if (checked) {
        await elementReady('#pullrequests')
        hide(filtersHidingSelector[filterName], filterName, notMe)
        return (
            <input
                name={filterName}
                style={filterStyle}
                type="checkbox"
                checked
            />
        )
    }
    return <input name={filterName} style={filterStyle} type="checkbox" />
}

function getElementUuid(el, attr) {
    const user = JSON.parse(el.getAttribute(attr))
    return user ? user.uuid : ''
}

function performHide(el, filterName) {
    const row = el.closest('tr')
    if (!row) return

    row.classList.add(classFilter(filterName))
    row.classList.add(classHide)
    return row
}

function hide(querySelector, filterName, notMe = false) {
    if (notMe) {
        const me = getElementUuid(document.body, 'data-current-user')
        document
            .getElementById('pullrequests')
            .querySelectorAll(filtersHidingSelector.notMe)
            .forEach(el => {
                const uuidFound = getElementUuid(el, 'data-user')
                if (uuidFound !== me) return
                performHide(el, filterName)
            })
    }

    const els = document
        .getElementById('pullrequests')
        .querySelectorAll(querySelector)

    if (!els || els.length === 0) return

    els.forEach(el => performHide(el, filterName))
}

function show(filterName) {
    const els = document
        .getElementById('pullrequests')
        .querySelectorAll(`tr.${classFilter(filterName)}`)
    els.forEach(el => {
        el.classList.remove(classFilter(filterName))
        el.classList.remove(classHide)
        return el
    })
}

function save(filterName, checked) {
    localStorage.setItem([classFilter(filterName)], checked)
}

function onFilterSuccessfulBuilds(e) {
    save(filterNames.successfulBuilds, e.target.checked)
    return e.target.checked
        ? hide(
              filtersHidingSelector.successfulBuilds,
              filterNames.successfulBuilds
          )
        : show(filterNames.successfulBuilds)
}

function onFilterAllTasksResolved(e) {
    save(filterNames.allTasksResolved, e.target.checked)
    return e.target.checked
        ? hide(
              filtersHidingSelector.allTasksResolved,
              filterNames.allTasksResolved
          )
        : show(filterNames.allTasksResolved)
}

function onFilterNeedsMyApproval(e) {
    save(filterNames.needsMyApproval, e.target.checked)
    return e.target.checked
        ? hide(
              filtersHidingSelector.needsMyApproval,
              filterNames.needsMyApproval,
              true
          )
        : show(filterNames.needsMyApproval)
}

export default async function insertDashboardOverviewFilters() {
    const container = await elementReady(
        'div.filter-container ul.filter-status'
    )

    // Team filter bloc when teams active desactivates filter by row
    const form = document.getElementById('team-filter')
    // eslint-disable-next-line eqeqeq, no-eq-null
    if (form != null) form.remove()

    const filterSuccessfulBuilds = await newCheckbox(
        filterNames.successfulBuilds
    )
    filterSuccessfulBuilds.addEventListener('change', onFilterSuccessfulBuilds)

    const filterAllTasksResolved = await newCheckbox(
        filterNames.allTasksResolved
    )
    filterAllTasksResolved.addEventListener('change', onFilterAllTasksResolved)

    const filterNeedsMyApproval = await newCheckbox(filterNames.needsMyApproval)
    filterNeedsMyApproval.addEventListener('change', onFilterNeedsMyApproval)

    const filterSuccessfulBuildsWrapper = (
        <li>
            <label>
                {filterSuccessfulBuilds}
                Successful builds
            </label>
        </li>
    )

    const filterAllTasksResolvedWrapper = (
        <li>
            <label>
                {filterAllTasksResolved}
                All tasks resolved
            </label>
        </li>
    )

    const filterNeedsMyApprovalWrapper = (
        <li>
            <label>
                {filterNeedsMyApproval}
                Needs my approval
            </label>
        </li>
    )

    container.appendChild(filterSuccessfulBuildsWrapper)
    container.appendChild(filterAllTasksResolvedWrapper)
    container.appendChild(filterNeedsMyApprovalWrapper)

    pullRequestRowWatcher()
}
