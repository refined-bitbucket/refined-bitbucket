/**
 * Adds useful keymappings to pull requests on bitbucket.org
 */

const waitForRender = require('../wait-for-render');

var PrKeyMap = (function($) {
    'use strict';

    var keymap = {
        tab_overview: '1',
        tab_commits: '2',
        tab_activity: '3',

        scroll_next_comment: 'N',
        scroll_previous_comment: 'P',
        scroll_page_top: 'g g',
        scroll_page_bottom: 'G'
    }

    var ids = {
        'overview': '#pr-menu-diff',
        'commits': '#pr-menu-commits',
        'activity': '#pr-menu-activity'
    };

    var self = {};

    self.commentSelector = '.iterable-item a.author';
    self.iterableItemSelector = '.iterable-item';
    self.comments = [];

    self.currentComment = 0;

    self.switchTo = function(tabName) {
        if (tabName in ids) {
            const element = document.querySelector(ids[tabName]);
            element.click();
        }
    };

    self.focusComment = function(comment) {
        $(self.iterableItemSelector).removeClass('focused');
        $(comment).addClass('focused');
        comment.scrollIntoView();
    };

    self.initComments = function() {
        if (self.comments.length === 0) {
            self.comments = document.querySelectorAll(self.commentSelector);
        }
    };

    self.scrollToNextComment = function() {
        self.initComments();

        if (self.comments) {
            $(self.comments[self.currentComment]).removeClass('focused');
            self.currentComment++;
            if (self.currentComment >= self.comments.length) self.currentComment = 0;

            var comment = self.comments[self.currentComment].parentElement.parentElement;
            self.focusComment(comment);
        }
    };

    self.scrollToPreviousComment = function() {
        self.initComments();

        if (self.comments) {
            self.currentComment--;
            if (self.currentComment < 0) self.currentComment = self.comments.length - 1;

            var comment = self.comments[self.currentComment].parentElement.parentElement;
            self.focusComment(comment);
        }
    };

    self.init = function(keyboard) {

        console.log('init');
        keyboard.reset();
        self.comments = document.querySelectorAll(self.commentSelector);

        keyboard.bind(keymap.tab_overview, function(event) {
            event.preventDefault();
            self.switchTo('overview');
        });

        keyboard.bind(keymap.tab_commits, function(event) {
            event.preventDefault();
            self.switchTo('commits');
        });

        keyboard.bind(keymap.tab_activity, function(event) {
            event.preventDefault();
            self.switchTo('activity');
        });

        waitForRender('.bb-patch').then(() => {
            //only bind next and previous comments when the diff patches have finished loading
            keyboard.bind(keymap.scroll_next_comment, function(event) {
                event.preventDefault();
                self.scrollToNextComment();
            });

            keyboard.bind(keymap.scroll_previous_comment, function(event) {
                event.preventDefault();
                self.scrollToPreviousComment();
            });
        });

        keyboard.bind(keymap.scroll_page_top, function(event) {
            //gg to scroll to top
            event.preventDefault();
            window.scrollTo(0, 0);
        });

        keyboard.bind(keymap.scroll_page_bottom, function(event) {
            //scroll to bottom
            window.scrollTo(0, document.body.scrollHeight);
        });
    };

    return self;

})(jQuery);

module.exports = (() => {
    return {
        init
    };

    function init(keyboard) {
        PrKeyMap.init(keyboard);
    }
})();