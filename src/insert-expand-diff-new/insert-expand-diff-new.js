// @flow
// @jsx h

import { h } from 'dom-chef'

function onClick(e, diff) {
    e.stopPropagation()

    const expandElipses = diff.querySelectorAll('button.show-more-lines-button')

    if (!expandElipses) return

    expandElipses.forEach(expander => expander.click())
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

    const header: ?HTMLElement = diff.querySelector("[data-qa='bk-filepath']")

    if (!header) return

    // $FlowIgnore If we found the header on the DOM, it will have a parent element.
    const headerContainer: HTMLDivElement = header.parentElement

    headerContainer.appendChild(button)
}
