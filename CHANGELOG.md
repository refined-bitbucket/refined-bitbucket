# Next Version

### Features:

* **Autocollapse**: Add option to automatically collapse deleted files in a pull request, closes [issue #96](https://github.com/refined-bitbucket/refined-bitbucket/issues/96), [pull request #101](https://github.com/refined-bitbucket/refined-bitbucket/pull/101).

### Development:

* Added CSS Loader to the Webpack config, which now makes it possible to directly import `.css` files in JavaScript modules, [pull request #104](https://github.com/refined-bitbucket/refined-bitbucket/pull/104).

# 3.3.0 (2018-01-09)

With the release of [Firefox Quantum](https://www.mozilla.org/en-US/firefox/) there is a renewed interest for this browser in the community, so we have decided to officially publish the extension as an [Add-on for Firefox](https://addons.mozilla.org/en-US/firefox/addon/refined-bitbucket-/)! I'd like to thank [@Ivan0xFF](https://github.com/Ivan0xFF) with [#40](https://github.com/refined-bitbucket/refined-bitbucket/pull/40) and [@awendland](https://github.com/awendland) with [#89](https://github.com/refined-bitbucket/refined-bitbucket/issues/89) for getting the wheel moving in this direction.

If you decide to switch to Firefox and use this extension, let me know of any compatibily issues if they arise! Also, if you find it useful, don't forget to rate it so that other users can find it!

### Features:

* **Collapse-diff**: A button to toggle the diff text was added at the bottom of the diff. Additionally, clicking this or the previous button at the top will now scroll the diff into view at the top of the page, closes [issue #88](https://github.com/refined-bitbucket/refined-bitbucket/issues/88), [pull request #95](https://github.com/refined-bitbucket/refined-bitbucket/pull/95).

### Improvements:

* **Collapse-diff**: Test suite for the feature, [pull request #94](https://github.com/refined-bitbucket/refined-bitbucket/pull/94).
* **Syntax-highlighting**: Fix for an issue where the styling necessary for syntax highlighting pull requests was interfering with some of Bitbucket's own styling, which caused inline code in comments to have a white background instead of their original gray background, closes [issue #74](https://github.com/refined-bitbucket/refined-bitbucket/issues/74) and [issue #93](https://github.com/refined-bitbucket/refined-bitbucket/issues/93), [pull request #99](https://github.com/refined-bitbucket/refined-bitbucket/pull/99).

### Language support:

* Replaced `.js` syntax-highlighting styles from pure Javascript (`language-javascript`) to JSX (`language-jsx`). Highlighting should be exactly the same, except for JSX markup which will now be properly highlighted, [pull request #100](https://github.com/refined-bitbucket/refined-bitbucket/pull/100).

# 3.2.0 (2017-12-13)

The highlight of this release is the feature "Default merge strategy". [As you can see, this has been a popular request by Bitbucket users for almost a year now](https://bitbucket.org/site/master/issues/13895/default-merge-strategy), but now I hope this can serve as a solution for most of the people who voted on that official issue.

### Features:

* **Default-merge-strategy**: Choose either "Merge commit" or "Squash" as the default merge strategy for pull requests in the Options page, closes [issue #90](https://github.com/refined-bitbucket/refined-bitbucket/issues/90), [pull request #91](https://github.com/refined-bitbucket/refined-bitbucket/pull/91).

### Improvements:

* **General**: Added checkboxes in the Options page to allow the user to opt-in / opt-out of each feature of the extension individually, closes [issue #86](https://github.com/refined-bitbucket/refined-bitbucket/issues/86), [pull request #87](https://github.com/refined-bitbucket/refined-bitbucket/pull/87).

### Bug fixes

* **Collapse-diff**: When using the Bitbucket Diff Tree extension, the "Toggle diff text" button (collapse diff) is not duplicated anymore each time the "Compact/Uncompact empty folder" button is clicked, closes [issue #84](https://github.com/refined-bitbucket/refined-bitbucket/issues/84), [pull request #85](https://github.com/refined-bitbucket/refined-bitbucket/pull/85).

# 3.1.0 (2017-11-20)

### Features

* **Ignore-whitespace**: Open pull request links with "Ignore whitespace" option enabled by default when entering pull requests from the pull request list page, closes [issue #78](https://github.com/refined-bitbucket/refined-bitbucket/issues/78), [pull request #81](https://github.com/refined-bitbucket/refined-bitbucket/pull/81).

### Improvements

* **Syntax-highlighting**: Re-implementation of the syntax-highlighting feature now using MutationObservers so that every diff loaded dynamically into the page is also highlighted, closes [issue #76](https://github.com/refined-bitbucket/refined-bitbucket/issues/76), [pull request #77](https://github.com/refined-bitbucket/refined-bitbucket/pull/77).

### Bug fixes

* **General**: Files don't have a yellow background highlighting in source code view, closes [issue #75](https://github.com/refined-bitbucket/refined-bitbucket/issues/75), [pull request #83](https://github.com/refined-bitbucket/refined-bitbucket/pull/83).

### Language support

* Added Julia language support for files with extension `.jl`, closes [issue #79](https://github.com/refined-bitbucket/refined-bitbucket/issues/79), [pull request #80](https://github.com/refined-bitbucket/refined-bitbucket/pull/80).

# 3.0.0 (2017-11-03)

After a long time of active development being dormant on this project, we are coming back with what I consider some great new features and improvements. Because of this, we are bumping to a new major release, v3.0.0! Check out the updated README to see some screenshots and gifs

The development environment for the extension was greatly improved as well, with changes that will make adding and testing new features a lot easier. We are hoping that future releases can come by quicker from now on.

If you stumble upon any weird behavior or bugs, please report an issue, I'll be be more than happy to tackle them as soon as I can. If you can have any quick question, you can hit me up on Twitter [@reyronald](http://www.twitter.com/reyronald).

### Features

* **Collapse-Diff**: Added button to collapse diffs in the Pull Request view. [Pull request 60](https://github.com/refined-bitbucket/refined-bitbucket/pull/60) and [pull request 67](https://github.com/refined-bitbucket/refined-bitbucket/pull/67).
* **Autocollapse**: Add file patterns in the Options page that you would like the extension to collapse automatically when the Pull Request. [Pull request 68](https://github.com/refined-bitbucket/refined-bitbucket/pull/68).
* **Pullrequest-ignore**: Add diff filename patterns in the Options page that you would like the extension to completely remove automatically when the Pull Request loads. [Pull request 70](https://github.com/refined-bitbucket/refined-bitbucket/pull/70).
* **Load-all-diffs**: Add button to load all failed diffs in Pull Request view. [Pull request 71](https://github.com/refined-bitbucket/refined-bitbucket/pull/71).

### Improvements

* **Merge-approvals**: Merge approvals feature removed. No longer necessary since it is [now implemented natively by Bitbucket with "merge checks"](https://confluence.atlassian.com/bitbucketserver/checks-for-merging-pull-requests-776640039.html), closes [issue 51](https://github.com/refined-bitbucket/refined-bitbucket/issues/51) and [issue 32](https://github.com/refined-bitbucket/refined-bitbucket/issues/32), [pull request 61](https://github.com/refined-bitbucket/refined-bitbucket/pull/61).
* **Occurrence-Highlighter**: Now when double-clicking whitespace/indentation in diffs, no highlighting occurs, closes [issue 59](https://github.com/refined-bitbucket/refined-bitbucket/issues/59), [pull request 62](https://github.com/refined-bitbucket/refined-bitbucket/pull/62)
* **Development**: _browserify_ build and and _tape_ test suite were replaced with _webpack_ & _babel_ and _ava_. Since now we are using _babel_ transpilation, the latest features of ES that it supports can be used. Also a _watch_ mode is available! [Pull request 65](https://github.com/refined-bitbucket/refined-bitbucket/pull/65).

### Bug fixes

* **Occurrence-Highlighter**: Double-clicking an already highlighted word doesn't remove it, closes [issue 64](https://github.com/refined-bitbucket/refined-bitbucket/issues/64), [pull request 69](https://github.com/refined-bitbucket/refined-bitbucket/pull/69).

# 2.6.4 (2017-10-16)

### Bug fixes

* **Occurrence-Highlighter**: When double-clicking a word that exists multiple times in the same HTML node, the selection remains in the clicked word, closes [issue #57](https://github.com/refined-bitbucket/refined-bitbucket/issues/57), [pull request 58](https://github.com/refined-bitbucket/refined-bitbucket/pull/58).

# 2.6.3 (2017-10-15)

### Bug fixes

* **Occurrence-Highlighter**: Now the selection is maintained when highlighting word occurrences when creating comments and tasks, closes [issue #55](https://github.com/refined-bitbucket/refined-bitbucket/issues/55), [pull request 56](https://github.com/refined-bitbucket/refined-bitbucket/pull/56).


# 2.6.2 (2017-10-12)

### Bug fixes

* **Occurrence-Highlighter**: Now the selection is maintained when highlighting word occurrences inside comments and tasks, closes [issue #52](https://github.com/refined-bitbucket/refined-bitbucket/issues/52), [pull request 53](https://github.com/refined-bitbucket/refined-bitbucket/pull/53).

# 2.6.1 (2017-09-27)

### Bug fixes

* **Occurrence-Highlighter**: Now the selection is maintained when highlighting word occurrences, closes [issue #38](https://github.com/refined-bitbucket/refined-bitbucket/issues/38), [pull request 50](https://github.com/refined-bitbucket/refined-bitbucket/pull/50).

### Language support

* Added C++ language support for files with extension `.cc`
* Added JSX language support for VueJS files with extension `.vue`
* Added Kotlin language support for files with extension `.kt`

# 2.5.1 (2017-07-19)

No changelog until this version.
