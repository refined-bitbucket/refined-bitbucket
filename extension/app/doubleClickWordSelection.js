/* jshint esversion: 6 */

define(['../var/window', 'jquery'], function(window, jquery) {
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

    function deselectText() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.getSelection) {
            txt = document.getSelection().removeAllRanges();
        } else if (document.selection) {
            txt = document.selection.empty;
        }
    }

    function insertStyles() {
        const head = document.getElementsByTagName('head')[0];
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.highlight {background:#FFFF00;}';
        head.appendChild(style);
    }

    function highlightOnDblClick() {
        jquery('.diff-content-container').dblclick(function() {
            $('.highlight').removeClass('highlight');
            var t = getSelectedText();
            var regex = new RegExp(t, "gi");
            var container = $(this).closest('.diff-content-container')[0];
            container.innerHTML = container.innerHTML.replace(regex, function(matched) {
                return "<span class=\"highlight \">" + matched + "</span>";
            });
            deselectText();
        });
    }

    function selectWhenReady() {
        const intervalId = setInterval(() => {
            const container = document.getElementById('pullrequest-diff');
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
