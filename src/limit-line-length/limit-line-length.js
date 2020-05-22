// @flow
import addStyleToPage from '../add-style'
import './limit-line-length.css'

function createCssRules(lineLengthLimit) {
    let filler = ''
    for (let i = 0; i < lineLengthLimit; i++) {
        filler += '#'
    }

    const cssRules = `
        .refract-content-container::before {
            content: "-${filler}";
        }
    `

    return cssRules
}

export default function setLineLengthLimit(lineLengthLimit: number | string) {
    const cssRules = createCssRules(parseInt(lineLengthLimit, 10))
    addStyleToPage(cssRules)
}
