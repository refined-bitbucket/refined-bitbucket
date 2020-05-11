// @flow
import { h } from 'dom-chef'
import elementReady from 'element-ready'
import SelectorObserver from 'selector-observer'
import { clearAuthorReviewers, initAuthorReviewers } from '../ui-renderer'

export default async function syncAuthorReviewersChanges(): void {
    const target = await elementReady('#compare-content')
    // eslint-disable-next-line no-new
    new SelectorObserver(
        target,
        '#compare-metadata',
        () => undefined,
        async () => {
            await elementReady('#compare-metadata')
            clearAuthorReviewers()
            initAuthorReviewers()
        }
    )
}
