const pubsub = require('../src/pubsub');
const waitForRender = require('../src/wait-for-render');

const events = {
    init() {
        this.overviewTab = document.getElementById('pr-menu-diff');

        this.mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(() => {
                pubsub.publish('highlight-all');
            });
        });

        waitForRender('.ellipsis').then(() => {
            this.codeContainers = Array.from(document.getElementsByClassName('refract-content-container'));
            this.bindEvents();
        });
    },
    bindEvents() {
        this.overviewTab.addEventListener('click', this.triggerHighlight);
        this.codeContainers.forEach(container => {
            this.mutationObserver.observe(container, {childList: true});
        });
    },
    triggerHighlight() {
        setTimeout(() => {
            pubsub.publish('highlight-all');
        }, 300);
    }
};

events.init();
