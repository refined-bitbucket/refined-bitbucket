import test from 'ava'
import { h } from 'dom-chef'
import elementReady from 'element-ready'

import linesAddedRemoved from '.'

import '../../test/setup-jsdom'

function filesChangedNode(files) {
    return (
        <section id="main">
            <ul id="commit-files-summary">
                {files.map(file => (
                    <li data-file-identifier={file.filename}>
                        <span class="lines-added">+{file.linesAdded}</span>
                        <span class="lines-removed">-{file.linesRemoved}</span>
                        <a>{file.filename}</a>
                    </li>
                ))}
            </ul>
        </section>
    )
}

test.serial('should prepend Total Lines Changed line when loaded', async t => {
    const files = [
        { filename: 'abcd.js', linesAdded: 25, linesRemoved: 20 },
        { filename: 'Gemfile', linesAdded: 35, linesRemoved: 10 },
    ]
    const node = filesChangedNode(files)
    linesAddedRemoved(node)

    // Wait for the added/removed line to be prepended.
    const addedRemoved = await elementReadyWithTimeout(
        'li#__refined_bitbucket_total_modified',
        { target: node }
    )

    const linesAdded = addedRemoved.querySelector('span.lines-added')
    const linesRemoved = addedRemoved.querySelector('span.lines-removed')

    t.is(Math.abs(parseInt(linesAdded.textContent, 10)), 60)
    t.is(Math.abs(parseInt(linesRemoved.textContent, 10)), 30)
})

function elementReadyWithTimeout(selector, options, timeout = 1000) {
    const promise = elementReady(selector, options)
    setTimeout(promise.cancel, timeout)
    return promise
}
