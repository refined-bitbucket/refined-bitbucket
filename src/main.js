/* global Mousetrap */

const storageHelper = require('./storage-helper');

const syntaxHighlight = require('./syntax-highlight/syntax-highlight');
const events = require('./events');
const occurrencesHighlighter = require('./occurrences-highlighter/occurrences-highlighter');
const keymap = require('./keymap/keymap');
const collapseDiff = require('./collapse-diff/collapse-diff');

storageHelper.getConfig().then(config => {
    events.init();

    if (config.highlightSyntax) {
        syntaxHighlight.init();
    }

    if (config.highlightOcurrences) {
        occurrencesHighlighter.init();
    }

    keymap.init(Mousetrap);

    collapseDiff.init();
});
