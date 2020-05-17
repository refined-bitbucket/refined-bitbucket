'use strict'

import 'jquery-highlight'

import './occurrences-highlighter.css'

export default function occurrencesHighlighter(diff) {
    const diffContentContainer = diff.querySelector('.diff-content-container')

    $(diffContentContainer).dblclick(function() {
        highlightOccurrences(this)
    })
}

export function highlightOccurrences(container) {
    // <pre> for lines of code
    // <div class="comment-content"> for comments
    // <span class="description"> for tasks
    const code = $(
        container.querySelectorAll('pre, div.comment-content, span.description')
    )
    const selection = getSelectedText()
    const selectionIsInTextArea =
        selection.anchorNode.getElementsByTagName &&
        selection.anchorNode.getElementsByTagName('textarea').length
    const text = selection.toString()

    // If selected text is all whitespace, don't highlight anything
    if (!/\S/.test(text)) {
        code.unhighlight()
        return
    }
    // If selected text is already highlighted, don't highlight anything
    if (
        selection.anchorNode.parentElement.classList.contains(
            '__refined_bitbucket_highlight'
        )
    ) {
        return
    }

    // When the user selects a word inside a textarea, the selected text is not actually present in the DOM.
    // In that case the selection is not highlighted and our reselection logic will actually deselect the text.
    if (selectionIsInTextArea) {
        highlightOcurrences(code, text)
    } else {
        const selectedNode = getSelectionAsNode(selection)
        const span = wrapInSpan(
            selectedNode,
            '__refined_bitbucket_selection_temporary_id'
        )
        highlightOcurrences(code, text)
        const children = unwrapChildren(span)
        const highlightedNode = getHighlightedNode(children)
        if (highlightedNode) {
            selectElementContents(highlightedNode)
        }
    }
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection()
    }
    if (document.getSelection) {
        return document.getSelection()
    }
    if (document.selection) {
        return document.selection.createRange().text
    }
    return ''
}

/**
 * Removes all previous highlights and then highlights the string `text`
 * (trimmed and untrimmed) in the `code` array of nodes
 * @param {HTMLElement[]} code List of code lines HTML elements
 * @param {string} text Text to highlight
 * @returns {undefined}
 */
function highlightOcurrences(code, text) {
    code.unhighlight({ className: '__refined_bitbucket_highlight' })
    code.highlight([text, text.trim()], {
        className: '__refined_bitbucket_highlight',
        caseSensitive: true,
        wordsOnly: true,
        wordsBoundaryStart: '(',
        wordsBoundaryEnd: ')',
    })
}

/**
 * Gets the selection as a HTML element node.
 * @param {Selection} selection The selection
 * @returns {HTMLElement} Selection's HTML node
 */
function getSelectionAsNode(selection) {
    if (selection.anchorNode instanceof Text) {
        const word = selection.anchorNode.splitText(selection.anchorOffset)
        word.splitText(selection.focusOffset)
        return word
    }
    return selection.anchorNode
}

/**
 * Wraps the given DOM Element in a span with the given ID
 * @param {HTMLElement} el The element to wrap
 * @param {string} id The id of the element
 * @returns {HTMLElement} The wrapped element
 */
function wrapInSpan(el, id) {
    const wrapper = document.createElement('span')
    wrapper.id = id
    $(el).wrap(wrapper)
    return el.parentNode
}

/**
 * Unwraps all the children of the given element
 * @param {HTMLElement} el The element to unwrap
 * @returns {HTMLElement[]} An array of the elements children
 */
function unwrapChildren(el) {
    if (el && el.firstElementChild) {
        return $(el.firstElementChild).unwrap()
    }
    return []
}

/**
 * Gets the first element that either has the '__refined_bitbucket_highlight' class itself
 * or contains a children that has it
 * @param {HTMLElement[]} children Element list to search in
 * @return {HTMLElement} Highlighted element
 */
function getHighlightedNode(children) {
    for (let index = 0; index < children.length; index++) {
        const node = children[index]
        if (node.classList.contains('__refined_bitbucket_highlight')) {
            return node
        }
        const nodesWithHighlightClass = node.getElementsByClassName(
            '__refined_bitbucket_highlight'
        )
        if (nodesWithHighlightClass.length !== 0) {
            return nodesWithHighlightClass[0]
        }
    }
}

/**
 * Selects the HTMLElement element's contents
 * @param {HTMLElement} element The element
 */
function selectElementContents(element) {
    const range = document.createRange()
    range.selectNodeContents(element)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
}
