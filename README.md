[![build status](https://travis-ci.org/refined-bitbucket/refined-bitbucket.svg?branch=test-it)](https://travis-ci.org/refined-bitbucket/refined-bitbucket) <sup>-</sup> [![downloads](https://img.shields.io/chrome-web-store/d/afppminkfnfngihdocacbgeajbbdklkf.svg)](https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon)

# refined-bitbucket
We all know BitBucket lacks some features that we have in other platforms like GitHub, GitLab and others. Originally inspired on Sindre Sorhus' [Refined Github](https://github.com/sindresorhus/refined-github) extension, _refined-bitbucket_ is born as a collaborative project by a few developers to improve upon those holes, and even add some additional functionality that will enhance the overall user experience.

## Current features
- Improves syntax highlight for pull requests. [See the full list of enabled languages](https://github.com/refined-bitbucket/refined-bitbucket/blob/dev/src/syntax-highlight/language-ext.js). Missing any language? [Let me know](https://github.com/refined-bitbucket/refined-bitbucket/issues) or submit a pull request!
- Double click on a word to highlight all occurrences.
- ~~Block pull request merging without a minimum number of approvals (defaults to 2 minimum approvals).~~ Removed. [Implemented natively by Bitbucket with "merge checks"](https://confluence.atlassian.com/bitbucketserver/checks-for-merging-pull-requests-776640039.html)
- Key binding feature, which allows for quicker navigation through pull requests.
- Button to collapse diffs in Pull Request view.
- Autocollapse. Add file patterns in the Options page that you would like the extension to collapse automatically when the Pull Request.
- Pullrequest Ignore. Add diff filename patterns in the Options page that you would like the extension to completely remove automatically when the Pull Request loads.
- Button to load all failed diffs in Pull Request view.
- Choose a default merge strategy for your pull requests.

## Some images

<table>
	<tr>
		<th width="50%">
			Syntax highlighting
		</th>
	</tr>
	<tr>
		<td>
			<img src="https://user-images.githubusercontent.com/7514993/32377709-e708312a-c07e-11e7-87a0-05840deb0c48.PNG" alt="syntax-hl1">
			<img src="https://user-images.githubusercontent.com/7514993/32377721-ef7c6b0a-c07e-11e7-9f3c-b13b2bdce8ab.PNG" alt="syntax-hl2">
		</td>
	</tr>
</table>

<table>
	<tr>
		<th width="50%">
			The Options page.<br>
		</th>
		<th width="50%">
			<em>pullrequest-ignore</em> and <em>load-all-diffs</em>
		</th>
	</tr>
	<tr>
		<td rowspan="2">
			<img src="https://user-images.githubusercontent.com/7514993/33744735-1f66115c-db89-11e7-804c-9739d3619c65.png" alt="options">
		</td>
		<td>
			<strong>pullrequest-ignore</strong><br>
			<img src="https://user-images.githubusercontent.com/7514993/32203543-36e1b012-bdba-11e7-8a26-4accd0e775b6.png" alt="pullrequest-ignore">
		</td>
	</tr>
	<tr>
		<td>
			<strong>load-all-diffs</strong><br>
			<img src="https://user-images.githubusercontent.com/7514993/32376684-da306e0c-c07b-11e7-81e6-bb9c42d21d2e.gif" alt="load-all-diffs">
		</td>
	</tr>
</table>

<table>
	<tr>
		<th width="50%">
			Collapse diff
		</th>
		<th width="50%">
			Occurrences highlighter
		</th>
	</tr>
	<tr>
		<td>
			<img src="https://user-images.githubusercontent.com/7514993/31857910-3938deb6-b6b8-11e7-8bac-f55242010a62.gif" alt="collapse-diff">
			<img src="https://user-images.githubusercontent.com/7514993/34419580-06327498-ebdb-11e7-90cc-41144d4bd671.gif" alt="bottom-collapse">
		</td>
		<td>
			<img src="https://user-images.githubusercontent.com/7514993/30448047-a815dd4a-995b-11e7-98e5-48664c2bd587.gif" alt="occurrences-highlighter">
		</td>
	</tr>
</table>

## Installing
_refined-bitbucket_ is [available on the Google Chrome Web Store][chrome-install].

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

## Can I use this on Bitbucket Server?

Sadly, no :(. Although Bitbucket Server and Bitbucket Cloud share a similar name, both are actually two completely different products. [Read this comment for a more detailed explanation](https://github.com/refined-bitbucket/refined-bitbucket/issues/39#issuecomment-338455398).

## Compiling & Contributing

Contributions are very appreciated! Even if you can't contribute with a pull request, if you stumble upon any weird behavior or bugs, let us know with an issue!

If you want to run a development version of the extension, clone the repo and run the following commands:

```bash
npm install
npm run watch
```

This will watch any changes in the `src` folder and compile them to the `extension` folder. To test in Chrome, activate the Developer mode in `chrome://extensions`, click "Load unpacked extension..." and browse to that folder.

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
