// @flow

import languagesExtensions from './language-ext'

// eslint-disable-next-line flowtype/no-weak-types
declare var Prism: { languages: { [language: string]: Object } }

/**
 * Retrieves a class according to a filepath string argument.
 * For example, calling it passing a string such as:
 * "/path/to/file/filename.java" would return "language-java".
 *
 * @param  {string} filePath A file name and (optionally) path.  For example C:/HellowWorld.Java or just HelloWorld.Java
 * @return {string} The class extracted from the element's file path.
 */
export function getLanguageClass(filePath: string): string {
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
