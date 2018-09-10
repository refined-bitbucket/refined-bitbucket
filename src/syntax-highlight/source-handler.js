// @flow

import languagesExtensions from './language-ext'

// eslint-disable-next-line flowtype/no-weak-types
declare var Prism: { languages: { [language: string]: Object } }

/**
 * Retrieves a class according to the element data-filename or data-path attribute.
 * For example, calling it passing an element with a data-filename (or data-path)
 * like "/path/to/file/filename.java" would return "language-java".
 *
 * @param  {HTMLElement} element An HTML element. Pass anything different and bear the consequences :)
 * @return {string} The class extracted from the element's file path.
 */
export function getLanguageClass(element: HTMLElement): string {
    const filePath = getFilepathFromElement(element)
    const fileExtension = getExtension(filePath).toLowerCase()

    if (fileExtension in languagesExtensions) {
        return languagesExtensions[fileExtension]
    }

    const fileName = getFilename(filePath).toLowerCase()
    if (fileName in languagesExtensions) {
        return languagesExtensions[fileName]
    }

    const fileExtensionWithoutDot = fileExtension.slice(1)
    if (fileExtensionWithoutDot in Prism.languages) {
        return `language-${fileExtensionWithoutDot}`
    }

    return ''
}

/**
 * Retrieves the filename of an element according to its `data-identifier`, * `data-filename` or `data-path` attributes.
 *
 * @param  {HTMLElement} element An HTML element. Pass anything different and bear the consequences :)
 * @return {string} The filename
 */
export function getFilepathFromElement(element: HTMLElement): string {
    const filepath =
        element.getAttribute('data-identifier') ||
        element.getAttribute('data-filename') ||
        element.getAttribute('data-path') ||
        ''
    return filepath.trim()
}

/**
 * @param {string} filepath Filepath
 * @return {string} Extension
 */
export function getExtension(filepath: string): string {
    return `.${filepath.slice(((filepath.lastIndexOf('.') - 1) >>> 0) + 2)}`
}

/**
 * Extracts the name of the current file to be highlighted
 * @param {string} filepath Filepath
 * @return {string} name of the file
 */
function getFilename(filepath: string): string {
    return filepath.slice(filepath.lastIndexOf('/') + 1)
}
