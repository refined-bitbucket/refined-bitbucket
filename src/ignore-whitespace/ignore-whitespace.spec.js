import { h } from 'dom-chef'
import test from 'ava'

import ignoreWhitespace from '.'

import '../../test/setup-jsdom'

test('should transform pull request link to add ignore whitespace query param to 1', t => {
    const actual = (
        <div>
            <a
                class="pull-request-title"
                title="pull request title"
                href="https://bitbucket.org/user/repo/pull-requests/1"
            >
                pull request title
            </a>
        </div>
    )

    const expected = (
        <div>
            <a
                class="pull-request-title"
                title="pull request title"
                href="https://bitbucket.org/user/repo/pull-requests/1?w=1"
            >
                pull request title
            </a>
        </div>
    )

    ignoreWhitespace(actual)

    t.is(actual.outerHTML, expected.outerHTML)
})

test('should transform pull request link to toggle ignore whitespace query param to 1', t => {
    const actual = (
        <div>
            <a
                class="pull-request-title"
                title="pull request title"
                href="https://bitbucket.org/user/repo/pull-requests/1?w=0"
            >
                pull request title
            </a>
        </div>
    )

    const expected = (
        <div>
            <a
                class="pull-request-title"
                title="pull request title"
                href="https://bitbucket.org/user/repo/pull-requests/1?w=1"
            >
                pull request title
            </a>
        </div>
    )

    ignoreWhitespace(actual)

    t.is(actual.outerHTML, expected.outerHTML)
})
