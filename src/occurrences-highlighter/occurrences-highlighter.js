/* global $, window, Text */

'use strict';

const waitForRender = require('../wait-for-render.js');

const SELECTION_TEMPORARY_ID = '__refined_bitbucket_selection_temporary_id';

module.exports = (function () {
    return {
        init
    };

    function init() {
        waitForRender('.diff-container').then(() => {
            insertStyles();
            highlightOnDoubleClick();
        });
    }
})();

function insertStyles() {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.highlight {background:#FFFF88;}';
    head.appendChild(style);
}

function highlightOnDoubleClick() {
    $('.diff-content-container').dblclick(function () {
        const $this = $(this);

        // <pre> for lines of code
        // <div class="comment-content"> for comments
        // <span class="description"> for tasks
        const code = $($this.closest('.diff-content-container')[0]).find('pre, div.comment-content, span.description');
        const selection = getSelectedText();
        const selectionIsInTextArea = selection.anchorNode.getElementsByTagName && selection.anchorNode.getElementsByTagName('textarea').length;
        const text = selection.toString();

        // When the user selects a word inside a textarea, the selected text is not actually present in the DOM.
        // In that case the selection is not highlighted and our reselection logic will actually deselect the text.
        if (selectionIsInTextArea) {
            highlightOcurrences(code, text);
        } else {
            const selectedNode = getSelectionAsNode(selection);
            const span = wrapInSpan(selectedNode, SELECTION_TEMPORARY_ID);
            highlightOcurrences(code, text);
            const children = unwrapChildren(span);
            const highlightedNode = getHighlightedNode(children);
            if (highlightedNode) {
                selectElementContents(highlightedNode);
            }
        }
    });
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection();
    }
    if (document.getSelection) {
        return document.getSelection();
    }
    if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

/**
 * Removes all previous highlights and then highlights the string `text`
 * (trimmed and untrimmed) in the `code` array of nodes
 * @param {HTMLElement[]} code
 * @param {string} text
 */
function highlightOcurrences(code, text) {
    code.unhighlight();
    code.highlight([text, text.trim()], {
        caseSensitive: true,
        wordsOnly: true,
        wordsBoundaryStart: '(',
        wordsBoundaryEnd: ')'
    });
}

/**
 * Gets the selection as a HTML element node.
 * @param {Selection} selection
 * @returns {HTMLElement}
 */
function getSelectionAsNode(selection) {
    if (selection.anchorNode instanceof Text) {
        const word = selection.anchorNode.splitText(selection.anchorOffset);
        word.splitText(selection.focusOffset);
        return word;
    }
    return selection.anchorNode;
}

/**
 * Wraps the given DOM Element in a span with the given ID
 * @param {HTMLElement} el
 * @param {string} id
 * @returns {HTMLElement}
 */
function wrapInSpan(el, id) {
    const wrapper = document.createElement('span');
    wrapper.id = id;
    $(el).wrap(wrapper);
    return el.parentNode;
}

/**
 * Unwraps all the children of the given element
 * @param {HTMLElement} el
 * @returns {HTMLElement[]} - An array of the elements children
 */
function unwrapChildren(el) {
    if (el && el.firstElementChild) {
        return $(el.firstElementChild).unwrap();
    }
    return [];
}

/**
 * Gets the first element that either has the 'highlight' class itself
 * or contains a children that has it
 * @param {HTMLElement[]} children
 * @return {HTMLElement}
 */
function getHighlightedNode(children) {
    for (let index = 0; index < children.length; index++) {
        const node = children[index];
        if (node.classList.contains('highlight')) {
            return node;
        }
        const nodesWithHighlightClass = node.getElementsByClassName('highlight');
        if (nodesWithHighlightClass.length) {
            return nodesWithHighlightClass[0];
        }
    }
}

/**
 * Selects the HTMLElement element's contents
 * @param {HTMLElement} element
 */
function selectElementContents(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}
