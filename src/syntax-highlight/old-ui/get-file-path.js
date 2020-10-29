// @flow

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
