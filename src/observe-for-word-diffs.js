/**
 * Keep watching in case the diff is altered to include
 * word diffs, which rerenders the diffs with <ins> and <del> tags
 * and ends up removing any previous manipulation we did with it :(
 *
 * @param {HTMLElement} diff
 */
const observeForWordDiffs = (diff, timeout = 20000) => {
    const p = new Promise(resolve => {
        const diffContentContainer = diff.querySelector(
            'div.diff-container > div.diff-content-container.refract-container'
        )

        // Return earlier if couldn't find the element, which happens when the diff failed to load
        // or the file contents are unchanged (file was renamed or only whitespace changes)
        if (!diffContentContainer) {
            resolve()
            return
        }

        const isModifiedOrConflict = diff.querySelector(
            'h1.filename span.diff-entry-lozenge.aui-lozenge-complete, ' +
                'h1.filename span.diff-entry-lozenge.aui-lozenge-current, ' +
                'h1.filename span.diff-entry-lozenge.aui-lozenge-moved'
        )

        // Only "Modified" and "Conflict" diffs will include word diffs
        if (!isModifiedOrConflict) {
            resolve()
            return
        }

        const observer = new MutationObserver(function(mutations) {
            const isWordDiff = mutations.every(m =>
                m.target.classList.contains('word-diff')
            )

            if (isWordDiff) {
                this.disconnect()
                resolve(diff)
            }
        })

        observer.observe(diffContentContainer, {
            attributes: true,
            attributeFilter: ['class'],
        })

        // Disconnect the observer after an arbitrary amount of seconds,
        // to release browser resources.
        setTimeout(() => {
            observer.disconnect()
            resolve()
        }, timeout)
    })

    return async callback => {
        const wordDiffedDiff = await p

        if (wordDiffedDiff) {
            callback()
        }
    }
}

export default observeForWordDiffs
