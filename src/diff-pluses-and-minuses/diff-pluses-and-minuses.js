let stylesImported = false;

export const execute = diff => {
    [
        ...diff.querySelectorAll(
            'div.udiff-line > pre.source, div.udiff-line > pre.source > span.token:first-of-type'
        )
    ]
        .filter(({ firstChild }) => {
            return (
                firstChild instanceof Text &&
                /^\+|-/.test(firstChild.textContent)
            );
        })
        .forEach(({ firstChild }) => {
            // Insert only a space to preserve
            // line breaks when the line is empty
            if (
                firstChild.textContent === '+' ||
                firstChild.textContent === '-'
            ) {
                firstChild.textContent = ' ';
            } else {
                firstChild.textContent = firstChild.textContent.slice(1);
            }
        });
};

/**
 * Keep watching in case the diff is altered to include
 * word diffs, which rerenders the diffs with <ins> and <del> tags
 * and ends up removing any previous manipulation we did with it :(
 *
 * @param {HTMLElement} diff
 */
export const observeForWordDiffs = diff => {
    return new Promise(resolve => {
        const diffContentContainer = diff.querySelector(
            'div.diff-container > div.diff-content-container.refract-container'
        );

        // Return earlier if couldn't find the element,
        // which happens when the diff failed to load
        if (!diffContentContainer) {
            resolve();
            return;
        }

        const observer = new MutationObserver(function(mutations) {
            const isWordDiff = mutations.every(m =>
                m.target.classList.contains('word-diff')
            );

            if (isWordDiff) {
                this.disconnect();
                execute(diff);
                resolve();
            }
        });

        observer.observe(diffContentContainer, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Disconnect the observer after an arbitrary 20 seconds,
        // to release browser resources.
        setTimeout(() => {
            observer.disconnect();
            resolve();
        }, 20000);
    });
};

export default function removeDiffsPlusesAndMinuses(diff) {
    if (!stylesImported) {
        stylesImported = true;
        require('./diff-pluses-and-minuses.css');
    }

    execute(diff);

    observeForWordDiffs(diff);
}
