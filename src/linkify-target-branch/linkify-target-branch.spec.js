import { h } from 'dom-chef'
import test from 'ava'

import '../../test/setup-jsdom'

import linkifyTargetBranch from '.'

test('linkifyTargetBranch should work', t => {
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
    )

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
    )

    linkifyTargetBranch(actual)

    t.is(actual.outerHTML, expected.outerHTML)
})
