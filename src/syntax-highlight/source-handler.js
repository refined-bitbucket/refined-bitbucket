/* globals Prism */

'use strict'

import languagesExtensions from './language-ext'

/**
 * Retrieves a class according to the element data-filename or data-path attribute.
 * For example, calling it passing an element with a data-filename (or data-path)
 * like "/path/to/file/filename.java" would return "language-java".
 *
 * @param  {Element} element An HTML element. Pass anything different and bear the consequences :)
 * @return {String} The class extracted from the element's file path.
 */
export function getLanguageClass(element) {
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
 * @param  {Element} element An HTML element. Pass anything different and bear the consequences :)
 * @return {String} The filename
 */
export function getFilepathFromElement(element) {
    const filepath =
        element.getAttribute('data-identifier') ||
        element.getAttribute('data-filename') ||
        element.getAttribute('data-path') ||
        ''
    return filepath.trim()
}

/**
 * @param {String} filepath Filepath
 * @return {String} Extension
 */
export function getExtension(filepath) {
    return `.${filepath.slice(((filepath.lastIndexOf('.') - 1) >>> 0) + 2)}`
}

/**
 * Extracts the name of the current file to be highlighted
 * @param {String} filepath Filepath
 * @return {String} name of the file
 */
function getFilename(filepath) {
    return filepath.slice(filepath.lastIndexOf('/') + 1)
}
