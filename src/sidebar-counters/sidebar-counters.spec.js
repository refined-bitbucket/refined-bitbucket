import { URL } from 'url';
import test from 'ava';
import { h } from 'dom-chef';
import '../../test/setup-jsdom';
import { addApiTokenMetadata } from '../../test/test-utils';

import 'selector-observer';

import { getResourcesCount, addBadge } from './sidebar-counters';
import addSidebarCounters from '.';

global.location = new URL('https://www.bitbucket.org/user/repo');

global.fetch = {};

test('getResourcesCount should return ? with error response', async t => {
    addApiTokenMetadata();
    global.fetch = () => {
        return Promise.resolve({
            json: () =>
                Promise.resolve({ error: { message: 'some error happened' } })
        });
    };
    const value = await getResourcesCount();
    t.is(value, '?');
});

test('getResourcesCount should return correct size with successful response', async t => {
    addApiTokenMetadata();
    const size = 10;
    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ size })
        });
    };
    const value = await getResourcesCount();
    t.is(value, size);
});

test('addBadge should work properly', t => {
    // Arrange
    const actual = (
        <div>
            <a aria-disabled="false" href="/user/repo/branches/" class="jRoiuT">
                <span class="bGyZgY" />
            </a>
        </div>
    );

    const resourcesCount = 5;
    const expected = (
        <div style={{ position: 'relative' }}>
            <a aria-disabled="false" href="/user/repo/branches/" class="jRoiuT">
                <span class="__rbb-badge">
                    <span class="__rbb-badge-counter">{resourcesCount}</span>
                </span>
                <span class="bGyZgY" />
            </a>
        </div>
    );

    // Act
    const a = actual.firstChild;
    const badge = addBadge(a, resourcesCount);

    // Assert
    t.is(actual.outerHTML, expected.outerHTML);
    t.true(badge instanceof HTMLSpanElement);
});

test('addSidebarCounters should exit early', async t => {
    await addSidebarCounters();
    t.pass();
});

test('addSidebarCounters should work properly', async t => {
    // Arrange
    addApiTokenMetadata();
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
    );
    document.body.appendChild(nav);

    const size = 10;
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
    );

    global.fetch = () => {
        return Promise.resolve({
            json: () => Promise.resolve({ size })
        });
    };

    // Act
    await addSidebarCounters();

    // Assert
    t.is(nav.outerHTML, expected.outerHTML);
    t.pass();
});
