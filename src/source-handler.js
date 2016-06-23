const languagesExtensions = require('./language-ext');
const getExtension = require('./get-extension');

/**
 * Creates a <code> element with the content of the element received and wraps this
 * created element in a <pre> element.
 * @param  {Element} preElement An HTML <pre> element. Whatever else you pass.. Is not my fault.
 * @return {Element} A <pre> element that has a <code> element inside.
 */
module.exports.transformPreElement = function transformPreElement(preElement) {
    if (!preElement) {
        throw new Error('<pre> element parameter was not passed.');
    }
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.innerHTML = preElement.innerHTML;
    pre.appendChild(code);
    return pre;
};

/**
 * Retrieves a class according to the element data-filename or data-path attribute.
 * For example, calling it passing an element with a data-filename (or data-path)
 * like "/path/to/file/filename.java" would return "language-java".
 *
 * @param  {Element} element An HTML element. Pass anything different and bear the consequences :)
 * @return {String} The class extracted from the element's file path.
 */
module.exports.getClassBasedOnExtension = function getClassBasedOnExtension(element) {
    const filePath = getFilepathFromElement(element);
    const fileExtension = getExtension(filePath);
    if (!fileExtension) {
        throw new Error('couldn\'t find neither data-filename nor data-path in the element');
    }
    return languagesExtensions[fileExtension];
};

function getFilepathFromElement(element) {
    return element.getAttribute('data-filename') || element.getAttribute('data-path') || '';
}
