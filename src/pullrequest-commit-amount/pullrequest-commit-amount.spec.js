import test from 'ava';
import { h } from 'dom-chef';
import '../../test/setup-jsdom';
import { addApiTokenMetadata } from '../../test/test-utils';

import pullrequestCommitAmount from '.';

// Consider using `nock` package in the future
const mockFetchWithErrorResponse = () => {
    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ error: true })
        });
    };
};

const mockFetchWithSuccessfulResponse = () => {
    global.fetch = () => {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    size: 1
                })
        });
    };
};

test('should insert commit amount badge', async t => {
    addApiTokenMetadata();
    mockFetchWithSuccessfulResponse();

    const node = (
        <section id="pullrequest" data-local-id="1">
            <a id="pr-menu-commits">Commits</a>
        </section>
    );
    document.body.appendChild(node);

    const expected = (
        <section id="pullrequest" data-local-id="1">
            <a id="pr-menu-commits">
                Commits
                <span class="__rbb-commit-ammount">1</span>
            </a>
        </section>
    );

    const actual = await pullrequestCommitAmount();

    t.is(actual.outerHTML, expected.outerHTML);
});

test.serial('should NOT insert commit amount badge on API error', async t => {
    addApiTokenMetadata();
    mockFetchWithErrorResponse();

    const node = (
        <section id="pullrequest" data-local-id="1">
            <a id="pr-menu-commits">Commits</a>
        </section>
    );
    document.body.appendChild(node);

    const expected = node.cloneNode(true);

    const actual = await pullrequestCommitAmount();

    t.is(actual.outerHTML, expected.outerHTML);
});
