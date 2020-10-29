import test from 'ava'

import * as sourceHandler from './source-handler'

import '../../vendor/prism'

test('Adds a language-xxxx class to the element that has a data-filename attr', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'z/path/to/file/the-file.java'
    )

    t.is(
        languageClass,
        'language-java',
        'proper language-xxxx class added to the element'
    )
})

test('Adds a language-ruby class to the element that has a data-filename attr for a Vagrantfile', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'z/path/to/Vagrantfile'
    )

    t.is(
        languageClass,
        'language-ruby',
        'proper language-ruby class added to the element'
    )
})

test('Adds a language-ruby class to the element that has a data-filename attr for a Jenknsfile', t => {
    const languageClass = sourceHandler.getLanguageClass(
        'z/path/to/Jenkinsfile'
    )

    t.is(
        languageClass,
        'language-groovy',
        'proper language-groovy class added to the element'
    )
})
