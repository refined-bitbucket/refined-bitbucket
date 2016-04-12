'use strict';

(() => {
    if (!Prism) {
        throw new Error('Prism.js must be loaded in order to highlight the syntax.');
    }

    const refinedBitbucket = document.refinedBitbucket || {};

    const intervalId = setInterval(() => {
        const diffContainers = Array.from(document.getElementsByClassName('diff-container'));
        if (!diffContainers.length) {
            return;
        }

        refinedBitbucket.prepareDiffPage();

        // if the diff containers have already been rendered, stop the interval
        // and continue the program
        clearInterval(intervalId);

        diffContainers.forEach(container => {
            preparePrismClassNames(container);
        });

        Prism.highlightAll();
    }, 50);

    function preparePrismClassNames(container) {
        const parent = container.parentElement;
        const dataPath = parent.getAttribute('data-path');

        if (dataPath.endsWith('.jsp')) {
            container.className += ' language-java';
        } else if (dataPath.endsWith('.java')) {
            container.className += ' language-java';
        } else if (dataPath.endsWith('.xml')) {
            container.className += ' language-markup';
        } else if (dataPath.endsWith('.js')) {
            container.className += ' language-javascript';
        } else if (dataPath.endsWith('.css')) {
            container.className += ' language-css';
        } else if (dataPath.endsWith('.html')) {
            container.className += ' language-markup';
        }
    }
})();
