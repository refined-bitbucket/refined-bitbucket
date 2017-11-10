'use strict';

import languagesExtensions from './language-ext';

export {
    getCodeElementFromPre,
    getClassBasedOnExtension,
    getFilepathFromElement,
    getExtension
};

/**
 * Creates a <code> element with the content of the preElement passed as parameter.
 *
 * @param  {Element} preElement An HTML <pre> element. Whatever else you pass.. Is not my fault.
 * @return {Element} A <code> element.
 */
function getCodeElementFromPre(preElement) {
    if (!preElement.childElementCount) {
        const codeElement = document.createElement('code');
        codeElement.innerHTML = preElement.innerHTML;
        preElement.innerHTML = codeElement.outerHTML;
    }
    return preElement;
}

/**
 * Retrieves a class according to the element data-filename or data-path attribute.
 * For example, calling it passing an element with a data-filename (or data-path)
 * like "/path/to/file/filename.java" would return "language-java".
 *
 * @param  {Element} element An HTML element. Pass anything different and bear the consequences :)
 * @return {String} The class extracted from the element's file path.
 */
function getClassBasedOnExtension(element) {
    const filePath = getFilepathFromElement(element);
    const fileExtension = getExtension(filePath);
    return languagesExtensions[fileExtension.toLowerCase()] || '';
}

/**
 * Retrieves the filename of an element according to its `data-identifier`, * `data-filename` or `data-path` attributes.
 *
 * @param  {Element} element An HTML element. Pass anything different and bear the consequences :)
 * @return {String} The filename
 */
function getFilepathFromElement(element) {
    const filepath = element.getAttribute('data-identifier') ||
        element.getAttribute('data-filename') ||
        element.getAttribute('data-path') ||
        '';
    return filepath.trim();
}

/**
 * @param {String} filepath
 * @return {String}
 */
function getExtension(filepath) {
    return `.${filepath.slice((filepath.lastIndexOf('.') - 1 >>> 0) + 2)}`;
}
