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

// inject CSS <style> into <head> of page
function addStyleToPage(cssRule) {
    const css = document.createElement('style')
    css.type = 'text/css'
    css.appendChild(document.createTextNode(cssRule))
    document.getElementsByTagName('head')[0].appendChild(css)
}
