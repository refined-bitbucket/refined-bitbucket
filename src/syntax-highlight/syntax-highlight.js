/* global Prism */

'use strict';

const waitForRender = require('../wait-for-render');
const pubsub = require('../pubsub');

const sourceHandler = require('./source-handler');

module.exports = (function syntaxHighlight() {
    pubsub.subscribe('highlight-all', highlightAll);
    pubsub.subscribe('highlight', highlightSome);

    return {
        init() {
            insertStyles();
            highlightAll();
        }
    };

    function insertStyles() {
        let head = document.getElementsByTagName('head')[0];
        let lastHeadElement = head.lastChild;
        let style = document.createElement('style');
        const styleArray = [];
        style.type = 'text/css';
        // Prism css
        styleArray.push('.token.comment,.token.prolog,.token.doctype,.token.cdata{color: slategray}.token.punctuation{color: #999}.namespace{opacity: .7}.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted{color: #905}.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted{color: #690}.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string{color: #a67f59;background: hsla(0, 0%, 100%, .5)}.token.atrule,.token.attr-value,.token.keyword{color: #07a}.token.function{color: #DD4A68}.token.regex,.token.important,.token.variable{color: #e90}.token.important,.token.bold{font-weight: bold}.token.italic{font-style: italic}.token.entity{cursor: help}');
        // Custom css to fix some layout problems because of the insertion of <code> element
        styleArray.push('pre>code{border-radius:initial;display:initial;line-height:initial;margin-left:initial;overflow-y:initial;padding:initial}code,tt{background:initial;border:initial}.refract-container .deletion pre.source {background-color: #fff1f2 !important;} .refract-container .addition pre.source { background-color: #e8ffe8;}');
        style.innerHTML = styleArray.join('');
        head.insertBefore(style, lastHeadElement);
        head = null;
        lastHeadElement = null;
        style = null;
    }

    function highlightAll() {
        Promise.all([classifyDiffContainers(), transformPreElements()])
        .then(() => Prism.highlightAll());
    }

    function highlightSome() {
        transformPreElements().then(sourceLines => {
            sourceLines.forEach(line => Prism.highlightElement(line));
        });
    }

    function classifyDiffContainers() {
        return waitForRender('.bb-udiff').then(() => {
            const containers = Array.from(document.querySelectorAll('.bb-udiff:not([class*=language])'));

            containers.forEach(container => {
                const containerClass = container.getAttribute('class');
                const languageClass = sourceHandler.getClassBasedOnExtension(container) || '';
                if (containerClass.indexOf(languageClass) === -1) {
                    container.setAttribute('class', `${containerClass} ${languageClass}`);
                }
            });

            return Promise.resolve();
        });
    }

    function transformPreElements() {
        return waitForRender('.source').then(() => {
            const sourceLines = Array.from(document.querySelectorAll('.source:not([class*=language])'));

            sourceLines.forEach(line => {
                const codeElement = sourceHandler.getCodeElementFromPre(line);
                line.innerHTML = codeElement.outerHTML;
            });

            return Promise.resolve(sourceLines);
        });
    }
})();
