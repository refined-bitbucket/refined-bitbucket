/* jshint esversion: 6 */

define(['../var/document', '../var/languages'], (document, languages) => {
    'use strict';

    const INTERVAL = 50; // Interval in milliseconds.

    return {
        init() {
            insertStyles();
            waitForRender('.diff-container').then(() => {
                highlightCode();
            });
        }
    };

    /**
     * Adds the necessary styles to the <head>.
     * It shouldn't be needed, since we have the prism.css, but for some reason
     * the styles are not being injected into the page.
     */
    function insertStyles() {
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        // Prism css
        style.innerHTML = '.token.comment,.token.prolog,.token.doctype,.token.cdata{color: slategray}.token.punctuation{color: #999}.namespace{opacity: .7}.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted{color: #905}.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted{color: #690}.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string{color: #a67f59;background: hsla(0, 0%, 100%, .5)}.token.atrule,.token.attr-value,.token.keyword{color: #07a}.token.function{color: #DD4A68}.token.regex,.token.important,.token.variable{color: #e90}.token.important,.token.bold{font-weight: bold}.token.italic{font-style: italic}.token.entity{cursor: help}';
        // Custom css to fix some layout problems because of the insertion of <code> element
        style.innerHTML += 'pre>code{border-radius:initial;display:initial;line-height:initial;margin-left:initial;overflow-y:initial;padding:initial}code,tt{background:initial;border:initial}.refract-container .deletion pre.source {background-color: #fff1f2 !important;} .refract-container .addition pre.source { background-color: #e8ffe8;}';
        head.appendChild(style);
    }

    /**
     * Waits some intervals until a specific element is displayed.
     * @return {Promise} Returns a promise that is fulfilled when it finds a specific element.
     */
    function waitForRender(selector) {
        return new Promise(resolve => {
            const intervalId = setInterval(() => {
                const element = document.querySelector(selector);
                if (!element) {
                    return;
                }

                // If element is rendered, stop the interval and continue.
                clearInterval(intervalId);
                resolve();
            }, INTERVAL);
        });
    }

    function highlightCode() {
        bindRehighlightHandler();
        prepareLanguageClasses();
        addCodeTagToElements('.source');
        Prism.highlightAll();
    }

    /**
     * Set a listener to the "Overview" tab in the pull request screen so that
     * when switching back to the overview tab, the code will get highlighted again.
     */
    function bindRehighlightHandler() {
        const menuDiff = document.getElementById('pr-menu-diff');
        menuDiff.addEventListener('click', () => {
            waitForRender('.diff-container').then(() => {
                highlightCode();
            });
        });
    }

    /**
     * Adds language-xxxx definition class to div ancestor element thus Prism
     * assumes that the definition is inherited.
     */
    function prepareLanguageClasses() {
        const containers = Array.from(document.getElementsByClassName('diff-container'));
        containers.forEach(container => {
            const parent = container.parentElement;
            const filePath = parent.getAttribute('data-path');

            // Faster way to get the file extension.
            const fileExtension = `.${filePath.slice((filePath.lastIndexOf(".") - 1 >>> 0) + 2)}`;
            container.className += ` ${languages[fileExtension] || ''}`;
        });
    }

    /**
     * Surrounds each selector (always an element with 'source' class) with a <code> element.
     * That's the way Prism expects your code to be: <pre><code>{code_here}</code></pre>
     * @param {string} elementsSelector The selector, eg. '.source'
     * @return {Array} Returns a array with the created <code> elements.
     */
    function addCodeTagToElements(elementsSelector) {
        const lines = Array.from(document.querySelectorAll(elementsSelector));
        const codeTags = [];
        let size = lines.length;
        while (size--) {
            const codeEl = document.createElement('code');
            const line = lines[size];
            codeEl.innerText = line.textContent;
            line.textContent = '';
            line.appendChild(codeEl);
            codeTags.push(codeEl);
        }
        return codeTags;
    }
});
