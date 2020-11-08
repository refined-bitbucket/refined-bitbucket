# 3.22.3 (2020-09-29)

### Bug fixes

-   fix(old-ui): duplicated elements in pull request view (#382)
-   fix(old-ui): ignore whitespace feature (#383)

# 3.22.0 (2020-09-27)

### Improvements

-   enh: Collapse diff scrolling effect only on bottom toggle (#357). Thanks [@jwallet](https://github.com/jwallet)!

### Bug fixes

-   fix: Autolinker plugin (#355). Thanks [@jwallet](https://github.com/jwallet)!
-   fix: Load diff was pending on failed load diff (#365). Thanks [@jwallet](https://github.com/jwallet)!
-   fix(new-ui): Merge commit template in pull requests should now work when navigating from other routes (#378).

# 3.21.0 (2020-06-07)

### Features

-   feat: Trigger ignore whitespace on PR load ([#340](https://github.com/refined-bitbucket/refined-bitbucket/pull/340)) ([a588ad3](https://github.com/refined-bitbucket/refined-bitbucket/commit/a588ad3599638eda295811fd1b08adcf00722cff)). Thanks [@jwallet](https://github.com/jwallet)!
-   feat: Add PR list features to Overview page ([#338](https://github.com/refined-bitbucket/refined-bitbucket/pull/338)) ([2958224](https://github.com/refined-bitbucket/refined-bitbucket/commit/2958224988e618bada885a46575dc36120895753)). Thanks [@jwallet](https://github.com/jwallet)!

### Improvements

-   enh: plus/minus on Firefox + line limit ruler ([#341](https://github.com/refined-bitbucket/refined-bitbucket/pull/341)) ([09cba87](https://github.com/refined-bitbucket/refined-bitbucket/commit/09cba8747bfc4485fa407c6a521af7b59b9058ed)). Thanks [@jwallet](https://github.com/jwallet)!
-   enh: add user-select none to filename badge ([#346](https://github.com/refined-bitbucket/refined-bitbucket/pull/346)) ([456730e](https://github.com/refined-bitbucket/refined-bitbucket/commit/456730e28290d5ddefd4a58437ac2d4bd903495a)). Thanks [@jwallet](https://github.com/jwallet)!
-   enh: UI update of collapse description ([#343](https://github.com/refined-bitbucket/refined-bitbucket/pull/343)) ([46f697a](https://github.com/refined-bitbucket/refined-bitbucket/commit/46f697abdbe5032565b279d60cccc142efac89c0)). Thanks [@jwallet](https://github.com/jwallet)!
-   enh: Show comments ([#345](https://github.com/refined-bitbucket/refined-bitbucket/pull/345)) ([0ee2a99](https://github.com/refined-bitbucket/refined-bitbucket/commit/0ee2a99a87e8fc82dba8633b7ee2b2a6fc257936)). Thanks [@jwallet](https://github.com/jwallet)!

### Bug fixes

-   fix: increase merge commit timeout ([#367](https://github.com/refined-bitbucket/refined-bitbucket/pull/367)) ([67ac887](https://github.com/refined-bitbucket/refined-bitbucket/commit/67ac88774672324e46e3e8400462d3e82e7c59c3)).
-   fix: merge commit template ([#368](https://github.com/refined-bitbucket/refined-bitbucket/pull/368)) ([31a60a8](https://github.com/refined-bitbucket/refined-bitbucket/commit/31a60a8ec79a599eafc49c227e01883cd6cccb69)).
-   fix: collapse description, small fixes ([#364](https://github.com/refined-bitbucket/refined-bitbucket/pull/364)) ([f7c3e80](https://github.com/refined-bitbucket/refined-bitbucket/commit/f7c3e801b20ba9f21c790706ae1a8a319b4ba5eb)). Thanks [@jwallet](https://github.com/jwallet)!

### Chore

-   chore(deps): bump acorn from 5.7.2 to 5.7.4 ([#337](https://github.com/refined-bitbucket/refined-bitbucket/pull/337)) ([39e4ddc](https://github.com/refined-bitbucket/refined-bitbucket/commit/39e4ddcf121500b1f5bff31e7cdbc4706f1c11df)).
-   chore(deps): bump jquery from 3.4.0 to 3.5.0 ([#353](https://github.com/refined-bitbucket/refined-bitbucket/pull/353)) ([8a05731](https://github.com/refined-bitbucket/refined-bitbucket/commit/8a05731726d6a977e44dfa01973a392c39e07aaf)).

# 3.20.0 (2020-03-01)

### Features

-   **New PR UI**. Insert "Copy filename to clipboard" button in diff header,
    [pull request #332](https://github.com/refined-bitbucket/refined-bitbucket/pull/332).

### Bug Fixes

-   Hide line-limit indicator in comments,
    [pull request #327](https://github.com/refined-bitbucket/refined-bitbucket/pull/327).
    Thanks [@BenWildeman](https://github.com/BenWildeman)!

# 3.19.0 (2020-01-27)

### Features

-   Add a line length limit option that shows a ruler at the user-defined column,
    [pull request #309](https://github.com/refined-bitbucket/refined-bitbucket/pull/309).
    Thanks [@avshalomt](https://github.com/avshalomt)!
-   **Merge Commit Message Template**. This feature now works in the new pull request experience.
    [pull request #325](https://github.com/refined-bitbucket/refined-bitbucket/pull/325),
    related [issue #252](https://github.com/refined-bitbucket/refined-bitbucket/issues/252),
    closes [issue #323](https://github.com/refined-bitbucket/refined-bitbucket/issues/323).

# 3.18.2 (2019-12-26)

### Language support

-   Svelte language support for `.svelte` files and Puppet language support for `.pp` files,
    [pull request #305](https://github.com/refined-bitbucket/refined-bitbucket/pull/305).
    Thanks [@Vages](https://github.com/Vages)!

### Bug Fixes

-   Fix "Unable to scroll to next/previous comment",
    [pull request #312](https://github.com/refined-bitbucket/refined-bitbucket/pull/312),
    closes [issue #296](https://github.com/refined-bitbucket/refined-bitbucket/issues/296).
    Thanks [@nikolay-borzov](https://github.com/nikolay-borzov)!
-   Fix Cross-Origin Requests blocking,
    [pull request #322](https://github.com/refined-bitbucket/refined-bitbucket/pull/322),
    closes [issue #308](https://github.com/refined-bitbucket/refined-bitbucket/issues/308),
    closes [issue #321](https://github.com/refined-bitbucket/refined-bitbucket/issues/321),

# 3.18.1 (2019-08-03)

### Bug Fixes

-   Fix sidebar counter badges positioning in collapsed mode when the number of branches or pull requests is too large,
    closes [issue #301](https://github.com/refined-bitbucket/refined-bitbucket/issues/301),
    [pull request #302](https://github.com/refined-bitbucket/refined-bitbucket/pull/302).

# 3.18.0 (2019-06-08)

### Feature

-   **Sticky Header**: The filename header for each file in a pull request will now remain visible for as long
    as the file is visible. This ensures that the filename can always be seen while content of that file is also
    visible, [pull request #287](https://github.com/refined-bitbucket/refined-bitbucket/pull/287). Thanks [@denno020](https://github.com/denno020)

### Bug Fixes

-   Fix "Ignore Whitespace" feature that broke after Atlassian migrated their pull request list page
    to a CSS-in-JS solution that autogenerates the CSS class names of the elements, making the
    previous selectors the extension relied on useless,
    closes [issue #285](https://github.com/refined-bitbucket/refined-bitbucket/issues/285),
    [pull request #292](https://github.com/refined-bitbucket/refined-bitbucket/pull/292).

### Cleanup

-   Remove Augment PR Entry features that have been natively implemented by Bitbucket,
    [pull request #293](https://github.com/refined-bitbucket/refined-bitbucket/pull/293).

# 3.17.0 (2019-06-03)

### Improvements

-   Add "None" option for the Default Merge Strategy feature, in case you don't want to use it,
    closes [issue #288](https://github.com/refined-bitbucket/refined-bitbucket/issues/288),
    [pull request #289](https://github.com/refined-bitbucket/refined-bitbucket/pull/289).

### Bug Fixes

-   Fixed an issue where deleted lines sometimes had a white background when using custom themes.
    closes [issue #283](https://github.com/refined-bitbucket/refined-bitbucket/issues/283).

# 3.16.0 (2019-04-21)

### Language support

-   Ruby language support for `.erb` and Puppet language support for `.pp` files,
    [pull request #276](https://github.com/refined-bitbucket/refined-bitbucket/pull/276).
    Thanks [@ninjaslikecheese](https://github.com/ninjaslikecheese)!

# 3.15.1 (2019-03-07)

### Bug Fixes

-   **Collapse description**: While having this feature enabled, the entire extension would not work in the new PR UI due to an unhandled exception,
    closes [issue #275](https://github.com/refined-bitbucket/refined-bitbucket/issues/275),
    [pull request #277](https://github.com/refined-bitbucket/refined-bitbucket/pull/277).

# 3.15.0 (2019-02-10)

### Feature

-   **Code Review**: Code review features (syntax highlighting, occurrences highlighting, diff collapsing, etc.) now work in
    the "Branch compare" page,
    closes [issue #262](https://github.com/refined-bitbucket/refined-bitbucket/issues/262),
    [pull request #273](https://github.com/refined-bitbucket/refined-bitbucket/pull/273).

-   **Collapse description**: Add button to toggle (collapse/expand) pull request description,
    closes [issue #267](https://github.com/refined-bitbucket/refined-bitbucket/issues/267),
    [pull request #274](https://github.com/refined-bitbucket/refined-bitbucket/pull/274).

### Language Support

-   Haskell language support for `.hs` files,
    [pull request #269](https://github.com/refined-bitbucket/refined-bitbucket/pull/269).
    Thanks [@DanBurton](https://github.com/DanBurton)!

# 3.14.1 (2018-12-20)

### Feature

-   Make the Autolinker feature for links in diffs optional. Check the Options page of the extension.
    If you are having issues like the ones described in [#254](https://github.com/refined-bitbucket/refined-bitbucket/issues/254),
    feel free to disable it while a fix is delivered,
    [pull request #265](https://github.com/refined-bitbucket/refined-bitbucket/pull/265).

# 3.14.0 (2018-11-10)

### Language Support

-   Reason language support for `.re` files,
    [pull request #258](https://github.com/refined-bitbucket/refined-bitbucket/pull/258).
-   Salesforce related files, see pull request for more details,
    [pull request #259](https://github.com/refined-bitbucket/refined-bitbucket/pull/259).

### Development

-   Almost all dependencies upgraded, including Webpack 4 and Babel 7!
    [Pull request #246](https://github.com/refined-bitbucket/refined-bitbucket/pull/246).
-   Introduced [Flow](http://flow.org/) for static type checking,
    [pull request #247](https://github.com/refined-bitbucket/refined-bitbucket/pull/247).

# 3.13.1 (2018-10-23)

### Bug Fixes

-   Fix extension in Firefox v63. Apparently a change in that version disallows
    extending the prototype of the `Element` type, so some code that was relying
    in that possibility had to be changed,
    closes [issue #251](https://github.com/refined-bitbucket/refined-bitbucket/issues/251),
    [pull request #257](https://github.com/refined-bitbucket/refined-bitbucket/pull/257).

# 3.13.0 (2018-09-01)

### Features

-   **Merge Commit Message Template**. Similar to how the pull request template feature works,
    it is now possible to configure the extension to replace the default merge commit message for
    pull requests with a template that has access to dynamically injected variables like the pull
    request title, description, source and destination branch, and more. Check the pull request for
    the feature for a more in-depth explanation,
    closes [issue #97](https://github.com/refined-bitbucket/refined-bitbucket/issues/97),
    [pull request #243](https://github.com/refined-bitbucket/refined-bitbucket/pull/243).
-   **Autolinker**: URLs and emails in diffs will now become real clickable links,
    [pull request #245](https://github.com/refined-bitbucket/refined-bitbucket/pull/245).

### Improvements

-   **Augment PR Entry**: Besides indicating who was the last person to perform
    any activity in the pull request in the pull request list view, also include what kind
    of activity was it inside parenthesis. The possible values
    are "Committed", "Commented" and "Approved",
    [pull request #244](https://github.com/refined-bitbucket/refined-bitbucket/pull/244).

# 3.12.0 (2018-07-21)

### Bug Fixes

-   Fix bad side-by-side scrolling performance with syntax highlighting enabled,
    closes [issue #183](https://github.com/refined-bitbucket/refined-bitbucket/issues/183),
    [pull request #233](https://github.com/refined-bitbucket/refined-bitbucket/pull/233).

### Language Support

-   Gherkin language for `.feature` files,
    closes [issue #231](https://github.com/refined-bitbucket/refined-bitbucket/issues/231),
    [pull request #232](https://github.com/refined-bitbucket/refined-bitbucket/pull/232).

# 3.11.0 (2018-06-30)

### Features

-   **Custom styles**: Now it's possible to define your own CSS styles to be applied to Bitbucket using the
    extension through the Options page,
    closes [issue #181](https://github.com/refined-bitbucket/refined-bitbucket/issues/181),
    [pull request #227](https://github.com/refined-bitbucket/refined-bitbucket/pull/227).
-   **Default-merge-strategy**: Add "Fast forward" as a possible default merge strategy for pull requests,
    [pull request #222](https://github.com/refined-bitbucket/refined-bitbucket/pull/222).
-   **Code Review**: Code review features (syntax highlighting, occurrences highlighting, diff collapsing, etc.) now work in
    the "Create pull request" page,
    closes [issue #220](https://github.com/refined-bitbucket/refined-bitbucket/issues/220),
    [pull request #225](https://github.com/refined-bitbucket/refined-bitbucket/pull/225).

### Bug Fixes

-   **Autocollapse**: Autocollapse feature shouldn't depend on "Toggle diff text" feature to work,
    closes [issue #221](https://github.com/refined-bitbucket/refined-bitbucket/issues/221),
    [pull request #224](https://github.com/refined-bitbucket/refined-bitbucket/pull/224).
-   Fixed extra leading whitespacen in diffs when "Don't carry pluses and minuses to clipboard"
    feature is enabled,
    closes [issue #218](https://github.com/refined-bitbucket/refined-bitbucket/issues/218),
    [pull request #226](https://github.com/refined-bitbucket/refined-bitbucket/pull/226).

# 3.10.0 (2018-05-28)

### Features

-   Insert "Copy filename to clipboard" button in diff header,
    closes [issue #210](https://github.com/refined-bitbucket/refined-bitbucket/issues/210),
    [pull request #215](https://github.com/refined-bitbucket/refined-bitbucket/pull/215).

### Bug Fixes

-   Fix Word Diffs (`<ins>` and `<del>` tags) being removed when using syntax highlighting
    closes [issue #216](https://github.com/refined-bitbucket/refined-bitbucket/issues/216),
    [pull request #217](https://github.com/refined-bitbucket/refined-bitbucket/pull/217).

# 3.9.0 (2018-05-20)

### Features

-   Adds a 'Create a Pull Request' link to the 'Compare branches of tags' page,
    closes [issue #189](https://github.com/refined-bitbucket/refined-bitbucket/issues/189),
    [pull request #191](https://github.com/refined-bitbucket/refined-bitbucket/pull/191).
    Thanks [@deepakrb](http://github.com/deepakrb).
-   Custom Tab Indentation,
    closes [issue #202](https://github.com/refined-bitbucket/refined-bitbucket/issues/202),
    [pull request #209](https://github.com/refined-bitbucket/refined-bitbucket/pull/209).
    Thanks [@peterkrieg](http://github.com/peterkrieg).
-   Insert "Comments" checkbox in diff header to toggle (show/hide) comments,
    closes [issue #172](https://github.com/refined-bitbucket/refined-bitbucket/issues/172),
    [pull request #196](https://github.com/refined-bitbucket/refined-bitbucket/pull/196).

### Bug fixes

-   Update manifest permissions to allow Fetch requests from Firefox addon,
    closes [issue #197](https://github.com/refined-bitbucket/refined-bitbucket/issues/197),
    [pull request #198](https://github.com/refined-bitbucket/refined-bitbucket/pull/198).

### Language support

-   Elixir (`.exs`), [pull request #203](https://github.com/refined-bitbucket/refined-bitbucket/pull/203).
    Thanks [@ppraisethesun](https://github.com/ppraisethesun)!
-   Salesforce Apex code (`.cls`) as Java syntax,
    [pull request #207](https://github.com/refined-bitbucket/refined-bitbucket/pull/207).
    Thanks [@wfawcett](https://github.com/wfawcett)!
-   Clojure (`.clj`), closes [issue #211](https://github.com/refined-bitbucket/refined-bitbucket/issues/211),
    [pull request #212](https://github.com/refined-bitbucket/refined-bitbucket/pull/212).
-   Slim (`.slim`) as Pug syntax,
    closes [issue #204](https://github.com/refined-bitbucket/refined-bitbucket/issues/204),
    [pull request #213](https://github.com/refined-bitbucket/refined-bitbucket/pull/213).
    Thanks [@villuorav](https://github.com/villuorav)!

### Development

-   Fix the `package` npm script to use the `archiver` npm package instead of `admin-zip`
    so that it produces a valid Zip file,
    closes [issue #193](https://github.com/refined-bitbucket/refined-bitbucket/issues/193),
    [pull request #194](https://github.com/refined-bitbucket/refined-bitbucket/pull/194).
-   Add Firefox add-on development instructions to README,
    [pull request #200](https://github.com/refined-bitbucket/refined-bitbucket/pull/200).
    Thanks [@drexler](http://github.com/drexler)!

### Misc

-   Add `composer.lock` to auto-collapse default paths,
    [pull request #205](https://github.com/refined-bitbucket/refined-bitbucket/pull/205).
    Thanks [@Slamdunk](http://github.com/Slamdunk)!
-   Default merge strategy: add note for default implementation,
    [pull request #208](https://github.com/refined-bitbucket/refined-bitbucket/pull/208).
    Thanks [@Slamdunk](http://github.com/Slamdunk)!

# 3.8.0 (2018-03-22)

This release was possible thanks to the help of some great contributors! Special thanks to [@clarkd](http://github.com/clarkd),
[@drexler](http://github.com/drexler) and [@hk0i](http://github.com/hk0i) for selflessly taking some of their time to work on
a few issues and new features.

On another note, we finally have a new logo! Beautifully designed by [@clarkd](http://github.com/clarkd).

![Refined BitBucket](./logo-full.svg)

### Features:

-   Display author of the lastest activity on a pull request,
    closes [issue #154](https://github.com/refined-bitbucket/refined-bitbucket/issues/154),
    [pull request #187](https://github.com/refined-bitbucket/refined-bitbucket/pull/187).
    Thanks [@drexler](http://github.com/drexler)!
-   Insert badge with the number of commits of the current pull request next to the "Commits" tab,
    closes [issue #163](https://github.com/refined-bitbucket/refined-bitbucket/issues/163),
    [pull request #164](https://github.com/refined-bitbucket/refined-bitbucket/pull/164).

### Improvements:

-   New logo!
    Closes [issue #15](https://github.com/refined-bitbucket/refined-bitbucket/issues/15),
    [pull request #166](https://github.com/refined-bitbucket/refined-bitbucket/pull/166).
    Thanks [@clarkd](http://github.com/clarkd)!

### Bug fixes:

-   Fixed extra leading minus/plus sign in diffs when "Don't carry pluses and minuses to clipboard"
    feature is enabled,
    closes [issue #168](https://github.com/refined-bitbucket/refined-bitbucket/issues/168),
    and [issue #175](https://github.com/refined-bitbucket/refined-bitbucket/issues/175),
    [pull request #177](https://github.com/refined-bitbucket/refined-bitbucket/pull/177).

### Language support:

-   **Vagrantfile, Jenkinsfile, and Rakefile**: Support for Jenkinsfile, Vagrantfile and Rakefile syntax highlighting,
    closes [issue #184](https://github.com/refined-bitbucket/refined-bitbucket/issues/184),
    [pull request #174](https://github.com/refined-bitbucket/refined-bitbucket/pull/174) and
    [pull request #186](https://github.com/refined-bitbucket/refined-bitbucket/pull/186).
    Thanks [@drexler](http://github.com/drexler) and [@hk0i](http://github.com/drexler)!
-   **Powershell** language support for (_\*.ps1_) files,
    [pull request #173](https://github.com/refined-bitbucket/refined-bitbucket/pull/173).
    Thanks [@drexler](http://github.com/drexler)!

# 3.7.3 (2018-03-08)

From now on, you have the option to disable update notifications that open a new browser tab each time a new version
of the extension is released. The new option is located at the bottom of the Options page.

If you are still interested in getting notified about updates but in a less intrusive way, [subscribe to this issue on
GitHub](https://github.com/refined-bitbucket/refined-bitbucket/issues/182), which will be updated with each release
and you will get an e-mail in your inbox.

### Improvements:

-   Now you can disable update notifications through the Options page,
    closes [issue #167](https://github.com/refined-bitbucket/refined-bitbucket/issues/167),
    [pull request #176](https://github.com/refined-bitbucket/refined-bitbucket/pull/176).

### Bug fixes:

-   The "Add source branch" feature was not working unless the "Set Ignore whitespace ON" was enabled,
    closes [issue #169](https://github.com/refined-bitbucket/refined-bitbucket/issues/169),
    [pull request #179](https://github.com/refined-bitbucket/refined-bitbucket/pull/179).

# 3.7.2 (2018-02-28)

### Bug fixes:

-   The "Don't carry pluses and minuses to clipboard" feature is supposed
    to delete "+" and "-" characters from line diffs, but it was mistakenly
    removing some other characters.
    The previous attempt in pull request #162 at solving issue #161 didn't actually solve it,
    closes [issue #161](https://github.com/refined-bitbucket/refined-bitbucket/issues/161),
    [pull request #165](https://github.com/refined-bitbucket/refined-bitbucket/pull/165).

# 3.7.1 (2018-02-28)

### Features:

-   Code review features now available in branch compare view,
    closes [issue #128](https://github.com/refined-bitbucket/refined-bitbucket/issues/128),
    [pull request #159](https://github.com/refined-bitbucket/refined-bitbucket/pull/159).

### Bug fixes:

-   The "Don't carry pluses and minuses to clipboard" feature is supposed
    to delete "+" and "-" characters from line diffs, but it was mistakenly
    removing some other characters,
    closes [issue #160](https://github.com/refined-bitbucket/refined-bitbucket/issues/160),
    closes [issue #161](https://github.com/refined-bitbucket/refined-bitbucket/issues/161),
    [pull request #162](https://github.com/refined-bitbucket/refined-bitbucket/pull/162).

# 3.7.0 (2018-02-26)

I'm very happy with this release since a bug that existed since the initial release of the extension has been
closed, [issue #63](https://github.com/refined-bitbucket/refined-bitbucket/issues/63). Previously, all lines that
contained word diffs in file diffs were not syntax highlighted! I didn't anticipate how much of a difference fixing this
issue would make, but now that I have been using it for a few days, I can say that it tremendously improves the syntax
highlighting experience. Hope you find it as useful as I have!

Remember to rate the extension in the [Chrome Webstore](https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf)
or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/refined-bitbucket-/) if you haven't already, it
helps give the extension visibility in the market place and help other users find it!

Oh, and something else, I've wanted to add a proper logo to the extension for a while but I'm not a designer myself. I
had a friend of mine sketch some ideas and posted them here
[#15](https://github.com/refined-bitbucket/refined-bitbucket/issues/15),
if you have some time, would love for you to drop by and leave some feedback!

### Features:

-   Don't carry pluses and minuses to clipboard when copying diff's contents,
    closes [issue #149](https://github.com/refined-bitbucket/refined-bitbucket/issues/149),
    [pull request #156](https://github.com/refined-bitbucket/refined-bitbucket/pull/156).

### Improvement:

-   Word diffs no longer remove or break syntax highlighting.
    closes [issue #63](https://github.com/refined-bitbucket/refined-bitbucket/issues/63),
    [pull request #158](https://github.com/refined-bitbucket/refined-bitbucket/pull/158).

### Bug fixes:

-   The "Close anchor branch" checkbox was being checked even
    in the PR editing screen. It's been fixed now so that it only works
    in the creation screen, like how it should've been all along,
    closes [issue #155](https://github.com/refined-bitbucket/refined-bitbucket/issues/155),
    [pull request #157](https://github.com/refined-bitbucket/refined-bitbucket/pull/157).

### Language support:

-   **Perl**: Expanded Perl support to include Perl test files and template toolkit (\*.t, \*.tt).
    [pull request #148](https://github.com/refined-bitbucket/refined-bitbucket/pull/148).
-   Add Flow and Jest Snapshots syntax highlighting as JSX files (\*.flow, \*.snap).

# 3.6.0 (2018-02-11)

Huge thanks to [@atdrago](http://github.com/atdrago) and [@dpekkle](http://github.com/dpekkle) for helping out with
testing and identifying several issues in this release!

### Features:

-   **Sidebar Counters**: Adds counters of the open or active "Branches" and "Pull requests"
    links in the sidebar navigation menu,
    closes [issue #133](https://github.com/refined-bitbucket/refined-bitbucket/issues/133),
    [pull request #134](https://github.com/refined-bitbucket/refined-bitbucket/pull/134).
-   **Source Branch**: Adds the source branch name next to the pull request title in the
    pull request list view and linkifies it along with the target branch,
    closes [issue #135](https://github.com/refined-bitbucket/refined-bitbucket/issues/135),
    [pull request #136](https://github.com/refined-bitbucket/refined-bitbucket/pull/136).
-   **Augment PR Entry**: Include the creation date of the pull request in the pull request
    list view,
    closes [issue #141](https://github.com/refined-bitbucket/refined-bitbucket/issues/141),
    [pull request #142](https://github.com/refined-bitbucket/refined-bitbucket/pull/142).

### Bug fixes:

-   **Ignore Whitespace**: Only the PRs that were initially loaded with the page were touched,
    while any PR added dynamically to the DOM were not affected,
    closes [issue #138](https://github.com/refined-bitbucket/refined-bitbucket/issues/138),
    [pull request #139](https://github.com/refined-bitbucket/refined-bitbucket/pull/139).
-   **Collapse Diff**: When there are previous versions comments in the diff,
    the collapse/toggle diff top button was misplaced,
    closes [issue #122](https://github.com/refined-bitbucket/refined-bitbucket/issues/122),
    [pull request #140](https://github.com/refined-bitbucket/refined-bitbucket/pull/140).
-   **Syntax Highlighting**: Syntax highlighting was not working for anyone who installed the
    extension for the first time on version 3.4.0 or 3.5.0, due to the refactoring made
    to the Options mechanism in [pull request #107](https://github.com/refined-bitbucket/refined-bitbucket/pull/107),
    closes [issue #143](https://github.com/refined-bitbucket/refined-bitbucket/issues/143),
    [pull request #146](https://github.com/refined-bitbucket/refined-bitbucket/pull/146).

### Language support:

-   **Header File extension**: Added Header File extension (\*.hpp), commonly used
    for tempalte implementations, or directly as C++ header extension,
    [pull request #132](https://github.com/refined-bitbucket/refined-bitbucket/pull/132).
-   **Perl**: Add support for the Perl module extension (\*.pm),
    [pull request #145](https://github.com/refined-bitbucket/refined-bitbucket/pull/145).
-   Updated PrismJS to v1.11.0 to add new language definitions
    that were not supported in the previous version, like TSX,
    closes [issue #130](https://github.com/refined-bitbucket/refined-bitbucket/issues/130),
    [pull request #137](https://github.com/refined-bitbucket/refined-bitbucket/pull/137).

# 3.5.0 (2018-02-01)

### Features:

-   Improve the default font-family and size of lines of code in Source view,
    closes [issue #35](https://github.com/refined-bitbucket/refined-bitbucket/issues/35),
    [pull request #126](https://github.com/refined-bitbucket/refined-bitbucket/pull/126).

### Language support:

-   **Smarty & Twig**: Added smarty, twig (\*.tpl/\*.twig) extension support,
    closes [issue #121](https://github.com/refined-bitbucket/refined-bitbucket/issues/121),
    [pull request #123](https://github.com/refined-bitbucket/refined-bitbucket/pull/123).
-   **Typescript JSX**: Added TypeScript JSX (\*.tsx) extension support,
    closes [issue #129](https://github.com/refined-bitbucket/refined-bitbucket/issues/129),
    [pull request #130](https://github.com/refined-bitbucket/refined-bitbucket/pull/130).

### Development:

-   Refactor: Co-located tests alongside their feature implementation, and refactored the import/exports,
    [pull request #124](https://github.com/refined-bitbucket/refined-bitbucket/pull/124).
-   Refactor: Removed unnecessary `wait-for-render.js`, since now we are using `element-ready` npm package,
    [pull request #125](https://github.com/refined-bitbucket/refined-bitbucket/pull/125).

# 3.4.1 (2018-01-24)

### Improvement:

-   **Pullrequest Template**: Permission to access https://gist.githubusercontent.com/ is no longer necessary,
    closes [issue #119](https://github.com/refined-bitbucket/refined-bitbucket/issues/119),
    [pull request #120](https://github.com/refined-bitbucket/refined-bitbucket/pull/120).

### Language support:

-   **ColdFusion Markup Language**: Added cfml (\*.cfc/\*.cfm) extension support,
    [pull request #118](https://github.com/refined-bitbucket/refined-bitbucket/pull/118).

# 3.4.0 (2018-01-23)

### Features:

[pr-templates-github]: https://github.com/blog/2111-issue-and-pull-request-templates
[pr-templates-bitbucket]: https://bitbucket.org/site/master/issues/11571/custom-pull-request-description-template

-   **Pullrequest Template**: [Available in GitHub since the start of 2016][pr-templates-github],
    and [actively requested by Bitbucket users][pr-templates-bitbucket]. With this feature, by including a
    `PULL_REQUEST_TEMPLATE.md` file in the default branch of the repository in one of the locations below, the contents of
    that file template will replace the default pull request body inserted by Bitbucket when creating a new one.

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

    Closes [issue #105](https://github.com/refined-bitbucket/refined-bitbucket/issues/105),
    [pull request #106](https://github.com/refined-bitbucket/refined-bitbucket/pull/106).

-   **Autocollapse**: Add option to automatically collapse deleted files in a pull request,
    closes [issue #96](https://github.com/refined-bitbucket/refined-bitbucket/issues/96),
    [pull request #101](https://github.com/refined-bitbucket/refined-bitbucket/pull/101).
-   **Close anchor branch**: Check the "Close anchor branch" checkbox by default when creating or editing pull requests,
    closes [issue #92](https://github.com/refined-bitbucket/refined-bitbucket/issues/92),
    [pull request #110](https://github.com/refined-bitbucket/refined-bitbucket/pull/110).
-   Code reviewing features that so far were only available to pull requests, are now available in commits too:

    -   Syntax highlighting
    -   Occurrence highlighting
    -   Collapsable diffs
    -   Diffs removal

    Closes [issue #112](https://github.com/refined-bitbucket/refined-bitbucket/issues/112),
    [pull request #113](https://github.com/refined-bitbucket/refined-bitbucket/pull/113).

### Development:

-   Added CSS Loader to the Webpack config, which now makes it possible to directly import `.css` files in JavaScript
    modules,
    [pull request #104](https://github.com/refined-bitbucket/refined-bitbucket/pull/104).
-   Removed the `extension` folder from source control and moved everything to `src` for better code colocation.
    Now using webpack to copy all the necessary resources,
    [pull request #108](https://github.com/refined-bitbucket/refined-bitbucket/pull/108).
-   Option storage management is now handled gracefully by the npm package `webext-options-sync`,
    [pull request #107](https://github.com/refined-bitbucket/refined-bitbucket/pull/107).
-   Previously, the code for every feature was executed on every page
    within http://bitbucket.org/. Now checks have been added so they will
    only run when needed, according to the current URL,
    closes [issue #20](https://github.com/refined-bitbucket/refined-bitbucket/issues/20),
    [pull request #111](https://github.com/refined-bitbucket/refined-bitbucket/pull/111).
-   Prettier set up in development environment: npm scripts, commit hooks, editor integration,
    closes [issue #109](https://github.com/refined-bitbucket/refined-bitbucket/issues/109),
    [pull request #114](https://github.com/refined-bitbucket/refined-bitbucket/pull/114).
-   Fixed an bug with the production build process where the `UglifyJSPlugin` was outputting
    a bundle with broken code,
    closes [issue #115](https://github.com/refined-bitbucket/refined-bitbucket/issues/115),
    [pull request #116](https://github.com/refined-bitbucket/refined-bitbucket/pull/116).

# 3.3.0 (2018-01-09)

With the release of [Firefox Quantum](https://www.mozilla.org/en-US/firefox/) there is a renewed interest for this
browser in the community, so we have decided to officially publish the extension as an
[Add-on for Firefox](https://addons.mozilla.org/en-US/firefox/addon/refined-bitbucket-/)! I'd like to thank
[@Ivan0xFF](https://github.com/Ivan0xFF) with [#40](https://github.com/refined-bitbucket/refined-bitbucket/pull/40) and
[@awendland](https://github.com/awendland) with [#89](https://github.com/refined-bitbucket/refined-bitbucket/issues/89)
for getting the wheel moving in this direction.

If you decide to switch to Firefox and use this extension, let me know of any compatibily issues if they arise!
Also, if you find it useful, don't forget to rate it so that other users can find it!

### Features:

-   **Collapse-diff**: A button to toggle the diff text was added at the bottom of the diff. Additionally, clicking this
    or the previous button at the top will now scroll the diff into view at the top of the page,
    closes [issue #88](https://github.com/refined-bitbucket/refined-bitbucket/issues/88),
    [pull request #95](https://github.com/refined-bitbucket/refined-bitbucket/pull/95).

### Improvements:

-   **Collapse-diff**: Test suite for the feature,
    [pull request #94](https://github.com/refined-bitbucket/refined-bitbucket/pull/94).
-   **Syntax-highlighting**: Fix for an issue where the styling necessary for syntax highlighting pull requests was
    interfering with some of Bitbucket's own styling, which caused inline code in comments to have a white background
    instead of their original gray background,
    closes [issue #74](https://github.com/refined-bitbucket/refined-bitbucket/issues/74) and
    [issue #93](https://github.com/refined-bitbucket/refined-bitbucket/issues/93),
    [pull request #99](https://github.com/refined-bitbucket/refined-bitbucket/pull/99).

### Language support:

-   Replaced `.js` syntax-highlighting styles from pure Javascript (`language-javascript`) to JSX (`language-jsx`).
    Highlighting should be exactly the same, except for JSX markup which will now be properly highlighted,
    [pull request #100](https://github.com/refined-bitbucket/refined-bitbucket/pull/100).

# 3.2.0 (2017-12-13)

[dms]: https://bitbucket.org/site/master/issues/13895/default-merge-strategy

The highlight of this release is the feature "Default merge strategy".
[As you can see, this has been a popular request by Bitbucket users for almost a year now][dms],
but now I hope this can serve as a solution for most of the people who voted on that official issue.

### Features:

-   **Default-merge-strategy**: Choose either "Merge commit" or "Squash" as the default merge strategy for pull requests
    in the Options page,
    closes [issue #90](https://github.com/refined-bitbucket/refined-bitbucket/issues/90),
    [pull request #91](https://github.com/refined-bitbucket/refined-bitbucket/pull/91).

### Improvements:

-   **General**: Added checkboxes in the Options page to allow the user to opt-in / opt-out of each feature of the
    extension individually,
    closes [issue #86](https://github.com/refined-bitbucket/refined-bitbucket/issues/86),
    [pull request #87](https://github.com/refined-bitbucket/refined-bitbucket/pull/87).

### Bug fixes

-   **Collapse-diff**: When using the Bitbucket Diff Tree extension, the "Toggle diff text" button (collapse diff) is not
    duplicated anymore each time the "Compact/Uncompact empty folder" button is clicked,
    closes [issue #84](https://github.com/refined-bitbucket/refined-bitbucket/issues/84),
    [pull request #85](https://github.com/refined-bitbucket/refined-bitbucket/pull/85).

# 3.1.0 (2017-11-20)

### Features

-   **Ignore-whitespace**: Open pull request links with "Ignore whitespace" option enabled by default when entering pull
    requests from the pull request list page,
    closes [issue #78](https://github.com/refined-bitbucket/refined-bitbucket/issues/78),
    [pull request #81](https://github.com/refined-bitbucket/refined-bitbucket/pull/81).

### Improvements

-   **Syntax-highlighting**: Re-implementation of the syntax-highlighting feature now using MutationObservers so that
    every diff loaded dynamically into the page is also highlighted,
    closes [issue #76](https://github.com/refined-bitbucket/refined-bitbucket/issues/76),
    [pull request #77](https://github.com/refined-bitbucket/refined-bitbucket/pull/77).

### Bug fixes

-   **General**: Files don't have a yellow background highlighting in source code view,
    closes [issue #75](https://github.com/refined-bitbucket/refined-bitbucket/issues/75),
    [pull request #83](https://github.com/refined-bitbucket/refined-bitbucket/pull/83).

### Language support

-   Added Julia language support for files with extension `.jl`,
    closes [issue #79](https://github.com/refined-bitbucket/refined-bitbucket/issues/79),
    [pull request #80](https://github.com/refined-bitbucket/refined-bitbucket/pull/80).

# 3.0.0 (2017-11-03)

After a long time of active development being dormant on this project, we are coming back with what I consider some
great new features and improvements. Because of this, we are bumping to a new major release, v3.0.0!
Check out the updated README to see some screenshots and gifs

The development environment for the extension was greatly improved as well, with changes that will make adding and
testing new features a lot easier. We are hoping that future releases can come by quicker from now on.

If you stumble upon any weird behavior or bugs, please report an issue, I'll be be more than happy to tackle them as
soon as I can. If you can have any quick question, you can hit me up on Twitter
[@reyronald](http://www.twitter.com/reyronald).

### Features

-   **Collapse-Diff**: Added button to collapse diffs in the Pull Request view.
    [Pull request 60](https://github.com/refined-bitbucket/refined-bitbucket/pull/60) and
    [pull request 67](https://github.com/refined-bitbucket/refined-bitbucket/pull/67).
-   **Autocollapse**: Add file patterns in the Options page that you would like the extension to collapse automatically
    when the Pull Request.
    [Pull request 68](https://github.com/refined-bitbucket/refined-bitbucket/pull/68).
-   **Pullrequest-ignore**: Add diff filename patterns in the Options page that you would like the extension to completely
    remove automatically when the Pull Request loads.
    [Pull request 70](https://github.com/refined-bitbucket/refined-bitbucket/pull/70).
-   **Load-all-diffs**: Add button to load all failed diffs in Pull Request view.
    [Pull request 71](https://github.com/refined-bitbucket/refined-bitbucket/pull/71).

### Improvements

[merge-checks]: https://confluence.atlassian.com/bitbucketserver/checks-for-merging-pull-requests-776640039.html

-   **Merge-approvals**: Merge approvals feature removed. No longer necessary since it is
    [now implemented natively by Bitbucket with "merge checks"][merge-checks],
    closes [issue 51](https://github.com/refined-bitbucket/refined-bitbucket/issues/51) and
    [issue 32](https://github.com/refined-bitbucket/refined-bitbucket/issues/32),
    [pull request 61](https://github.com/refined-bitbucket/refined-bitbucket/pull/61).
-   **Occurrence-Highlighter**: Now when double-clicking whitespace/indentation in diffs, no highlighting occurs,
    closes [issue 59](https://github.com/refined-bitbucket/refined-bitbucket/issues/59),
    [pull request 62](https://github.com/refined-bitbucket/refined-bitbucket/pull/62)
-   **Development**: _browserify_ build and and _tape_ test suite were replaced with _webpack_ & _babel_ and _ava_.
    Since now we are using _babel_ transpilation, the latest features of ES that it supports can be used. Also a _watch_
    mode is available!
    [Pull request 65](https://github.com/refined-bitbucket/refined-bitbucket/pull/65).

### Bug fixes

-   **Occurrence-Highlighter**: Double-clicking an already highlighted word doesn't remove it,
    closes [issue 64](https://github.com/refined-bitbucket/refined-bitbucket/issues/64),
    [pull request 69](https://github.com/refined-bitbucket/refined-bitbucket/pull/69).

# 2.6.4 (2017-10-16)

### Bug fixes

-   **Occurrence-Highlighter**: When double-clicking a word that exists multiple times in the same HTML node, the
    selection remains in the clicked word,
    closes [issue #57](https://github.com/refined-bitbucket/refined-bitbucket/issues/57),
    [pull request 58](https://github.com/refined-bitbucket/refined-bitbucket/pull/58).

# 2.6.3 (2017-10-15)

### Bug fixes

-   **Occurrence-Highlighter**: Now the selection is maintained when highlighting word occurrences when creating comments
    and tasks,
    closes [issue #55](https://github.com/refined-bitbucket/refined-bitbucket/issues/55),
    [pull request 56](https://github.com/refined-bitbucket/refined-bitbucket/pull/56).

# 2.6.2 (2017-10-12)

### Bug fixes

-   **Occurrence-Highlighter**: Now the selection is maintained when highlighting word occurrences inside comments and
    tasks,
    closes [issue #52](https://github.com/refined-bitbucket/refined-bitbucket/issues/52),
    [pull request 53](https://github.com/refined-bitbucket/refined-bitbucket/pull/53).

# 2.6.1 (2017-09-27)

### Bug fixes

-   **Occurrence-Highlighter**: Now the selection is maintained when highlighting word occurrences,
    closes [issue #38](https://github.com/refined-bitbucket/refined-bitbucket/issues/38),
    [pull request 50](https://github.com/refined-bitbucket/refined-bitbucket/pull/50).

### Language support

-   Added C++ language support for files with extension `.cc`
-   Added JSX language support for VueJS files with extension `.vue`
-   Added Kotlin language support for files with extension `.kt`

# 2.5.1 (2017-07-19)

No changelog until this version.
