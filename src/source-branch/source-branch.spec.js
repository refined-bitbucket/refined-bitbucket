import { h } from 'dom-chef';
import test from 'ava';
import delay from 'yoctodelay';

import { addApiTokenMetadata, cleanDocumentBody } from '../../test/test-utils';
import '../../test/setup-jsdom';

import {
    getPrSourceBranch,
    linkifyTargetBranchNode,
    addSourceBranchNode
} from './source-branch';
import addSourceBranchToPrList from '.';

import 'selector-observer';

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

test('linkifyTargetBranchNode should work', t => {
    const actual = (
        <div class="title-and-target-branch">
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
    );

    const expected = (
        <div class="title-and-target-branch">
            <span class="pull-request-target-branch">
                <span class="ref-label">
                    <span class="ref branch">
                        <span class="name" aria-label="branch develop">
                            <a
                                style={{ color: '#707070' }}
                                title="develop"
                                href="https://bitbucket.org//branch/develop"
                            >
                                develop
                            </a>
                        </span>
                    </span>
                </span>
            </span>
        </div>
    );

    linkifyTargetBranchNode(actual);

    t.is(actual.outerHTML, expected.outerHTML);
});

test('addSourceBranchNode should work', async t => {
    const actual = (
        <table>
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

    const sourceBranch = 'source-branch';
    const expected = (
        <table>
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

    await addSourceBranchNode(actual.querySelector('.title-and-target-branch'));

    t.is(actual.outerHTML, expected.outerHTML);
});

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

test('addSourceBranchToPrList should not add source branch node on API error', async t => {
    const prTable = buildPrTable();
    document.body.appendChild(prTable);
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
                                    <a
                                        style={{ color: '#707070' }}
                                        title="develop"
                                        href="https://bitbucket.org//branch/develop"
                                    >
                                        develop
                                    </a>
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
            </tr>
        </table>
    );

    mockFetchWithErrorResponse();

    addApiTokenMetadata();
    addSourceBranchToPrList();

    await delay(32);

    t.is(prTable.outerHTML, expected.outerHTML);
    cleanDocumentBody();
});

test.serial(
    'addSourceBranchToPrList should insert source branch node on success',
    async t => {
        const prTable = buildPrTable();
        document.body.appendChild(prTable);

        const sourceBranch = 'source-branch-name';
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
                                    <span
                                        class="name"
                                        aria-label="branch develop"
                                    >
                                        <a
                                            style={{ color: '#707070' }}
                                            title="develop"
                                            href="https://bitbucket.org//branch/develop"
                                        >
                                            develop
                                        </a>
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
        addSourceBranchToPrList();

        await delay(32);

        t.is(prTable.outerHTML, expected.outerHTML);
        cleanDocumentBody();
    }
);
