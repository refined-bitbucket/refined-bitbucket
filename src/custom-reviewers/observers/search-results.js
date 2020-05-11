// @flow
import { h } from 'dom-chef'
import elementReady from 'element-ready'
import SelectorObserver from 'selector-observer'

export default async function syncSearchResultsChanges(): void {
    const target = await elementReady('#search-results-drop-down')
    // eslint-disable-next-line no-new
    new SelectorObserver(
        target,
        '#search-results',
        async () => {
            await elementReady('#search-results')
        },
        async () => {
            await elementReady('#search-results')
        }
    )
}
