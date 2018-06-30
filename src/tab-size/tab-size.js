import addStyleToPage from '../add-style'

export default function setTabSize(numSpaces) {
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
