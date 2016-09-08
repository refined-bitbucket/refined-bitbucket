[![build status](https://travis-ci.org/andremw/refined-bitbucket.svg?branch=test-it)](https://travis-ci.org/andremw/refined-bitbucket) <sup>-</sup> [![downloads](https://img.shields.io/chrome-web-store/d/afppminkfnfngihdocacbgeajbbdklkf.svg)](https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon)

# refined-bitbucket
We all know Bitbucket lacks some features that we have in GitHub, GiLab etc.
Based on Sindre Sorhus' [Refined Github](https://github.com/sindresorhus/refined-github)
extension I had the idea of improving BitBucket's user interface.
In fact, [Rodrigo Proença](https://github.com/rproenca) did most of the initial code and I just created the extension
and made a few improvements. Kudos!

## Current features
- Improves syntax highlight for pull requests. Enabled languages:
  - Markup, C-like languages, Go, Groovy, Bash, Handlebars, JSON, Dart, Elixir, Erlang, Markdown, Python, React JSX, 
  Ruby, PHP, Scala, Less, Sass, Swift, YAML etc. Check what other languages are 
  enabled [here](https://github.com/andremw/refined-bitbucket/blob/dev/src/syntax-highlight/language-ext.js). Missing any 
  language? [Let me know](https://github.com/andremw/refined-bitbucket/issues) or submit a pull request!
- Double click on a word to highlight all occurrences.
- Block pull request merging without a minimum number of approvals (defaults to 2 minimum approvals).

## Install
https://chrome.google.com/webstore/detail/refined-bitbucket/afppminkfnfngihdocacbgeajbbdklkf?utm_source=chrome-ntp-icon

## Contributing
Contributions are very appreciated! You'll just need to run _npm run build_ to create the extension.js file and test 
the code you write and load the unpackaged extension in your Chrome. It would also be nice to take some time to read Google's 
[documentation on extensions](https://developer.chrome.com/extensions).

## License
MIT © [andremw](github.com/andremw)
