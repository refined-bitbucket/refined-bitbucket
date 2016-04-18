/* jshint esversion: 6 */

define(['../var/window', '../var/document', 'jquery', '../lib/jquery.highlight'], function(window, document, jquery) {
    'use strict';

    const INTERVAL = 50; // Interval in milliseconds.

    function getSelectedText() {
        var txt = '';
        if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        return txt;
    }

    function insertStyles() {
        const head = document.getElementsByTagName('head')[0];
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.highlight {background:#FFFF88;}';
        head.appendChild(style);
    }

    function highlightOnDblClick() {
        jquery('.diff-content-container').dblclick(function() {
            var code = $($(this).closest('.diff-content-container')[0]).find('pre'),
                text = getSelectedText().toString();

            code.unhighlight();
            code.highlight(text, {
                caseSensitive: true,
                wordsOnly: true
            });
        });
    }

    function selectWhenReady() {
        const intervalId = setInterval(() => {
            const container = document.querySelector('.diff-container');
            if (!container) return;

            // If main container is rendered, stop the interval and continue.
            clearInterval(intervalId);

            insertStyles();
            highlightOnDblClick();
        }, INTERVAL);
    }

    return {
        run: function() {
            selectWhenReady();
        }
    };
});
