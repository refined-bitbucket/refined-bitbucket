// @flow
// @jsx h

import { h } from 'dom-chef'

import './insert-copy-filename.css'

function onClick() {
    const diff: HTMLElement = ((this: HTMLButtonElement).closest(
        '.bb-udiff'
    ): any)
    const { filename } = diff.dataset
    copy(filename)
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

export default function insertCopyFilename(diff: HTMLElement) {
    const button = (
        <button
            type="button"
            class="aui-button aui-button-subtle copy-to-clipboard--button __rbb-btn-copyfilename"
            title="Copy filename to clipboard"
            original-title="Copy filename to clipboard"
            style={{ position: 'relative' }}
            onClick={onClick}
        >
            <span class="aui-icon aui-icon-small aui-iconfont-copy-clipboard">
                Copy filename to clipboard
            </span>
        </button>
    )

    const header: HTMLElement = (diff.querySelector('.filename'): any)
    const lozenge: HTMLElement = (header.querySelector('h1 > :last-child'): any)
    header.insertBefore(button, lozenge)
}
