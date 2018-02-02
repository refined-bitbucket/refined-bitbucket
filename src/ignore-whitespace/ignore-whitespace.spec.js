import { h } from 'dom-chef';
import test from 'ava';

import ignoreWhitespace from '.';

import '../../test/setup-jsdom';

test('should transform pull request link to add ignore whitespace query param to 1', t => {
    const actual = (
        <a
            class="pull-request-title"
            title="pull request title"
            href="https://bitbucket.org/user/repo/pull-requests/1"
        >
            pull request title
        </a>
    );

    const expected = (
        <a
            class="pull-request-title"
            title="pull request title"
            href="https://bitbucket.org/user/repo/pull-requests/1?w=1"
        >
            pull request title
        </a>
    );

    document.body.appendChild(actual);

    location.href = 'https://www.bitbucket.org/user/repo/pull-requests/';

    ignoreWhitespace();

    t.is(actual.outerHTML, expected.outerHTML);
});

test('should transform pull request link to toggle ignore whitespace query param to 1', t => {
    const actual = (
        <a
            class="pull-request-title"
            title="pull request title"
            href="https://bitbucket.org/user/repo/pull-requests/1?w=0"
        >
            pull request title
        </a>
    );

    const expected = (
        <a
            class="pull-request-title"
            title="pull request title"
            href="https://bitbucket.org/user/repo/pull-requests/1?w=1"
        >
            pull request title
        </a>
    );

    document.body.appendChild(actual);

    location.href = 'https://www.bitbucket.org/user/repo/pull-requests/';

    ignoreWhitespace();

    t.is(actual.outerHTML, expected.outerHTML);
});

test('should not transform pull request link if current page is not pull requests list', t => {
    const actual = (
        <a
            class="pull-request-title"
            title="pull request title"
            href="https://bitbucket.org/user/repo/pull-requests/1"
        >
            pull request title
        </a>
    );

    const expected = (
        <a
            class="pull-request-title"
            title="pull request title"
            href="https://bitbucket.org/user/repo/pull-requests/1"
        >
            pull request title
        </a>
    );

    document.body.appendChild(actual);

    location.href =
        'https://www.bitbucket.org/user/repo/pull-requests/is-not-pull-request-page-list';

    ignoreWhitespace();

    t.is(actual.outerHTML, expected.outerHTML);
});
