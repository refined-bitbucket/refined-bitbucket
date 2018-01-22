/* global Prism, MutationObserver */

'use strict';

import { h } from 'dom-chef';
import elementReady from 'element-ready';
import debounce from '../debounce';
import {
    getClassBasedOnExtension,
    getCodeElementFromPre
} from './source-handler';

import './prism.css';
import './fix.css';

const codeContainerObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation =>
        syntaxHighlightSourceCodeLines(mutation.target)
    );
});

let debouncedSideDiffHandler = null;

export default function syntaxHighlight(diff) {
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
    codeContainerObserver.observe(codeContainer, { childList: true });

    // side by side
    const sideBySideButton = diff.querySelector('button[href*="side-by-side"]');
    // deleted files don't have side by side
    if (sideBySideButton) {
        sideBySideButton.addEventListener('click', () => {
            if (
                sideBySideButton.attributes.href &&
                sideBySideButton.attributes.href.nodeValue
            ) {
                const args = {
                    languageClass,
                    diffNodeSelector: sideBySideButton.attributes.href.nodeValue
                };
                highlightSideDiffAsync(args);
                listenForSideDiffScrollAsync(args);
            }
        });
    }
}

function syntaxHighlightSourceCodeLines(diff) {
    const sourceLines = Array.from(
        diff.querySelectorAll('pre:not([class*=language])')
    );

    sourceLines.forEach(preElement => {
        preElement = getCodeElementFromPre(preElement);
        Prism.highlightElement(preElement);
    });
}

async function highlightSideDiffAsync({ languageClass, diffNodeSelector }) {
    const sideBySide = document.querySelector(diffNodeSelector);
    sideBySide.classList.add(languageClass);

    await elementReady(`${diffNodeSelector} pre`, { target: sideBySide });

    syntaxHighlightSourceCodeLines(sideBySide);
}

async function listenForSideDiffScrollAsync(args) {
    const scrollersSelector = 'div.aperture-pane-scroller';

    await elementReady(scrollersSelector, { target: document });

    const scrollers = [...document.querySelectorAll(scrollersSelector)];

    if (debouncedSideDiffHandler) {
        scrollers.forEach(scroller => {
            scroller.removeEventListener('scroll', debouncedSideDiffHandler);
        });
    }

    debouncedSideDiffHandler = debounce(
        () => highlightSideDiffAsync(args),
        250
    );

    scrollers.forEach(scroller => {
        scroller.addEventListener('scroll', debouncedSideDiffHandler);
    });
}
