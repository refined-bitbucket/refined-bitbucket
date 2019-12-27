import test from 'ava'
import { h } from 'dom-chef'
import { cleanDocumentBody } from '../../test/test-utils'
import '../../test/setup-jsdom'

import 'selector-observer'

import { addBadge } from './sidebar-counters'
import addSidebarCounters from '.'

global.fetch = {}

test.afterEach(() => {
    cleanDocumentBody()
})

test('addBadge should work properly', t => {
    // Arrange
    const actual = (
        <div>
            <a aria-disabled="false" href="/user/repo/branches/" class="jRoiuT">
                <span class="bGyZgY" />
            </a>
        </div>
    )

    const size = 5
    const expected = (
        <div style={{ overflow: 'hidden' }}>
            <a
                aria-disabled="false"
                href="/user/repo/branches/"
                class="jRoiuT"
                style={{ position: 'relative' }}
            >
                <span class="__rbb-badge">
                    <span class="__rbb-badge-counter">{size}</span>
                </span>
                <span class="bGyZgY" />
            </a>
        </div>
    )

    // Act
    const a = actual.firstChild
    const badge = addBadge(a, { size })

    // Assert
    t.is(actual.outerHTML, expected.outerHTML)
    t.true(badge instanceof HTMLSpanElement)
})

test('addBadge should add ? character if response fails or has unexpected shape', t => {
    // Arrange
    const template = (
        <div>
            <a aria-disabled="false" href="/user/repo/branches/" class="jRoiuT">
                <span class="bGyZgY" />
            </a>
        </div>
    )

    // Act & Assert 1
    const actual1 = template.cloneNode(true)
    addBadge(actual1.firstChild, undefined)
    t.is(actual1.querySelector('.__rbb-badge-counter').textContent, '?')

    // Act  & Assert 2
    const actual2 = template.cloneNode(true)
    addBadge(actual2.firstChild, null)
    t.is(actual2.querySelector('.__rbb-badge-counter').textContent, '?')

    // Act  & Assert 3
    const actual3 = template.cloneNode(true)
    addBadge(actual3.firstChild, {})
    t.is(actual3.querySelector('.__rbb-badge-counter').textContent, '?')

    // Act  & Assert 4
    const actual4 = template.cloneNode(true)
    addBadge(actual4.firstChild, { size: null })
    t.is(actual4.querySelector('.__rbb-badge-counter').textContent, '?')

    // Act  & Assert 5
    const actual5 = template.cloneNode(true)
    addBadge(actual5.firstChild, { size: 0 })
    t.is(actual5.querySelector('.__rbb-badge-counter').textContent, '0')
})

test.serial('addSidebarCounters should work properly', async t => {
    // Arrange
    const nav = (
        <div>
            <div>
                <a href="/user/repo/branches/" />
            </div>
            <div>
                <a href="/user/repo/pull-requests/" />
            </div>

            <button class="ak-navigation-resize-button" aria-expanded="false">
                Resize
            </button>
        </div>
    )
    document.body.appendChild(nav)

    const size = 10
    const expected = (
        <div>
            <div style={{ overflow: 'hidden' }}>
                <a href="/user/repo/branches/" style={{ position: 'relative' }}>
                    <span class="__rbb-badge">
                        <span class="__rbb-badge-counter">{size}</span>
                    </span>
                </a>
            </div>
            <div style={{ overflow: 'hidden' }}>
                <a
                    href="/user/repo/pull-requests/"
                    style={{ position: 'relative' }}
                >
                    <span class="__rbb-badge">
                        <span class="__rbb-badge-counter">{size}</span>
                    </span>
                </a>
            </div>

            <button class="ak-navigation-resize-button" aria-expanded="false">
                Resize
            </button>
        </div>
    )

    global.chrome = {
        runtime: {
            sendMessage: (data, cb) => {
                cb({ size })
            },
        },
    }

    // Act
    await addSidebarCounters()

    // Assert
    t.is(nav.outerHTML, expected.outerHTML)
    t.pass()
})
