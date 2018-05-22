import { h } from 'dom-chef'

function onClick() {
    const diff = this.closest('.bb-udiff')
    const { filename } = diff.dataset
    copy(filename)
}

function copy(text) {
    const node = document.createElement('span')
    node.textContent = text
    document.body.appendChild(node)

    const range = document.createRange()
    range.selectNodeContents(node)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')

    selection.removeAllRanges()

    node.remove()
}

export default function insertCopyFilename(diff) {
    const button = (
        <button
            type="button"
            class="aui-button aui-button-subtle copy-to-clipboard--button"
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

    const header = diff.querySelector('.filename')
    const lozenge = header.querySelector(':last-child')
    header.insertBefore(button, lozenge)
}
