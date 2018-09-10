// @flow
import addStyleToPage from '../add-style'

export default function setTabSize(numSpaces: number | string) {
    const cssRule = createCssRule(numSpaces)
    addStyleToPage(cssRule)
}

function createCssRule(numSpaces) {
    const cssRule = `
        .refract-container {
            tab-size: ${numSpaces}
        }
    `
    return cssRule
}
