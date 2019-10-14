// @flow
import addStyleToPage from '../add-style'

function createCssRules(lineLengthLimit, isStickyHeaderEnabled) {
    let filler = ''
    for (let i = 0; i < lineLengthLimit; i++) {
        filler += '#'
    }

    let cssRules = `
        .refract-content-container > .udiff-line:first-child .source::before,
        .refract-content-container > .udiff-line:last-child .source::before,
        .refract-content-container > .udiff-line:nth-child(2):not(:last-child) .source::before {
            content: "-${filler}";

            position: absolute;
            top: 0;
            height: 100%;
            border-right: 1px solid #c0c0c0;
            pointer-events: none;
            color: transparent;
            user-select: none;
        }
    `

    if (!isStickyHeaderEnabled) {
        cssRules += `
            .diff-container .heading {
                position: relative;
                z-index: 1;
            }
        `
    }

    return cssRules
}

export default function setLineLengthLimit(
    lineLengthLimit: number | string,
    isStickyHeaderEnabled: boolean
) {
    const cssRules = createCssRules(
        parseInt(lineLengthLimit, 10),
        isStickyHeaderEnabled
    )
    addStyleToPage(cssRules)
}
