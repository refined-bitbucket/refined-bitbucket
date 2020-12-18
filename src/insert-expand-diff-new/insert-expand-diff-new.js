// @flow
// @jsx h

import { h } from 'dom-chef'
import SelectorObserver from 'selector-observer'

const _ellipsesSelector = 'button.show-more-lines-button'

function queryForExpandButtons(diff) {
    return diff.querySelectorAll(_ellipsesSelector)
}

function conditionallyDisableButton(diff, button) {
    const newExpandEllipses = queryForExpandButtons(diff)

    if (!newExpandEllipses || !newExpandEllipses.length) button.disabled = true
}

function onClick(e, diff: HTMLElement) {
    e.stopPropagation()

    const expandEllipses = queryForExpandButtons(diff)

    if (!expandEllipses) return

    expandEllipses.forEach(expander => expander.click())
}

export default function insertExpandDiffNew(diff: HTMLElement) {
    const button = (
        <button
            type="button"
            class="aui-button aui-button-subtle devtools-task-in-progress--button __rbb-btn-expandDiff"
            title="Expand unexpanded diff sections once"
            original-title="Expand unexpanded diff sections once"
            style={{
                position: 'relative',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
            }}
            onclick={e => onClick(e, diff)}
        >
            <span class="aui-icon aui-icon-small aui-iconfont-devtools-task-in-progress">
                Load all diff sections, once
            </span>
        </button>
    )

    conditionallyDisableButton(diff, button)

    const header: ?HTMLElement = diff.querySelector("[data-qa='bk-filepath']")

    if (!header) return

    // $FlowIgnore If we found the header on the DOM, it will have a parent element.
    const headerContainer: HTMLDivElement = header.parentElement

    headerContainer.appendChild(button)

    new SelectorObserver(diff, _ellipsesSelector, null, function() {
        conditionallyDisableButton(diff, button)
    })
}
