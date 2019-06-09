import { h } from 'dom-chef'
import test from 'ava'
import '../../test/setup-jsdom'
import api from '../api'
import { mockPullrequestEndpointWithSuccessfulResponse } from '../api.spec'

import { addUsernameWithLatestUpdate } from './augment-pr-entry'

Date.now = () => new Date('02/22/2018').getTime()

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
    )
}

test('addUsernameWithLatestUpdate should the name of author last update on success', async t => {
    const actual = buildPrTable()

    const activityAuthor = 'Andrew Bernard'
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
                        last updated 39 minutes ago by Andrew Bernard
                        (Committed)
                    </time>
                </div>
            </tr>
        </table>
    )

    mockPullrequestEndpointWithSuccessfulResponse({ activityAuthor })

    const prNode = actual.querySelector('.pull-request-row')
    const prData = await api.getPullrequest()
    await addUsernameWithLatestUpdate(prNode, prData)
    t.is(actual.outerHTML, expected.outerHTML)
})
