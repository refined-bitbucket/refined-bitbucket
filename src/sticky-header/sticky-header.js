// @flow

import addStyleToPage from '../add-style'

export default function setStickyHeader() {
    const cssRule = createCssRule()
    addStyleToPage(cssRule)
}

function createCssRule() {
    const cssRule = `
        .diff-container .heading {
            position: sticky;
            top: 0px;
            z-index: 9;
            border: 1px solid #DFE1E6;
        }

        @media (max-width: 979px) {
            .diff-container .heading {
                top: 54px;
            }
        }
    `
    return cssRule
}
