/* global $, window */

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
        const code = $($this.closest('.diff-content-container')[0]).find('pre');
        const selection = getSelectedText();
        const text = selection.toString().trim();
        const span = wrapInSpan(selection.anchorNode, SELECTION_TEMPORARY_ID);

        code.unhighlight();
        code.highlight(text, {
            caseSensitive: true,
            wordsOnly: true
        });

        const children = unwrapChildren(span);
        const highlighted = [...children].find(node => node.classList.contains('highlight'));
        if (highlighted) {
            selectElementContents(highlighted);
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
