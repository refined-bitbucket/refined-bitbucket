import { h } from 'dom-chef';
import test from 'ava';

import { addApiTokenMetadata } from '../../test/test-utils';
import '../../test/setup-jsdom';

import {
    getPrData,
    addSourceBranch,
    addCreationDate
} from './augment-pr-entry';

// Consider using `nock` package in the future
const mockFetchWithErrorResponse = () => {
    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ error: true })
        });
    };
};

const mockFetchWithSuccessfulResponse = ({
    sourceBranch = 'source-branch-name',
    createdOn = '2018-02-09T15:07:08.160349+00:00'
}) => {
    global.fetch = () => {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    source: {
                        branch: {
                            name: sourceBranch
                        }
                    },
                    // eslint-disable-next-line camelcase
                    created_on: createdOn
                })
        });
    };
};

Date.now = () => new Date('02/22/2018').getTime();

const buildPrTable = () => {
    return (
        <table class="aui paged-table pull-requests-table">
            <tr class="pull-request-row focused" data-pull-request-id="1">
                <div class="title-and-target-branch">
                    <a
                        class="pull-request-title"
                        title="Pull request title"
                        href="https://bitbucket.org/user/repo/pull-requests/1"
                    >
                        Pull request title
                    </a>
                    <span class="aui-icon aui-icon-small aui-iconfont-devtools-arrow-right" />
                    <span class="pull-request-target-branch">
                        <span class="ref-label">
                            <span class="ref branch">
                                <span class="name" aria-label="branch develop">
                                    develop
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
                <div class="pr-number-and-timestamp">
                    Ronald Rey - #1,
                    <time
                        title="23 February 2018 09:52"
                        datetime="2018-02-23T09:52:37-0400"
                    >
                        last updated 39 minutes ago
                    </time>
                </div>
            </tr>
        </table>
    );
};

test('getPrData should return undefined on API error', async t => {
    addApiTokenMetadata();

    mockFetchWithErrorResponse();

    const prData = await getPrData();

    t.is(prData, undefined);
});

test('getPrData should return proper data on successful API request', async t => {
    addApiTokenMetadata();

    mockFetchWithSuccessfulResponse({});

    const prData = await getPrData();

    t.truthy(prData.source.branch.name);
    t.truthy(prData.created_on);
});

test('addSourceBranch should insert source branch node', async t => {
    const actual = buildPrTable();

    const sourceBranch = 'source-branch';
    const expected = (
        <table class="aui paged-table pull-requests-table">
            <tr class="pull-request-row focused" data-pull-request-id="1">
                <div class="title-and-target-branch">
                    <a
                        class="pull-request-title"
                        title="Pull request title"
                        href="https://bitbucket.org/user/repo/pull-requests/1"
                    >
                        Pull request title
                    </a>

                    {/* Added this */}
                    <span class="__rbb-pull-request-source-branch">
                        <span class="ref-label">
                            <span class="ref branch">
                                <span
                                    class="name"
                                    aria-label={`branch ${sourceBranch}`}
                                >
                                    <a
                                        style={{ color: '#707070' }}
                                        title={sourceBranch}
                                        href={`https://bitbucket.org//branch/${sourceBranch}`}
                                    >
                                        {sourceBranch}
                                    </a>
                                </span>
                            </span>
                        </span>
                    </span>

                    <span class="aui-icon aui-icon-small aui-iconfont-devtools-arrow-right" />

                    <span class="pull-request-target-branch">
                        <span class="ref-label">
                            <span class="ref branch">
                                <span class="name" aria-label="branch develop">
                                    develop
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
                <div class="pr-number-and-timestamp">
                    Ronald Rey - #1,
                    <time
                        title="23 February 2018 09:52"
                        datetime="2018-02-23T09:52:37-0400"
                    >
                        last updated 39 minutes ago
                    </time>
                </div>
            </tr>
        </table>
    );

    mockFetchWithSuccessfulResponse({ sourceBranch });
    addApiTokenMetadata();

    const prNode = actual.querySelector('.pull-request-row');
    const prData = await getPrData();
    await addSourceBranch(prNode, prData);

    t.is(actual.outerHTML, expected.outerHTML);
});

test('addCreationDate should add date on success', async t => {
    const actual = buildPrTable();

    const createdOn = '2018-02-09T15:07:08.160349+00:00';
    const expected = (
        <table class="aui paged-table pull-requests-table">
            <tr class="pull-request-row focused" data-pull-request-id="1">
                <div class="title-and-target-branch">
                    <a
                        class="pull-request-title"
                        title="Pull request title"
                        href="https://bitbucket.org/user/repo/pull-requests/1"
                    >
                        Pull request title
                    </a>
                    <span class="aui-icon aui-icon-small aui-iconfont-devtools-arrow-right" />
                    <span class="pull-request-target-branch">
                        <span class="ref-label">
                            <span class="ref branch">
                                <span class="name" aria-label="branch develop">
                                    develop
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
                <div class="pr-number-and-timestamp">
                    Ronald Rey - #1,
                    <time
                        title="23 February 2018 09:52"
                        datetime="2018-02-23T09:52:37-0400"
                    >
                        last updated 39 minutes ago
                    </time>
                    <br />
                    <div
                        title="Fri Feb 09 2018"
                        datetime="2018-02-09T15:07:08.160349+00:00"
                    >
                        Created on Fri Feb 09 2018 (2 weeks ago)
                    </div>
                </div>
            </tr>
        </table>
    );

    mockFetchWithSuccessfulResponse({ createdOn });
    addApiTokenMetadata();

    const prNode = actual.querySelector('.pull-request-row');
    const prData = await getPrData();
    await addCreationDate(prNode, prData);
    t.is(actual.outerHTML, expected.outerHTML);
});
