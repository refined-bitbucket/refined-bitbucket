import test from 'ava'
import '../test/setup-jsdom'

import api from './api'

// Consider using `nock` package in the future
export const mockFetchWithErrorResponse = () => {
    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ error: true }),
        })
    }
}

export const mockPullrequestEndpointWithSuccessfulResponse = ({
    sourceBranch = 'source-branch-name',
    createdOn = '2018-02-09T15:07:08.160349+00:00',
    activityAuthor = 'Andrew Bernard',
}) => {
    global.chrome = {
        runtime: {
            sendMessage: (data, cb) => {
                cb({
                    source: {
                        branch: {
                            name: sourceBranch,
                        },
                    },
                    // eslint-disable-next-line camelcase
                    created_on: createdOn,
                    values: [
                        {
                            update: {
                                author: {
                                    // eslint-disable-next-line camelcase
                                    display_name: activityAuthor,
                                },
                            },
                            approval: {
                                user: {
                                    // eslint-disable-next-line camelcase
                                    display_name: activityAuthor,
                                },
                            },
                            comment: {
                                user: {
                                    // eslint-disable-next-line camelcase
                                    display_name: activityAuthor,
                                },
                            },
                        },
                    ],
                })
            },
        },
    }
}

test('api.getPullrequest should return proper data on successful API request', async t => {
    mockPullrequestEndpointWithSuccessfulResponse({})

    const prData = await api.getPullrequest()

    t.truthy(prData.source.branch.name)
    t.truthy(prData.created_on)
})
