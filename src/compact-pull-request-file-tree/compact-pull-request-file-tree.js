// @flow

import addStyleToPage from '../add-style'

export default function setCompactPullRequestFileTree() {
    const cssRule = createCssRule()
    addStyleToPage(cssRule)
}

function createCssRule() {
    const cssRule = `
        #PullRequestWelcomeTourTarget-Files a {
            height: 1em;
            padding: 5px 4px;
        }

        #PullRequestWelcomeTourTarget-Files button {
            padding: 5px 0;
        }
    `
    return cssRule
}
