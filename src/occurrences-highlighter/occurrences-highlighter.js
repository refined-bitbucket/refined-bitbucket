/* global $, window */

'use strict';

const waitForRender = require('../wait-for-render.js');

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
        const text = getSelectedText().toString();

        code.unhighlight();
        code.highlight(text, {
            caseSensitive: true,
            wordsOnly: true
        });
    });
}

function getSelectedText() {
    let selection = '';
    if (window.getSelection) {
        selection = window.getSelection();
    } else if (document.getSelection) {
        selection = document.getSelection();
    } else if (document.selection) {
        selection = document.selection.createRange().text;
    }
    return selection;
}
