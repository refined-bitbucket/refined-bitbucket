// @flow
import addStyleToPage from '../add-style'
import './limit-line-length.css'

function createCssRules(lineLengthLimit, isStickyHeaderEnabled) {
    let filler = ''
    for (let i = 0; i < lineLengthLimit; i++) {
        filler += '#'
    }

    let cssRules = `
        .refract-content-container::before {
            content: "-${filler}";
        }
    `

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
