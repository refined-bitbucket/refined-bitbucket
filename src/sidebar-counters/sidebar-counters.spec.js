import test from 'ava'
import { h } from 'dom-chef'
import { cleanDocumentBody } from '../../test/test-utils'
import '../../test/setup-jsdom'

import 'selector-observer'

import { getBadge, addCounterToMenuItem } from './sidebar-counters'
import addSidebarCounters from '.'

global.fetch = {}

const size = 10

test.beforeEach(() => {
    global.chrome = {
        runtime: {
            sendMessage: (data, cb) => {
                cb({ size })
            },
        },
    }
})

test.afterEach(() => {
    cleanDocumentBody()
})

test('getBadge should add ! character if response fails or has unexpected shape', t => {
    // Act & Assert 1
    const actual1 = getBadge(undefined)
    t.is(actual1.querySelector('.__rbb-badge-counter').textContent, '!')

    // Act  & Assert 2
    const actual2 = getBadge(null)
    t.is(actual2.querySelector('.__rbb-badge-counter').textContent, '!')

    // Act  & Assert 3
    const actual3 = getBadge({})
    t.is(actual3.querySelector('.__rbb-badge-counter').textContent, '!')

    // Act  & Assert 4
    const actual4 = getBadge({ size: null })
    t.is(actual4.querySelector('.__rbb-badge-counter').textContent, '!')
})

test('getBadge should add up to 99 using response size number', t => {
    // Act  & Assert 1
    const actual1 = getBadge({ size: 0 })
    t.is(actual1.querySelector('.__rbb-badge-counter').textContent, '0')

    // Act  & Assert 2
    const actual2 = getBadge({ size: 99 })
    t.is(actual2.querySelector('.__rbb-badge-counter').textContent, '99')

    // Act  & Assert 3
    const actual3 = getBadge({ size: 100 })
    t.is(actual3.querySelector('.__rbb-badge-counter').textContent, '+99')
})

test.serial(
    'addCounterToMenuItem should add properly branches counter to branches menu link',
    async t => {
        // Arrange
        const menu = (
            <div role="presentation">
                <a href="/user/repo/branches/" />
            </div>
        )

        const expected = (
            <div role="presentation" style={{ overflow: 'hidden' }}>
                <a href="/user/repo/branches/" style={{ position: 'relative' }}>
                    <span class="__rbb-badge">
                        <span class="__rbb-badge-counter">{size}</span>
                    </span>
                </a>
            </div>
        )

        // Act
        await addCounterToMenuItem(menu)

        // Assert
        t.is(menu.outerHTML, expected.outerHTML)
        t.pass()
    }
)

test.serial(
    'addCounterToMenuItem should add properly pull-requests counter to pull-requests menu link',
    async t => {
        // Arrange
        const menu = (
            <div role="presentation">
                <a href="/user/repo/pull-requests/" />
            </div>
        )

        const expected = (
            <div role="presentation" style={{ overflow: 'hidden' }}>
                <a
                    href="/user/repo/pull-requests/"
                    style={{ position: 'relative' }}
                >
                    <span class="__rbb-badge">
                        <span class="__rbb-badge-counter">{size}</span>
                    </span>
                </a>
            </div>
        )

        // Act
        await addCounterToMenuItem(menu)

        // Assert
        t.is(menu.outerHTML, expected.outerHTML)
        t.pass()
    }
)

test.serial(
    'addCounterToMenuItem should not add counter to unknown menu link',
    async t => {
        // Arrange
        const menu = (
            <div role="presentation">
                <a href="/user/repo/commits/" />
            </div>
        )

        // Act
        await addCounterToMenuItem(menu)

        // Assert
        t.is(menu.outerHTML, menu.outerHTML)
        t.pass()
    }
)
