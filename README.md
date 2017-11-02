[![build status](https://travis-ci.org/refined-bitbucket/refined-bitbucket.svg?branch=test-it)](https://travis-ci.org/refined-bitbucket/refined-bitbucket) <sup>-</sup> [![downloads](https://img.shields.io/chrome-web-store/d/afppminkfnfngihdocacbgeajbbdklkf.svg)](https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon)

# refined-bitbucket
We all know BitBucket lacks some features that we have in GitHub, GitLab etc.
Based on Sindre Sorhus' [Refined Github](https://github.com/sindresorhus/refined-github)
extension I had the idea of improving BitBucket's user interface.
In fact, [Rodrigo Proença](https://github.com/rproenca) did most of the initial code and I just created the extension
and made a few improvements. Kudos!

## Current features
- Improves syntax highlight for pull requests. Enabled languages:
  - Markup, C-like languages, Go, Groovy, Bash, Handlebars, JSON, Dart, Elixir, Erlang, Markdown, Python, React JSX, 
  Ruby, PHP, Scala, Less, Sass, Swift, YAML, etc. [See the full list](https://github.com/refined-bitbucket/refined-bitbucket/blob/dev/src/syntax-highlight/language-ext.js). Missing any 
  language? [Let me know](https://github.com/refined-bitbucket/refined-bitbucket/issues) or submit a pull request!
- Double click on a word to highlight all occurrences.
- ~~Block pull request merging without a minimum number of approvals (defaults to 2 minimum approvals).~~ Removed. [Implemented natively by Bitbucket with "merge checks"](https://confluence.atlassian.com/bitbucketserver/checks-for-merging-pull-requests-776640039.html)
- Key binding feature, which allows for quicker navigation through pull requests.
- Button to collapse diffs in Pull Request view.
- Autocollapse. Add file patterns in the Options page that you would like the extension to collapse automatically when the Pull Request.
- Pullrequest Ignore. Add diff filename patterns in the Options page that you would like the extension to completely remove automatically when the Pull Request loads.
- Button to load all failed diffs in Pull Request view.

## Installing
Refined Bitbucket is [available on the Google Chrome Web Store][chrome-install].

## Default Key Mapping

The following are the default key mappings

#### Tab Selection
![bitbucket pull request tabs][tab-image]

Key | Action
--- | ---
<kbd>1</kbd> | Selects the **Overview** tab
<kbd>2</kbd> | Selects the **Commits** tab
<kbd>3</kbd> | Selects the **Activity** tab

#### Page Navigation and Scrolling

*Upper case letters mean that you need to press shift and the letter*

Key | Action
--- | ---
<kbd>N</kbd> (Shift+n) | Scrolls to the **N**ext comment on the page.
<kbd>P</kbd> (Shift+p) | Scrolls to the **P**revious comment on the page.
<kbd>g</kbd> <kbd>g</kbd> | Scrolls to the top of the page
<kbd>G</kbd> (Shift+g) | Scrolls to the bottom of the page

## Compiling & Contributing

Contributions are very appreciated!

There are a few dependencies required to compile the plugin. To install them, run:

```bash
npm install
```

Then you'll just need to run:

```bash
npm run watch
```

This will watch any changes in the `src` folder and compile them to the `extension` folder.
To test in Chrome, activate the Developer mode in `chrome://extensions`, click "Load unpacked extension..." and select that folder.

If you're new to Chrome extension development, take some time to read Google's [documentation on extensions](https://developer.chrome.com/extensions).

#### Integration

There is a test suite included. Before sending a pull request please make
sure all tests are passing by running:

```bash
npm test
```

## License
MIT © [refined-bitbucket](https://github.com/refined-bitbucket)

[chrome-install]: https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon
[browserify]: http://browserify.org/
[tab-image]: https://cloud.githubusercontent.com/assets/755669/18594922/1c74c184-7bf7-11e6-887d-859fb6206c65.png
