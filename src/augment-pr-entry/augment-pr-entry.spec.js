import { h } from 'dom-chef'
import test from 'ava'
import '../../test/setup-jsdom'
import api from '../api'
import { mockPullrequestEndpointWithSuccessfulResponse } from '../api.spec'

import {
    addSourceBranch,
    addUsernameWithLatestUpdate,
} from './augment-pr-entry'

Date.now = () => new Date('02/22/2018').getTime()

const buildPrTable = () => {
    return (
        <table>
            <tbody>
                <tr data-qa="pull-request-row">
                    <td colspan="15">
                        <div>
                            <div>avatar</div>
                            <div>
                                <div>
                                    <div>
                                        <a
                                            class="pull-request-title"
                                            title="Pull request title"
                                            href="https://bitbucket.org/user/repo/pull-requests/1"
                                        >
                                            Pull request title
                                        </a>
                                    </div>
                                    <span>
                                        <span
                                            style={{
                                                whiteSpace: 'nowrap',
                                                display: 'none',
                                            }}
                                        >
                                            <div role="button">source</div>
                                        </span>
                                        <span>
                                            <span role="presentation">➡</span>
                                        </span>
                                        <span>
                                            <div role="button">destination</div>
                                        </span>
                                    </span>
                                </div>
                                <small>
                                    <div />, created
                                    <span />, updated
                                    <span />
                                </small>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

test('addUsernameWithLatestUpdate should add the name of author last update', async t => {
    const actual = buildPrTable()

    const activityAuthor = 'Andrew Bernard'
    const expected = (
        <table>
            <tbody>
                <tr data-qa="pull-request-row">
                    <td colspan="15">
                        <div>
                            <div>avatar</div>
                            <div>
                                <div>
                                    <div>
                                        <a
                                            class="pull-request-title"
                                            title="Pull request title"
                                            href="https://bitbucket.org/user/repo/pull-requests/1"
                                        >
                                            Pull request title
                                        </a>
                                    </div>
                                    <span>
                                        <span
                                            style={{
                                                whiteSpace: 'nowrap',
                                                display: 'none',
                                            }}
                                        >
                                            <div role="button">source</div>
                                        </span>
                                        <span>
                                            <span role="presentation">➡</span>
                                        </span>
                                        <span>
                                            <div role="button">destination</div>
                                        </span>
                                    </span>
                                </div>
                                <small>
                                    <div />, created
                                    <span />, updated
                                    <span /> by Andrew Bernard (Committed)
                                </small>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )

    mockPullrequestEndpointWithSuccessfulResponse({ activityAuthor })

    const prNode = actual.querySelector('[data-qa="pull-request-row"]')
    const prData = await api.getPullrequest()
    await addUsernameWithLatestUpdate(prNode, prData)
    t.is(actual.outerHTML, expected.outerHTML)
})

test('addSourceBranch should show the hidden source branch on small screen', async t => {
    const actual = buildPrTable()

    const expected = (
        <table>
            <tbody>
                <tr data-qa="pull-request-row">
                    <td colspan="15">
                        <div>
                            <div>avatar</div>
                            <div>
                                <div>
                                    <div>
                                        <a
                                            class="pull-request-title"
                                            title="Pull request title"
                                            href="https://bitbucket.org/user/repo/pull-requests/1"
                                        >
                                            Pull request title
                                        </a>
                                    </div>
                                    <span>
                                        <span style={{ whiteSpace: 'nowrap' }}>
                                            <div role="button">source</div>
                                        </span>
                                        <span>
                                            <span role="presentation">➡</span>
                                        </span>
                                        <span>
                                            <div role="button">destination</div>
                                        </span>
                                    </span>
                                </div>
                                <small>
                                    <div />, created
                                    <span />, updated
                                    <span />
                                </small>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )

    window.innerWidth = 1000

    const prNode = actual.querySelector('[data-qa="pull-request-row"]')
    await addSourceBranch(prNode)

    t.is(actual.outerHTML, expected.outerHTML)
})
