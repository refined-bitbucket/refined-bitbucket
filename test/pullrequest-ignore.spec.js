import test from 'ava';
import { h } from 'dom-chef';
import delay from 'yoctodelay';
import ignore from 'ignore';

import pullrequest from '../src/pullrequest-ignore';

import './setup-jsdom';

/**
 * Returns the `HTMLElement` representing the node that contains a pull request
 * @param {string[]} filenames
 * @return {HTMLDivElement}
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
    );
}

/**
 * @param {HTMLHeadingElement} header
 */
function parseHeader(header) {
    const [, filesVisible, filesChangedString] = /Showing (\d+) of (\d+)/.exec(
        header
    );
    const filesChanged = parseInt(filesChangedString, 10);
    const filesRemoved = filesChanged - filesVisible;
    return { filesRemoved, filesChanged };
}

test('should remove the right diffs and update the header', async t => {
    const filenames = [
        '/some path/first_file.js',
        '/some path/second_file.js',
        '/some path/third_file.js'
    ];
    const ignorePaths = ['second_file.js'];

    const node = getPullrequestNode(filenames);
    pullrequest.init(node, ignorePaths);

    // Just wait an arbitrary short amount of time to let
    // the promise of the `await elementReady` to resolve
    await delay(16);

    const header = node.querySelector('section.main > h1').textContent;
    const { filesRemoved, filesChanged } = parseHeader(header);
    t.is(filenames.length, filesChanged);
    t.is(ignorePaths.length, filesRemoved);

    const ig = ignore().add(ignorePaths);

    filenames.forEach(filename => {
        const diff = node.querySelector(
            `section[data-identifier="${escape(filename)}"]`
        );
        const link = node.querySelector(
            `li[data-file-identifier="${escape(filename)}"] > a`
        );
        const span = node.querySelector(
            `li[data-file-identifier="${escape(filename)}"] > span`
        );

        if (ig.ignores(filename)) {
            t.is(diff, null);
            t.is(link, null);
            t.is(span.textContent, filename);
        } else {
            t.not(diff, null);
            t.not(link, null);
            t.is(link.textContent, filename);
        }
    });
});
