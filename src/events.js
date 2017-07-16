const pubsub = require('./pubsub');
const waitForRender = require('./wait-for-render');
const {getFilepathFromElement} = require('./syntax-highlight/source-handler');

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
        bindTryAgainButtons();

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
    const sideBySideButtons = Array.from(document.querySelectorAll('button[href*="side-by-side"]'));
    sideBySideButtons.forEach(button => button.addEventListener('click', initalizeSideDiffHighlighter));
}

function bindTryAgainButtons() {
    const bind = buttons => buttons.forEach(button => button.addEventListener('click', initializeTryAgainHighlighter));

    const tryAgainButtonSelector = 'a.try-again';
    waitForRender('.bb-patch').then(el => {
        const tryAgainButtons = Array.from(el.querySelectorAll(tryAgainButtonSelector));
        bind(tryAgainButtons);

        new MutationObserver(ms => {
            for (let index = 0; index < ms.length; index++) {
                const mutation = ms[index];
                for (let j = 0; j < mutation.addedNodes.length; j++) {
                    const addedNode = mutation.addedNodes[j];
                    const addedTryAgainButtons = Array.from(addedNode.querySelectorAll(tryAgainButtonSelector));
                    bind(addedTryAgainButtons);
                }
            }
        }).observe(el, {childList: true});
    });
}

function triggerHighlight() {
    pubsub.publish('highlight-all');
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

function initializeTryAgainHighlighter(mouseEventArgs) {
    const button = mouseEventArgs.currentTarget;
    const tryAgainMessageContainer = button.closest('section');
    const dataIdentifier = getFilepathFromElement(tryAgainMessageContainer);
    waitForRender(`section[data-identifier*="${dataIdentifier}"] .refract-content-container`).then(codeContainer => {
        observeCodeContainers([codeContainer]);
        pubsub.publish('highlight-try-again', {container: codeContainer.closest('section')});
    });
}

function observeCodeContainers(containers) {
    const codeContainerObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            pubsub.publish('highlight', {container: mutation.target});
        });
    });

    containers.forEach(container => {
        codeContainerObserver.observe(container, {childList: true});
    });
}
