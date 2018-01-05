/* global Prism, MutationObserver */

'use strict';

import {h} from 'dom-chef';
import elementReady from 'element-ready';
import debounce from '../debounce';
import {getClassBasedOnExtension, getCodeElementFromPre} from './source-handler';

const codeContainerObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => syntaxHighlightSourceCodeLines(mutation.target));
});

let debouncedSideDiffHandler = null;

export function init() {
    let head = document.getElementsByTagName('head')[0];
    let lastHeadElement = head.lastChild;
    let style = document.createElement('style');
    const styleArray = [];
    style.type = 'text/css';
    // Prism css
    styleArray.push('.token.comment,.token.prolog,.token.doctype,.token.cdata{color: slategray}.token.punctuation{color: #999}.namespace{opacity: .7}.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted{color: #905}.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted{color: #690}.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string{color: #a67f59;background: hsla(0, 0%, 100%, .5)}.token.atrule,.token.attr-value,.token.keyword{color: #07a}.token.function{color: #DD4A68}.token.regex,.token.important,.token.variable{color: #e90}.token.important,.token.bold{font-weight: bold}.token.italic{font-style: italic}.token.entity{cursor: help}');
    // Custom css to fix some layout problems because of the insertion of <code> element
    styleArray.push(`
        pre > code {
            border-radius: initial;
            display: initial;
            line-height: initial;
            margin-left: initial;
            overflow-y: initial;
            padding: initial;
        }
        .refract-container .deletion pre.source {
            background-color: #fff1f2 !important;
        }
        .refract-container .addition pre.source {
            background-color: #e8ffe8;
        }
    `);
    style.innerHTML = styleArray.join('');
    head.insertBefore(style, lastHeadElement);
    head = null;
    lastHeadElement = null;
    style = null;
}

export function syntaxHighlight(diff) {
    // File was only renamed, there's no diff
    if (diff.querySelector('.content-container')) {
        return;
    }
    // Diff failed because pull request is too big
    if (diff.querySelector('div.too-big-message')) {
        return;
    }

    const languageClass = getClassBasedOnExtension(diff);

    if (!languageClass) {
        return;
    }

    if (!diff.classList.contains(languageClass)) {
        diff.classList.add(languageClass);
    }

    syntaxHighlightSourceCodeLines(diff);

    const codeContainer = diff.querySelector('.refract-content-container');
    codeContainerObserver.observe(codeContainer, {childList: true});

    // side by side
    const sideBySideButton = diff.querySelector('button[href*="side-by-side"]');
    // deleted files don't have side by side
    if (sideBySideButton) {
        sideBySideButton.addEventListener('click', () => {
            if (sideBySideButton.attributes.href && sideBySideButton.attributes.href.nodeValue) {
                const args = {languageClass, diffNodeSelector: sideBySideButton.attributes.href.nodeValue};
                highlightSideDiffAsync(args);
                listenForSideDiffScrollAsync(args);
            }
        });
    }
}

function syntaxHighlightSourceCodeLines(diff) {
    const sourceLines = Array.from(diff.querySelectorAll('pre:not([class*=language])'));

    sourceLines.forEach(preElement => {
        preElement = getCodeElementFromPre(preElement);
        Prism.highlightElement(preElement);
    });
}

async function highlightSideDiffAsync({languageClass, diffNodeSelector}) {
    const sideBySide = document.querySelector(diffNodeSelector);
    sideBySide.classList.add(languageClass);

    await elementReady(`${diffNodeSelector} pre`, {target: sideBySide});

    syntaxHighlightSourceCodeLines(sideBySide);
}

async function listenForSideDiffScrollAsync(args) {
    const scrollersSelector = 'div.aperture-pane-scroller';

    await elementReady(scrollersSelector, {target: document});

    const scrollers = [...document.querySelectorAll(scrollersSelector)];

    if (debouncedSideDiffHandler) {
        scrollers.forEach(scroller => {
            scroller.removeEventListener('scroll', debouncedSideDiffHandler);
        });
    }

    debouncedSideDiffHandler = debounce(() => highlightSideDiffAsync(args), 250);

    scrollers.forEach(scroller => {
        scroller.addEventListener('scroll', debouncedSideDiffHandler);
    });
}
