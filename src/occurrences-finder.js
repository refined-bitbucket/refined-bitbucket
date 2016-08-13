/* global window */
window.occurrencesHighlighter = (function () {
    function highlight() {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const codeContainer = findCodeContainer(selection);
        const codeLines = Array.from(codeContainer.querySelectorAll('code'));

        codeLines.forEach(line => {
            line.innerHTML = line.innerHTML.replace(new RegExp(`\\b${selectedText}\\b`, 'g'), `<span class='occ-highlight'>$&</span>`);
        });
    }

    function removeHighlight() {
        const highlighted = Array.from(document.getElementsByClassName('occ-highlight'));
        highlighted.forEach(el => {
            el.outerHTML = el.textContent;
        });
    }

    function findCodeContainer(selection) {
        let container = null;
        let node = selection.getRangeAt(0).startContainer.parentNode;
        while (container === null && node !== null) {
            if (node.className === 'refract-content-container') {
                container = node;
                break;
            }
            node = node.parentNode;
        }
        return container;
    }

    return {
        highlight,
        removeHighlight
    };
})();
