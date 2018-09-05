import test from 'ava'
import { h } from 'dom-chef'

import * as sourceHandler from './source-handler'

import '../vendor/prism'
import '../../test/setup-jsdom'

test('Adds a language-xxxx class to the element that has a data-filename attr', t => {
    const element = <div data-filename="z/path/to/file/the-file.java" />
    const languageClass = sourceHandler.getLanguageClass(element)
    t.is(
        languageClass,
        'language-java',
        'proper language-xxxx class added to the element'
    )
})

test('Adds a language-ruby class to the element that has a data-filename attr for a Vagrantfile', t => {
    const element = <div data-filename="z/path/to/Vagrantfile" />
    const languageClass = sourceHandler.getLanguageClass(element)
    t.is(
        languageClass,
        'language-ruby',
        'proper language-ruby class added to the element'
    )
})

test('Adds a language-ruby class to the element that has a data-filename attr for a Jenknsfile', t => {
    const element = <div data-filename="z/path/to/Jenkinsfile" />
    const languageClass = sourceHandler.getLanguageClass(element)
    t.is(
        languageClass,
        'language-groovy',
        'proper language-groovy class added to the element'
    )
})
