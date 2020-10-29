import test from 'ava'

import * as sourceHandler from './source-handler'

import '../../vendor/prism'

test('Returns a language-xxxx class from the native Prism languages list', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'z/path/to/file/the-file.java'
    )

    t.is(
        languageClass,
        'language-java',
        'proper language-xxxx class returned from native Prism languages list'
    )
})

test('Returns a language-xxx from the language extensions file', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'filepath/withALanguage/Extension/like.coffee'
    )

    t.is(
        languageClass,
        'language-coffeescript',
        'proper language-cofeescript returned from language extension list'
    )
})

test('Returns a language-ruby class when handling non-extension but globally file named Vagrantfiles', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'z/path/to/Vagrantfile'
    )

    t.is(
        languageClass,
        'language-ruby',
        'proper language-ruby class returned for globally named vagrantfile'
    )
})

test('Returns a language-ruby class when handling non-extension but globally file named named Jenknsfiles', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'z/path/to/Jenkinsfile'
    )

    t.is(
        languageClass,
        'language-groovy',
        'proper language-groovy returned for globally named Jenknsfile'
    )
})
