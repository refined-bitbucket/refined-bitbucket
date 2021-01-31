// @jsx h

import test from 'ava'
import { h } from 'dom-chef'

import * as getFilePath from './get-file-path'
import '../../../test/setup-jsdom'

test('Test reading the filepath from a PR (Old UI) element', t => {
    const filePath = 'z/path/to/file/the-file.java'
    const element = <div data-filename={filePath} />

    const res = getFilePath.getFilepathFromElement(element)

    t.is(res, filePath, 'Test reading the filepath from a PR (Old UI) element')
})
