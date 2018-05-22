[![build status](https://travis-ci.org/refined-bitbucket/refined-bitbucket.svg?branch=test-it)](https://travis-ci.org/refined-bitbucket/refined-bitbucket)
<sup>-</sup>
[![downloads](https://img.shields.io/chrome-web-store/d/afppminkfnfngihdocacbgeajbbdklkf.svg)](https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon)
<sup>-</sup>
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

![Refined BitBucket](./logo-full.svg)

We all know BitBucket lacks some features that we have in other platforms like GitHub, GitLab and others. Originally inspired on Sindre Sorhus' [Refined Github](https://github.com/sindresorhus/refined-github) extension, _refined-bitbucket_ is born as a collaborative project by a few developers to improve upon those holes, and even add some additional functionality that will enhance the overall user experience.

[Subscribe to this issue if you would like to receive e-mail notifications on updates](https://github.com/refined-bitbucket/refined-bitbucket/issues/182).

## Current features

*   Adds syntax highlighting for pull requests and commits. See the full list of enabled languages [here][prismjs-languages], and then [here][language-ext]. [Test them here](http://prismjs.com/test.html). Missing any language? [Let me know](https://github.com/refined-bitbucket/refined-bitbucket/issues) or submit a pull request!
*   Double click on a word to highlight all occurrences.
*   ~~Block pull request merging without a minimum number of approvals (defaults to 2 minimum approvals).~~ Removed. [Implemented natively by Bitbucket with "merge checks"](https://confluence.atlassian.com/bitbucketserver/checks-for-merging-pull-requests-776640039.html)
*   Key binding feature, which allows for quicker navigation through pull requests.
*   Button to collapse diffs in Pull Request and Commits view.
*   Autocollapse:
    *   Add filename patterns in the Options page that you would like the extension to collapse automatically when the pull request or commit loads.
    *   Deleted files are automatically collapsed.
*   Diff Ignore. Add filename patterns in the Options page that you would like the extension to completely remove when the pull request or commit loads.
*   Counters for open or active branches and pull requests in the sidebar navigation menu.
*   Button to load all failed diffs in pull request and commit view.
*   Adds 'Create Pull Request' link to the 'Compare branches and tags' page.
*   Choose a default merge strategy for your pull requests. [Also implemented natively by Bitbucket per project](https://bitbucket.org/site/master/issues/13895/default-merge-strategy#comment-45364593)
*   Check the "Close anchor branch" checkbox by default when creating or editing pull requests.
*   Add source branch, linkify branch names, and add creation date to each pull request row in pull request list.
*   Don't carry pluses and minuses to clipboard when copying diff's contents.
*   Badge with the number of commits of the current pull request next to the "Commits" tab.
*   Set custom tab indentation size of code (Bitbucket defaults to 8 spaces) when viewing commits/pull requests.
*   Insert "Comments" checkbox in diff header to toggle comments.
*   Insert "Copy filename to clipboard" button in diff header.
*   Include a `PULL_REQUEST_TEMPLATE.md` file in the default branch of the repository in one of the locations below, and the contents of that file template will replace the default pull request body inserted by Bitbucket when creating a new one.

    ```
    /PULL_REQUEST_TEMPLATE.md
    /docs/PULL_REQUEST_TEMPLATE.md
    /.github/PULL_REQUEST_TEMPLATE.md
    /.bitbucket/PULL_REQUEST_TEMPLATE.md
    ```

    Please note that the filename IS case sensitive (must be all caps),
    and MUST have the .md file extension. No other file extensions will be
    recognized. The file to be used will be the first to be found in one
    of these locations (from top to bottom).

    It's also possible to specify a URL for a raw Gist with the contents
    of the template in the options page, in case you don't want to include
    the file in your repository, e.g., https://gist.githubusercontent.com/anonymous/8054a3ee32f7cf1a5975e3fd52b3c5f3/raw/f6897720e8b6b93becd246187dac36038291c3a4/PULL_REQUEST_TEMPLATE.md.

    _Note: Currently, externally hosted pull request templates outside of BitBucket's domain is not supported with the Firefox addon._

## Some images

<table>
	<tr>
		<th>
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
		<th>
			Pull request list <br />
			<small>(notice the source branch name and creation date)</small>
		</th>
	</tr>
	<tr>
		<td>
			<img src="https://user-images.githubusercontent.com/7514993/35921778-0511d8d8-0bf2-11e8-933a-6d333e75335e.png" alt="source-branch">
		</td>
	</tr>
</table>

<table>
	<tr>
		<th width="50%">
			The Options page.<br>
		</th>
		<th width="50%">
			<em>Diff ignore</em> and <em>Load all diffs</em>
		</th>
	</tr>
	<tr>
		<td rowspan="2">
			<img src="https://user-images.githubusercontent.com/7514993/33744735-1f66115c-db89-11e7-804c-9739d3619c65.png" alt="options">
		</td>
		<td>
			<strong>Diff ignore</strong><br>
			<img src="https://user-images.githubusercontent.com/7514993/32203543-36e1b012-bdba-11e7-8a26-4accd0e775b6.png" alt="pullrequest-ignore">
		</td>
	</tr>
	<tr>
		<td>
			<strong>Load all diffs</strong><br>
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

<table>
	<tr>
		<th colspan="2">
			Sidebar counters
		</th>
	</tr>
	<tr>
		<td>
			<img src="https://user-images.githubusercontent.com/7514993/35759127-0f886b44-084e-11e8-9e3a-58e9ce3da71a.png" alt="expanded"/> <br />
			Expanded
		</td>
		<td>
			<img src="https://user-images.githubusercontent.com/7514993/35742830-1c604af8-0812-11e8-936b-f6083599fb45.png" alt="collapsed" /> <br />
			Collapsed
		</td>
	</tr>
</table>

## Installing

_refined-bitbucket_ is available on the [Google Chrome Web Store][chrome-install] and [Add-ons for Firefox][firefox-install]. When installed, go check the extension's Options to customize it to your needs.

Sometimes the extension is not immediately picked up by the browser after installation. If this happens to you, log out of Bitbucket and then log back in, or clear your cache.

## Default Key Mapping

The following are the default key mappings

#### Tab Selection

![bitbucket pull request tabs][tab-image]

| Key          | Action                       |
| ------------ | ---------------------------- |
| <kbd>1</kbd> | Selects the **Overview** tab |
| <kbd>2</kbd> | Selects the **Commits** tab  |
| <kbd>3</kbd> | Selects the **Activity** tab |

#### Page Navigation and Scrolling

_Upper case letters mean that you need to press shift and the letter_

| Key                       | Action                                           |
| ------------------------- | ------------------------------------------------ |
| <kbd>N</kbd> (Shift+n)    | Scrolls to the **N**ext comment on the page.     |
| <kbd>P</kbd> (Shift+p)    | Scrolls to the **P**revious comment on the page. |
| <kbd>g</kbd> <kbd>g</kbd> | Scrolls to the top of the page                   |
| <kbd>G</kbd> (Shift+g)    | Scrolls to the bottom of the page                |

## Can I use this on Bitbucket Server?

Sadly, no :(. Although Bitbucket Server and Bitbucket Cloud share a similar name, both are actually two completely different products. [Read this comment for a more detailed explanation](https://github.com/refined-bitbucket/refined-bitbucket/issues/39#issuecomment-338455398).

## Compiling & Contributing

Contributions are very appreciated! Even if you can't contribute with a pull request, if you stumble upon any weird behavior or bugs, let us know with an issue!

If you want to run a development version of the extension, clone the repo and run the following commands:

```bash
npm install
npm run watch
```

This will watch any changes in the `src` folder and compile them to the `extension` folder.

#### Chrome Development

To test in Chrome, activate the Developer mode in `chrome://extensions`, click "Load unpacked extension..." and browse to that folder.
If you're new to Chrome extension development, take some time to read Google's [documentation on extensions](https://developer.chrome.com/extensions).

#### Firefox Development

To test in Firefox, open `about:debugging` in a new tab and click "Load Temporary Add-on". Navigate to the extension folder and load `manifest.json`. For further Firefox add-on development & debugging help, please refer to Mozilla's [documentation](https://developer.mozilla.org/en-US/Add-ons).

#### Integration

There is a test suite included. Before sending a pull request please make
sure all tests are passing by running:

```bash
npm test
```

## License

MIT © [refined-bitbucket](https://github.com/refined-bitbucket)

[chrome-install]: https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon
[firefox-install]: https://addons.mozilla.org/en-US/firefox/addon/refined-bitbucket-/
[tab-image]: https://cloud.githubusercontent.com/assets/755669/18594922/1c74c184-7bf7-11e6-887d-859fb6206c65.png
[prismjs-languages]: http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+abap+actionscript+ada+apacheconf+apl+applescript+c+asciidoc+asm6502+aspnet+autohotkey+autoit+bash+basic+batch+bison+brainfuck+bro+cpp+csharp+arduino+coffeescript+ruby+csp+css-extras+d+dart+diff+django+docker+eiffel+elixir+elm+erlang+fsharp+flow+fortran+gherkin+git+glsl+go+graphql+groovy+haml+handlebars+haskell+haxe+http+hpkp+hsts+ichigojam+icon+inform7+ini+io+j+java+jolie+json+julia+keyman+kotlin+latex+less+livescript+lolcode+lua+makefile+markdown+matlab+mel+mizar+monkey+n4js+nasm+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+perl+php+php-extras+powershell+processing+prolog+properties+protobuf+pug+puppet+pure+python+q+qore+r+jsx+typescript+renpy+reason+rest+rip+roboconf+crystal+rust+sas+sass+scss+scala+scheme+smalltalk+smarty+sql+stylus+swift+tcl+textile+twig+tsx+vbnet+verilog+vhdl+vim+wiki+xeora+xojo+yaml#category-languages
[language-ext]: https://github.com/refined-bitbucket/refined-bitbucket/blob/dev/src/syntax-highlight/language-ext.js
