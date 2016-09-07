const pubsub = require('./pubsub');
const waitForRender = require('./wait-for-render');

module.exports = (function events() {
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
        bindOverviewClick();
        bindSideDiffButtons();

        observeCodeContainers(codeContainers);
    }
})();

function bindOverviewClick() {
    const overviewTab = document.getElementById('pr-menu-diff');
    // in the commit screen the overview tab will not exist
    if (overviewTab) {
        overviewTab.addEventListener('click', triggerHighlight);
    }
}

function bindSideDiffButtons() {
    const sideBySideButtons = $('button[href*="side-by-side"]').toArray();
    sideBySideButtons.forEach(button => button.addEventListener('click', initalizeSideDiffHighlighter));
}

function initalizeSideDiffHighlighter(mouseEventArgs) {
    const button = mouseEventArgs.currentTarget;
    if (button.attributes.href && button.attributes.href.nodeValue) {
        const unifiedDiffContainer = button.closest('.bb-udiff');
        if (unifiedDiffContainer) {
            pubsub.publish('highlight-side-diff', {container: unifiedDiffContainer, diffNode: button.attributes.href.nodeValue});
        }
    }
}

function triggerHighlight() {
    pubsub.publish('highlight-all');
}

function observeCodeContainers(containers) {
    const codeContainerObserver = new MutationObserver(mutations => {
        mutations.forEach(() => {
            pubsub.publish('highlight');
        });
    });

    containers.forEach(container => {
        codeContainerObserver.observe(container, {childList: true});
    });
}
