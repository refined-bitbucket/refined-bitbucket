const pubsub = require('../src/pubsub');
const waitForRender = require('../src/wait-for-render');

module.exports = (function events() {
    const overviewTab = document.getElementById('pr-menu-diff');
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(() => {
            pubsub.publish('highlight');
        });
    });

    let codeContainers = null;

    return {
        init
    };

    function init() {
        waitForRender('.ellipsis').then(() => {
            codeContainers = Array.from(document.getElementsByClassName('refract-content-container'));
            bindEvents();
        });
    }

    function bindEvents() {
        // in the commit screen the overview tab will not exist
        if (overviewTab) {
            overviewTab.addEventListener('click', triggerHighlight);
        }
        codeContainers.forEach(container => {
            mutationObserver.observe(container, {childList: true});
        });
    }

    function triggerHighlight() {
        pubsub.publish('highlight-all');
    }
})();
