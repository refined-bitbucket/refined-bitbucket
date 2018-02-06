import { h } from 'dom-chef';
import test from 'ava';

import { addApiTokenMetadata } from '../../test/test-utils';
import '../../test/setup-jsdom';

import addSourceBranch, { getPrSourceBranch } from './source-branch';

const mockFetchWithErrorResponse = () => {
    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ error: true })
        });
    };
};

const mockFetchWithSuccessfulResponse = branchName => {
    global.fetch = () => {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    source: {
                        branch: {
                            name: branchName
                        }
                    }
                })
        });
    };
};

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
            </tr>
        </table>
    );
};

test('getPrSourceBranch should return undefined on error', async t => {
    addApiTokenMetadata();

    mockFetchWithErrorResponse();

    const sourceBranch = await getPrSourceBranch();

    t.is(sourceBranch, undefined);
});

test('getPrSourceBranch should return branch name on success', async t => {
    addApiTokenMetadata();

    const expectedBranchName = 'source-branch-name';
    mockFetchWithSuccessfulResponse(expectedBranchName);

    const sourceBranch = await getPrSourceBranch();

    t.is(sourceBranch, expectedBranchName);
});

test('addSourceBranch should not add source branch node on API error', async t => {
    const actual = buildPrTable();

    const expected = actual.cloneNode(true);

    mockFetchWithErrorResponse();
    addApiTokenMetadata();

    const prNode = actual.querySelector('.pull-request-row');
    await addSourceBranch(prNode);

    t.is(actual.outerHTML, expected.outerHTML);
});

test('addSourceBranch should insert source branch node on success', async t => {
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
            </tr>
        </table>
    );

    mockFetchWithSuccessfulResponse(sourceBranch);
    addApiTokenMetadata();

    const prNode = actual.querySelector('.pull-request-row');
    await addSourceBranch(prNode);

    t.is(actual.outerHTML, expected.outerHTML);
});
