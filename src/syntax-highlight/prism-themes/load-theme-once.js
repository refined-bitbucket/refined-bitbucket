// @flow

'use strict'

let stylesImported = false

export default function loadThemeOnce(themeName: string) {
    if (stylesImported) return

    switch (themeName) {
        case 'prism-coy':
            require('./prism-coy.css')
            break

        case 'prism-dark':
            require('./prism-dark.css')
            break

        case 'prism-funky':
            require('./prism-funky.css')
            break

        case 'prism-okaidia':
            require('./prism-okaidia.css')
            break

        case 'prism-solarizedlight':
            require('./prism-solarizedlight.css')
            break

        case 'prism-tomorrow':
            require('./prism-tomorrow.css')
            break

        case 'prism-twilight':
            require('./prism-twilight.css')
            break

        case 'prism':
        default:
            require('./prism.css')
    }

    stylesImported = true
}
