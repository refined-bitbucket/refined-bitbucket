// @flow
// @jsx h

import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

const _ellipsesSelector = '.ellipsis'

function queryForExpandButtons(diff) {
    return diff.querySelectorAll(_ellipsesSelector)
}

function conditionallyDisableButton(diff, button) {
    const newExpandEllipses = queryForExpandButtons(diff)

    if (!newExpandEllipses || !newExpandEllipses.length) button.disabled = true
}

function onClick(diff: HTMLElement) {
    const expandEllipses = queryForExpandButtons(diff)

    if (!expandEllipses) return

    expandEllipses.forEach(expander => expander.click())
}

export default function insertExpandDiff(diff: HTMLElement) {
    const expandEllipses = queryForExpandButtons(diff)

    const button = (
        <button
            type="button"
            class="aui-button aui-button-subtle devtools-task-in-progress--button __rbb-btn-expandDiff"
            title="Expand unexpanded diff sections once"
            original-title="Expand unexpanded diff sections once"
            style={{ position: 'relative' }}
            onclick={e => onClick(diff)}
        >
            <span class="aui-icon aui-icon-small aui-iconfont-devtools-task-in-progress">
                Load all diff sections, once
            </span>
        </button>
    )

    conditionallyDisableButton(diff, button)

    const header: ?HTMLElement = diff.querySelector('.filename')

    if (!header) return

    const lozenge: ?HTMLElement = header.querySelector('h1 > :last-child')

    if (!lozenge) return

    header.insertBefore(button, lozenge)

    new SelectorObserver(diff, _ellipsesSelector, null, function() {
        conditionallyDisableButton(diff, button)
    })
}
