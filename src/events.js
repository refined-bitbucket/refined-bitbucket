const pubsub = require('../src/pubsub');

const events = {
    init() {
        this.overviewTab = document.getElementById('pr-menu-diff');
        this.bindEvents();
    },
    bindEvents() {
        this.overviewTab.addEventListener('click', this.handleOverviewClick);
    },
    handleOverviewClick() {
        pubsub.publish('highlight-all');
    }
};

events.init();
