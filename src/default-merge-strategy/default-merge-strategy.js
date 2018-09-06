// @flow
// @jsx h

declare var $: any

import elementReady from 'element-ready'
import { h } from 'dom-chef'
import logger from '../logger'
import { isPullRequest } from '../page-detect'

type Strategy = 'merge_commit' | 'squash' | 'fast_forward'

export const SCRIPT_ID = 'refined_bitbucket_default_merge_script'

export const scriptAlreadyExists = () =>
    Boolean(document.getElementById(SCRIPT_ID))

export async function init(defaultMergeStrategy: Strategy) {
    try {
        await initAsync(defaultMergeStrategy)
    } catch (error) {
        // ignore, to not pollute the console with errors
    }
}

/**
 * Apply default merge strategy
 * @param {'merge_commit' | 'squash' | 'fast_forward'} defaultMergeStrategy Strategy
 * @returns {Promise<void>} Resolves when the acton is completed
 */
export function initAsync(defaultMergeStrategy: Strategy) {
    return new Promise<void>((resolve, reject) => {
        if (!isPullRequest() || scriptAlreadyExists()) {
            reject(
                new Error(
                    'This is not a pull request page, or the default merge script has already been inserted and executed.'
                )
            )
        }

        // DefaultMergeStrategy can be either 'merge_commit', 'squash' or 'fast_forward'
        if (
            !['merge_commit', 'squash', 'fast_forward'].includes(
                defaultMergeStrategy
            )
        ) {
            const msg = `refined-bitbucket(default-merge-strategy): Unimplemented merge strategy '${defaultMergeStrategy}'. No action taken.`
            logger.warn(msg)
            reject(msg)
        }

        const fulfillPr: HTMLElement = (document.getElementById(
            'fulfill-pullrequest'
        ): any)

        const onFulfillPullrequest = async () => {
            // I want this callback to run only once,
            // the first time the "Merge" button is clicked
            fulfillPr.removeEventListener('click', onFulfillPullrequest)

            await elementReady('#id_merge_strategy')

            // The rest of the lines of this callback are an ugly hack
            //  to get around a limitation  by design in the Chrome Extensions API.
            // I answered a StackOverflow question with the reasoning behind it:
            // https://stackoverflow.com/questions/38862198/how-to-programmatically-select-an-option-in-select2-from-chrome-extension-conten/47615838#47615838

            // NOTE: This code will run in the page's scope, not in the extension.
            const code = () => {
                $('#id_merge_strategy').select2('val', '{defaultMergeStrategy}')
                const $commitMsg = $('#id_commit_message')
                const selectedOption = document.querySelector(
                    "option[value='{defaultMergeStrategy}']"
                )
                // $FlowIgnore
                $commitMsg.text(selectedOption.dataset.defaultCommitMsg)
            }

            const codeStr = code
                .toString()
                .replace(/{defaultMergeStrategy}/g, defaultMergeStrategy)
            const script = (
                <script id={SCRIPT_ID}>
                    {' '}
                    ({codeStr}
                    )();{' '}
                </script>
            )
            // $FlowIgnore
            document.body.appendChild(script)

            resolve()
        }
        fulfillPr.addEventListener('click', onFulfillPullrequest)
    })
}
