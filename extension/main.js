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

        // faster way of getting the file extension
        const fileExtension = `.${dataPath.slice((dataPath.lastIndexOf(".") - 1 >>> 0) + 2)}`;
        container.className += ` ${refinedBitbucket.languages[fileExtension] || ''}`;
    }
})();
