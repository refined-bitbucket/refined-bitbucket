// @flow

/* global Prism, MutationObserver */

'use strict'

import { getLanguageClass } from './common/source-handler'

import './common/prism.css'

const _rbbClassName = '__rbb_syntax_highlight'
const _allCodeLinesCssSelector = '[data-qa=code-line] pre > span:last-child'
let _allUnformattedCodeLinesCssSelector =
    _allCodeLinesCssSelector + ':not(.' + _rbbClassName + ')'

const allDiffsObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        // Only act when new nodes are added
        if (!(mutation.type === 'childList' && mutation.addedNodes.length)) {
            continue
        }

        // For each line in the diff block
        mutation.target
            .querySelectorAll(_allUnformattedCodeLinesCssSelector)
            .forEach(elem => {
                highlightDiff(elem)
            })
    }
})

export default function syntaxHighlight(sectionAllDiffs: HTMLElement) {
    // Set up an observer to pay attention to all potential code changes in the diff section
    allDiffsObserver.observe(sectionAllDiffs, {
        childList: true,
        subtree: true,
    })

    // And then run once directly, to get the currently open file
    const codeLine = sectionAllDiffs.querySelector(
        _allUnformattedCodeLinesCssSelector
    )

    if (!codeLine) return

    highlightDiff(codeLine)
}

function highlightDiff(codeElemInDiff: HTMLElement) {
    requestIdleCallback(() => {
        if (codeElemInDiff.classList.contains(_rbbClassName)) return

        // Try to get the extension of the file
        const article = codeElemInDiff.closest(
            'article[data-qa="pr-diff-file-styles"]'
        )
        if (!article) return

        const ariaAttribute = article.getAttribute('aria-label')

        if (!ariaAttribute) return

        // The aria attribute preceeds the filepath with boilerplate text
        const aaBoilerplate = 'Diff of file '

        const filePath =
            ariaAttribute.startsWith(aaBoilerplate) &&
            ariaAttribute.length > aaBoilerplate.length
                ? ariaAttribute.substring(aaBoilerplate.length)
                : ariaAttribute

        const lang = getLanguageClass(filePath)

        if (!lang) {
            // quit if this is not a language supported by Prism
            return
        }

        // Get all lines from the same file and put it into the holder
        const nodes = article.querySelectorAll(_allCodeLinesCssSelector)

        // Create a holder to hold all codes from the same file
        const code = document.createElement('code')

        // Set the language so prism do not have to guess
        code.classList.add(lang)

        code.textContent = Array.from(nodes)
            .map(node => node.innerText)
            .join('\n')

        // Then highlight the holder
        Prism.highlightElement(code)

        // After that, split the holder to get the highlighted figments then inject them back
        const highlightedNodes = code.innerHTML.split('\n')
        nodes.forEach((_node, idx) => {
            _node.classList.add(lang)
            _node.classList.add(_rbbClassName)
            _node.innerHTML = highlightedNodes[idx]
        })
    })
}
