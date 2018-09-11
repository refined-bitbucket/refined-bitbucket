// @flow

let stylesImported = false

const diffLineSelector = [
    'div.udiff-line.addition > pre.source',
    'div.udiff-line.deletion > pre.source',
].join(', ')

const stripCharsFromLine = (line: Element) => {
    // Insert only a space to preserve
    // line breaks when the line is empty
    if (line.textContent === '+' || line.textContent === '-') {
        line.textContent = ' '
    } else {
        line.innerHTML = line.innerHTML.slice(1)
    }
}

const firstPass = (diff: Element): string[] => {
    const diffLines = [...diff.querySelectorAll(diffLineSelector)]

    diffLines.forEach(line => stripCharsFromLine(line))

    return diffLines.map(({ textContent }) => textContent)
}

const secondPass = (diff: Element, strippedLinesContent: string[]) => {
    ;[...diff.querySelectorAll(diffLineSelector)]
        .filter(({ textContent }, i) => textContent !== strippedLinesContent[i])
        .forEach(line => stripCharsFromLine(line))
}

export default function removeDiffsPlusesAndMinuses(
    diff: Element,
    afterWordDiff: (callback: () => void) => Promise<void> = async () => {}
) {
    if (!stylesImported) {
        stylesImported = true
        require('./diff-pluses-and-minuses.css')
    }

    const strippedLinesContent = firstPass(diff)

    afterWordDiff(() => secondPass(diff, strippedLinesContent))
}
