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

export default function removeDiffsPlusesAndMinuses(diff, afterWordDiff) {
    if (!stylesImported) {
        stylesImported = true;
        require('./diff-pluses-and-minuses.css');
    }

    execute(diff);

    afterWordDiff(() => execute(diff));
}
