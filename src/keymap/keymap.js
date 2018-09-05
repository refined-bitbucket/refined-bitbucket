import elementReady from 'element-ready'

const Mousetrap = require('mousetrap')

/**
 * Adds useful keymappings to pull requests on bitbucket.org
 * @module keymap
 */
const PrKeyMap = (function() {
    'use strict'

    /**
     * The default keymap for key binds a.k.a. shortcut keys.
     */
    const DEFAULT_KEYMAP = {
        tabOverview: '1',
        tabComments: '2',
        tabActivity: '3',

        scrollNextComment: 'N',
        scrollPreviousComment: 'P',
        scrollPageTop: 'g g',
        scrollPageBottom: 'G',
    }

    const keymap = {}

    const ids = {
        overview: '#pr-menu-diff',
        commits: '#pr-menu-commits',
        activity: '#pr-menu-activity',
    }

    const self = {}

    self.commentSelector = '.iterable-item a.author'
    self.iterableItemSelector = '.iterable-item'
    self.comments = []

    self.currentComment = 0

    /**
     * Switches to a tab, if there is a selector available for that tab.
     * @param {String} tabName Tabname
     * @return {undefined}
     */
    self.switchTo = function(tabName) {
        if (tabName in ids) {
            const element = document.querySelector(ids[tabName])
            element.click()
        }
    }

    /**
     * Sets focus to a particular comment.
     *
     * 'j' and 'k' by default will go down and up (respectively) through iterable
     * elements on the page (file list, comments, patches).
     * This provides compatibility with BitBucket's built in key binds
     * so that we don't break the existing functionality of the 'j' and 'k' keys.
     *
     * @param {HTMLElement} comment Comment node
     * @return {undefined}
     */
    self.focusComment = function(comment) {
        $(self.iterableItemSelector).removeClass('focused')
        $(comment).addClass('focused')
        comment.scrollIntoView()
    }

    /**
     * Initializes array of comments elements to cycle through using
     * {@link #scrollToNextComment} or {@link #scrollToPreviousComment}.
     *
     * Waits for `selector` to be available before initializing comments.
     *
     * @param {String} selector waits for this selector to become available
     * before initializing comments. If empty, uses the default `.bb-patch`
     * selector.
     */
    self.initComments = function(selector = '.bb-patch') {
        elementReady(selector).then(() => {
            self.comments = document.querySelectorAll(self.commentSelector)
        })
    }

    /**
     * Scrolls the browser window to the next comment on the PR diff.
     *
     * If scrolling to the next comment from the last comment, this will loop back
     * to the top-most (first) comment on the page.
     *
     */
    self.scrollToNextComment = function() {
        if (self.comments) {
            $(self.comments[self.currentComment]).removeClass('focused')
            self.currentComment++
            if (self.currentComment >= self.comments.length) {
                self.currentComment = 0
            }

            const comment =
                self.comments[self.currentComment].parentElement.parentElement
            self.focusComment(comment)
        }
    }

    /**
     * Scrolls the browser window to the previous comment on the PR diff.
     *
     * If scrolling to previous comment from the top commit, this will loop back to the
     * bottom-most (last) comment on the page.
     */
    self.scrollToPreviousComment = function() {
        if (self.comments) {
            self.currentComment--
            if (self.currentComment < 0) {
                self.currentComment = self.comments.length - 1
            }

            const comment =
                self.comments[self.currentComment].parentElement.parentElement
            self.focusComment(comment)
        }
    }

    /**
     * Initializes keybinds.
     *
     * @param {Object} keyboard the keyboard library to use to bind keys (usually Mousetrap).
     * @param {Object} userKeymap the user-defined keymap to override default keybindings.
     */
    self.init = function(keyboard, userKeymap) {
        Object.assign(keymap, DEFAULT_KEYMAP)
        if (userKeymap) {
            // If provided, copy a user-preferred keymap to the main keymap.
            Object.assign(keymap, userKeymap)
        }

        keyboard.reset()
        self.initComments()

        $(ids.overview).click(() => {
            self.initComments()
        })

        $(ids.activity).click(() => {
            self.initComments('header .summary')
        })

        keyboard.bind(keymap.tabOverview, event => {
            event.preventDefault()
            self.switchTo('overview')
        })

        keyboard.bind(keymap.tabComments, event => {
            event.preventDefault()
            self.switchTo('commits')
        })

        keyboard.bind(keymap.tabActivity, event => {
            event.preventDefault()
            self.switchTo('activity')
        })

        keyboard.bind(keymap.scrollNextComment, event => {
            event.preventDefault()
            self.scrollToNextComment()
        })

        keyboard.bind(keymap.scrollPreviousComment, event => {
            event.preventDefault()
            self.scrollToPreviousComment()
        })

        keyboard.bind(keymap.scrollPageTop, event => {
            // Gg to scroll to top
            event.preventDefault()
            window.scrollTo(0, 0)
        })

        keyboard.bind(keymap.scrollPageBottom, event => {
            // Scroll to bottom
            event.preventDefault()
            window.scrollTo(0, document.body.scrollHeight)
        })
    }

    return self
})()

export function init() {
    PrKeyMap.init(Mousetrap)
}
