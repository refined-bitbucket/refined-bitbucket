import test from 'ava'
import { h } from 'dom-chef'
import '../../test/setup-jsdom'
import { addApiTokenMetadata } from '../../test/test-utils'

import totalLinesChanged from '.'

const responses = [
    // Commits response
    {
        size: 1,
        values: [
            {
                hash: '123',
            },
        ],
    },

    // Activity response
    {
        size: 1,
        values: [
            {
                update: {
                    destination: {
                        commit: {
                            hash: '456',
                        },
                    },
                },
            },
        ],
    },

    // DiffStats response
    {
        size: 1,
        values: [
            /* eslint-disable camelcase */
            { lines_added: 4, lines_removed: 3 },
            /* eslint-disable camelcase */
            { lines_added: 16, lines_removed: 2 },
        ],
    },
]

const mockApiResponse = () => {
    global.chrome = {
        runtime: {
            sendMessage: (data, cb) => {
                cb(responses.shift())
            },
        },
    }
}

test('should insert total lines added and removed into files tab', async t => {
    addApiTokenMetadata()
    mockApiResponse()

    const node = (
        <div data-testid="sidebar-tab-files">
            <span class="css-7apn2c eask4t">Files</span>
            <span class="css-1cgkhv4">21</span>
        </div>
    )
    document.body.appendChild(node)

    const expected = (
        <div data-testid="sidebar-tab-files">
            <span class="css-7apn2c eask4t">Files</span>
            <span class="css-1cgkhv4">21</span>
            <span class="__rbb-total-lines-added">+20</span>
            <span class="__rbb-total-lines-removed">-5</span>
        </div>
    )

    const actual = await totalLinesChanged(
        'https://bitbucket.org/username/repo/pull-requests/123'
    )

    t.is(actual.outerHTML, expected.outerHTML)
})
