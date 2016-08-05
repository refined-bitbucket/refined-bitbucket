# refined-bitbucket
We all know Bitbucket lacks some features that we find lovely in GitHub and in our minds.
And based on Sindre Sorhus' [Refined Github](https://github.com/sindresorhus/refined-github)
extension I had the idea of improving BitBucket's user interface.
In fact, [Rodrigo Proença](https://github.com/rproenca) did most of the code. Kudos!

## Current features
- Improves syntax highlight for pull requests. Enabled languages:
  - Markup, C-like languages, Go, Groovy, Bash, Handlebars, JSON, Markdown, Python, React JSX, Ruby, PHP, Scala, Less, Sass, Swift, YAML, Dart, Elixir, Erlang, F#, INI, Lua, ObjectiveC, Perl, Rust, Typescript. Missed a language? Go ahead and open a pull request with the language added to the languages.js file (remember to check if it's supported by Prism.js).

- Double click on a word to highlight all occurrences.

- Requires a minimum number of approvers (block merging of a pull request until it has been approved by at least the selected number of participants).

## Install
Install it from chrome web store. Just look for "refined bitbucket".

## License
MIT © [andremw](github.com/andremw)
