// @flow

/* global Prism, MutationObserver */

'use strict'

import { getLanguageClass } from './common/source-handler'
import loadThemeOnce from './prism-themes/load-theme-once'

const _rbbClassName = '__rbb_syntax_highlight'
const _allCodeLinesCssSelector = '[data-qa=code-line] pre > span:last-child'
const _allUnformattedCodeLinesCssSelector =
    _allCodeLinesCssSelector + ':not(.' + _rbbClassName + ')'

const allDiffsObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        // Only act when new nodes are added
        if (
            !(mutation.type === 'childList' && mutation.addedNodes.length > 0)
        ) {
            continue
        }

        // For each line in the diff block
        ;((mutation.target: any): HTMLElement)
            .querySelectorAll(_allUnformattedCodeLinesCssSelector)
            .forEach(elem => {
                highlightDiff(elem)
            })
    }
})

export default function syntaxHighlight(
    sectionAllDiffs: HTMLElement,
    theme: string
) {
    loadThemeOnce(theme)

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
            // Quit if this is not a language supported by Prism
            return
        }

        // Get all lines from the same file and put it into the holder
        const nodes = article.querySelectorAll(_allCodeLinesCssSelector)
        nodes.forEach(node => {
            node.classList.add(lang)
            node.classList.add(_rbbClassName)

            // $FlowIgnore Prism is a loaded global, it will not be null
            Prism.highlightElement(node)

            // $FlowIgnore node is from the DOM, is guaranteed to have a parentElement
            node.parentElement.classList.remove(lang)
        })
    })
}
