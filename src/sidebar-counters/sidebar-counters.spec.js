import test from 'ava'
import { h } from 'dom-chef'
import '../../test/setup-jsdom'

import 'selector-observer'

import { addBadge } from './sidebar-counters'
import addSidebarCounters from '.'

global.fetch = {}

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
        <div style={{ position: 'relative' }}>
            <a aria-disabled="false" href="/user/repo/branches/" class="jRoiuT">
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

test.only('addBadge should add ? character if response fails or has unexpected shape', t => {
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

test('addSidebarCounters should exit early', async t => {
    await addSidebarCounters()
    t.pass()
})

test('addSidebarCounters should work properly', async t => {
    // Arrange
    const nav = (
        <div id="adg3-navigation">
            <div>
                <a
                    aria-disabled="false"
                    href="/user/repo/branches/"
                    class="jRoiuT"
                />
            </div>
            <div>
                <a
                    aria-disabled="false"
                    href="/user/repo/pull-requests/"
                    class="jRoiuT"
                />
            </div>
        </div>
    )
    document.body.appendChild(nav)

    const size = 10
    const expected = (
        <div id="adg3-navigation">
            <div style={{ position: 'relative' }}>
                <a
                    aria-disabled="false"
                    href="/user/repo/branches/"
                    class="jRoiuT"
                >
                    <span class="__rbb-badge">
                        <span class="__rbb-badge-counter">{size}</span>
                    </span>
                </a>
            </div>
            <div style={{ position: 'relative' }}>
                <a
                    aria-disabled="false"
                    href="/user/repo/pull-requests/"
                    class="jRoiuT"
                >
                    <span class="__rbb-badge">
                        <span class="__rbb-badge-counter">{size}</span>
                    </span>
                </a>
            </div>
        </div>
    )

    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ size }),
        })
    }

    // Act
    await addSidebarCounters()

    // Assert
    t.is(nav.outerHTML, expected.outerHTML)
    t.pass()
})
