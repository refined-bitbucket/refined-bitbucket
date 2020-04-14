import test from 'ava'
import { h } from 'dom-chef'

import '../../test/setup-jsdom'
import collapsePullRequestDescription from '.'
import { cleanDocumentBody } from '../../test/test-utils'
import delay from 'yoctodelay'

test('should not disaply description container if empty', async t => {
    // Arrange
    const actual = (
        <div class="clearfix description">
            <dt>Description</dt>
            <dd class="empty">No description</dd>
        </div>
    )

    document.body.appendChild(actual)

    // Act
    collapsePullRequestDescription()

    // Assert
    t.is(actual.outerHTML, actual.outerHTML)

    cleanDocumentBody()
    await delay(10)
})

test('should toggle pull request description properly', async t => {
    // Arrange
    const actual = (
        <div class="clearfix description">
            <dt>Description</dt>
            <dd class="wiki-content">Description content</dd>
        </div>
    )

    const expected = (
        <div class="clearfix description">
            <dt>Description</dt>
            <dd class="wiki-content">
                <button
                    type="button"
                    aria-label="Toggle description text"
                    title="Toggle description text"
                    class="__rbb-collapse-bar"
                >
                    <svg
                        aria-hidden="true"
                        height="16"
                        version="1.1"
                        viewBox="0 0 10 16"
                        width="10"
                        data-arrow-direction="up"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"
                        />
                    </svg>
                    <svg
                        aria-hidden="true"
                        height="16"
                        version="1.1"
                        viewBox="0 0 10 16"
                        width="10"
                        class="__refined_bitbucket_hide"
                        data-arrow-direction="down"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"
                        />
                    </svg>
                </button>
                <div class="__rbb-collapse-content">Description content</div>
            </dd>
        </div>
    )

    document.body.appendChild(actual)

    // Act
    collapsePullRequestDescription()

    // Assert
    t.is(actual.outerHTML, expected.outerHTML)

    const button = actual.querySelector('button')
    const upArrow = actual.querySelector('svg[data-arrow-direction="up"]')
    const downArrow = actual.querySelector('svg[data-arrow-direction="down"]')
    const descriptionContent = actual.querySelector(
        '.wiki-content .__rbb-collapse-content'
    )
    const isHidden = el =>
        [...el.classList].includes('__refined_bitbucket_hide')

    t.false(isHidden(upArrow))
    t.true(isHidden(downArrow))
    t.false(isHidden(descriptionContent))

    // Act
    button.click()

    // Assert
    t.true(isHidden(upArrow))
    t.false(isHidden(downArrow))
    t.true(isHidden(descriptionContent))

    // Act
    button.click()

    // Assert
    t.false(isHidden(upArrow))
    t.true(isHidden(downArrow))
    t.false(isHidden(descriptionContent))

    cleanDocumentBody()
    await delay(10)
})
