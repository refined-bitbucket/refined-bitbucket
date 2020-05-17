// @flow
// @jsx h

import { h } from 'dom-chef'

function onClick(e) {
    e.stopPropagation()
    const { filepath } = this.dataset
    copy(filepath)
}

function copy(text) {
    const node = document.createElement('span')
    node.textContent = text
    ;((document.body: any): HTMLBodyElement).appendChild(node)

    const range = document.createRange()
    range.selectNodeContents(node)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')

    selection.removeAllRanges()

    node.remove()
}

export default function insertCopyFilenameNew(diff: HTMLElement) {
    const header: HTMLHeadingElement = (diff.querySelector(
        "[data-qa='bk-filepath']"
    ): any)
    const filepath = header.textContent
    const headerContainer: HTMLDivElement = (header.parentElement: any)

    const button = (
        <button
            type="button"
            title="Copy filename to clipboard"
            original-title="Copy filename to clipboard"
            style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
            }}
            data-filepath={filepath}
            onClick={onClick}
        >
            <span class="aui-icon aui-icon-small aui-iconfont-copy-clipboard">
                Copy filename to clipboard
            </span>
        </button>
    )

    headerContainer.appendChild(button)
}
