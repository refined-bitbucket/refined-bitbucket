/* global Prism */

'use strict';

const waitForRender = require('../wait-for-render');
const pubsub = require('../pubsub');
const debounce = require('../debounce');
const sourceHandler = require('./source-handler');

let debouncedSideDiffHandler = null;

module.exports = (function syntaxHighlight() {
    pubsub.subscribe('highlight-all', highlightAll);
    pubsub.subscribe('highlight', highlightSome);
    pubsub.subscribe('highlight-side-diff', highlightSideDiff);
    pubsub.subscribe('highlight-side-diff', listenForSideDiffScroll);
    pubsub.subscribe('highlight-try-again', highlightTryAgain);

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
        Promise.all([classifyDiffContainers(), transformPreElements(document)])
        .then(() => Prism.highlightAll());
    }

    function listenForSideDiffScroll(args) {
        waitForRender('div.aperture-pane-scroller').then(() => {
            const scrollers = Array.from(document.querySelectorAll('div.aperture-pane-scroller'));

            if (debouncedSideDiffHandler) {
                scrollers.forEach(scroller => {
                    scroller.removeEventListener('scroll', debouncedSideDiffHandler);
                });
            }

            debouncedSideDiffHandler = debounce(() => highlightSideDiff(args), 250);

            scrollers.forEach(scroller => {
                scroller.addEventListener('scroll', debouncedSideDiffHandler);
            });
        });
    }

    function highlightSideDiff(args) {
        waitForRender(args.diffNode).then(() => {
            const container = document.querySelector(args.diffNode);

            const languageClass = sourceHandler.getClassBasedOnExtension(args.container) || '';
            container.classList.add(languageClass);

            waitForRender(`${args.diffNode}  pre`).then(() => {
                const sourceLines = Array.from(document.querySelectorAll(`${args.diffNode} pre:not([class*=language])`));

                sourceLines.forEach(line => {
                    const codeElement = sourceHandler.getCodeElementFromPre(line);
                    line.innerHTML = codeElement.outerHTML;
                    line.classList.add('source');
                    Prism.highlightElement(line);
                });
            });
        });
    }

    function highlightSome({container}) {
        transformPreElements(container).then(sourceLines => {
            sourceLines.forEach(line => Prism.highlightElement(line));
        });
    }

    function highlightTryAgain({container}) {
        const languageClass = sourceHandler.getClassBasedOnExtension(container);
        container.classList.add(languageClass);
        highlightSome({container});
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

    function transformPreElements(container) {
        return waitForRender('.source').then(() => {
            const sourceLines = Array.from(container.querySelectorAll('.source:not([class*=language])'));

            sourceLines.forEach(line => {
                if (!line.childElementCount) {
                    const codeElement = sourceHandler.getCodeElementFromPre(line);
                    line.innerHTML = codeElement.outerHTML;
                }
            });

            return Promise.resolve(sourceLines);
        });
    }
})();
