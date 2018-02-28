let stylesImported = false;

const selectors = [
    'div.udiff-line.addition > pre.source:not([class*=__rbb-touched])',
    'div.udiff-line.deletion > pre.source:not([class*=__rbb-touched])',
    'div.udiff-line.addition > pre.source:has(ins,del)',
    'div.udiff-line.deletion > pre.source:has(ins,del)'
];

export const execute = $diff => {
    const diffLines = [...$diff.find(selectors.join(', '))];

    diffLines
        .filter(({ firstChild }) => firstChild instanceof Text)
        .forEach(el => {
            el.classList.add('__rbb-touched');
            const { firstChild } = el;
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

    const $diff = $(diff);

    execute($diff);

    afterWordDiff(() => execute($diff));
}
