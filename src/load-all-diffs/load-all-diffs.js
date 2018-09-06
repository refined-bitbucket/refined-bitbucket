// @flow
// @jsx h

import elementReady from 'element-ready'
import { h } from 'dom-chef'

export async function init(node: Element) {
    // Wait for all sections to be loaded into the view
    await elementReady('#commit-files-summary > li', {
        target: node,
    })
    const filesChanged = node.querySelectorAll('#commit-files-summary > li')

    const promises = [...filesChanged].map(li => {
        const dataIdentifier = li.getAttribute('data-file-identifier') || ''
        return elementReady(`section[data-identifier="${dataIdentifier}"]`, {
            target: node,
        })
    })

    await Promise.all(promises)

    // Create the button and append it to the file summary list
    const failedDiffs = node.querySelectorAll('a.try-again')
    const button = (
        <button id="__refined_bitbucket_load_all_diffs" class="aui-button">
            Load all failed diffs ({failedDiffs.length})
        </button>
    )
    const summarySection = node.querySelector(
        '#pullrequest-diff > section.main, section#commit-summary, ul#commit-files-summary'
    )
    // $FlowIgnore
    summarySection.appendChild(button)

    if (failedDiffs.length === 0) {
        button.disabled = true
        button.textContent = 'All diffs loaded successfully'
        return
    }

    // Bind the click event
    button.addEventListener('click', async () => {
        button.disabled = true
        button.textContent = 'Please wait'

        const finished = [...node.querySelectorAll('a.try-again')].map(
            tryAgain => {
                tryAgain.click()
                const dataIdentifier =
                    // $FlowIgnore
                    tryAgain
                        .closest('section')
                        .getAttribute('data-identifier') || ''
                return elementReady(
                    `section[data-identifier="${dataIdentifier}"] > div.diff-container`,
                    { target: node }
                )
            }
        )

        await Promise.all(finished)

        button.textContent = 'All diffs loaded successfully'
        button.setAttribute('data-complete', true)
    })
}
