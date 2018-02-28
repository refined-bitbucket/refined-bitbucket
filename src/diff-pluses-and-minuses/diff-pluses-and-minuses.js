let stylesImported = false;

export const execute = diff => {
    [
        ...diff.querySelectorAll(
            'div.udiff-line.addition > pre.source, div.udiff-line.deletion > pre.source, ' +
                'div.udiff-line.addition > pre.source > span.token:first-of-type, ' +
                'div.udiff-line.deletion > pre.source > span.token:first-of-type'
        )
    ]
        .filter(({ firstChild }) => firstChild instanceof Text)
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
