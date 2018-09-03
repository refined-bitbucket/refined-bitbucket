import test from 'ava'
import { h } from 'dom-chef'
import delay from 'yoctodelay'
import ignore from 'ignore'

import diffIgnore from '.'

import '../../test/setup-jsdom'

/**
 * Returns the `HTMLElement` representing the node that contains a pull request
 * @param {string[]} filenames The list of changed filenames of the PR
 * @return {HTMLDivElement} The pull request element
 */
function getPullrequestNode(filenames) {
    return (
        <div id="pr-tab-content">
            <div id="pullrequest-diff">
                {/* Header and file summary */}
                <section class="main">
                    <h1>
                        Files changed <span>({filenames.length})</span>
                    </h1>
                    <ul id="commit-files-summary">
                        {filenames.map(filename => (
                            <li data-file-identifier={escape(filename)}>
                                <a>{filename}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Diffs */}
                <div id="compare">
                    <section id="changeset-diff">
                        <div class="bb-patch bb-patch-unified">
                            {filenames.map(filename => (
                                <section
                                    class="bb-udiff"
                                    data-identifier={escape(filename)}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

/**
 * Returns the `HTMLElement` representing the node that contains a commit view
 * @param {string[]} filenames Filenames
 * @return {HTMLDivElement} Commit node
 */
function getCommitNode(filenames) {
    return (
        <section id="commit" data-module="repo/commits/view">
            {/* Header and file summary */}
            <section id="commit-summary">
                <h1>
                    Files changed <span>({filenames.length})</span>
                </h1>
                <ul id="commit-files-summary">
                    {filenames.map(filename => (
                        <li data-file-identifier={escape(filename)}>
                            <a>{filename}</a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Diffs */}
            <section id="changeset-diff">
                <div class="bb-patch bb-patch-unified">
                    {filenames.map(filename => (
                        <section
                            class="bb-udiff"
                            data-identifier={escape(filename)}
                        />
                    ))}
                </div>
            </section>
        </section>
    )
}

/**
 * @param {HTMLHeadingElement} header Header
 * @returns { {filesRemoved: number, filesChanged: number} } Result
 */
function parseHeader(header) {
    const [, filesVisible, filesChangedString] = /Showing (\d+) of (\d+)/.exec(
        header
    )
    const filesChanged = parseInt(filesChangedString, 10)
    const filesRemoved = filesChanged - filesVisible
    return { filesRemoved, filesChanged }
}

async function performAssertions(t, getNode) {
    const filenames = [
        '/some path/first_file.js',
        '/some path/second_file.js',
        '/some path/third_file.js',
    ]
    const ignorePaths = ['second_file.js']

    const node = getNode(filenames)
    diffIgnore.init(ignorePaths)
    diffIgnore.execute(node)

    // Just wait an arbitrary short amount of time to let
    // the promise of the `await elementReady` to resolve
    await delay(16)

    const header = node.querySelector('section.main > h1, #commit-summary > h1')
        .textContent
    const { filesRemoved, filesChanged } = parseHeader(header)
    t.is(filenames.length, filesChanged)
    t.is(ignorePaths.length, filesRemoved)

    const ig = ignore().add(ignorePaths)

    filenames.forEach(filename => {
        const diff = node.querySelector(
            `section[data-identifier="${escape(filename)}"]`
        )
        const link = node.querySelector(
            `li[data-file-identifier="${escape(filename)}"] > a`
        )
        const span = node.querySelector(
            `li[data-file-identifier="${escape(filename)}"] > span`
        )

        if (ig.ignores(filename)) {
            t.is(diff, null)
            t.is(link, null)
            t.is(span.textContent, filename)
        } else {
            t.not(diff, null)
            t.not(link, null)
            t.is(link.textContent, filename)
        }
    })
}

test('should remove the right diffs and update the header in a pull request', async t => {
    await performAssertions(t, getPullrequestNode)
})

test('should remove the right diffs and update the header in a commit', async t => {
    await performAssertions(t, getCommitNode)
})
