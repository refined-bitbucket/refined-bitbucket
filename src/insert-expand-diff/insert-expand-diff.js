// @flow
// @jsx h

import { h } from 'dom-chef'

const onClick = (diff: HTMLElement) => {
    const expandElipses = diff.querySelectorAll('.ellipsis')

    if (!expandElipses) return

    expandElipses.forEach(expander => expander.click())
}

export default function insertExpandDiff(diff: HTMLElement) {
    const button = (
        <button
            type="button"
            class="aui-button aui-button-subtle devtools-task-in-progress--button __rbb-btn-expandDiff"
            title="Expand unexpanded diff sections once"
            original-title="Expand unexpanded diff sections once"
            style={{ position: 'relative' }}
            onclick={() => onClick(diff)}
        >
            <span class="aui-icon aui-icon-small aui-iconfont-devtools-task-in-progress">
                Load all diff sections, once
            </span>
        </button>
    )

    const header: ?HTMLElement = diff.querySelector('.filename')

    if (!header) return

    const lozenge: ?HTMLElement = header.querySelector('h1 > :last-child')

    if (!lozenge) return

    header.insertBefore(button, lozenge)
}
