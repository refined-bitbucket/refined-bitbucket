import { h } from 'dom-chef'
import test from 'ava'

import insertExpandDiff from '.'

import '../../test/setup-jsdom'

const cleanSection = (
    <section
        class="iterable-item bb-udiff maskable commentable-diff"
        data-path="filename.js"
        data-source-url="/api/internal/repositories/team/repo/src/a6a74247b1a9bc6d33661e28917459b36b50c5aa/filename.js"
        id="chg-filename.js"
        data-identifier="filename.js"
        data-filename="filename.js"
    >
        <div class="diff-container">
            <div class="heading">
                <div class="primary">
                    <h1 class="filename">
                        <span class="aui-icon aui-icon-small aui-iconfont-devtools-file diff-entry-kind-icon">
                            File
                        </span>
                        filename.js
                        <span class="diff-entry-lozenge aui-lozenge aui-lozenge-subtle aui-lozenge-complete">
                            Modified
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    </section>
)

const sectionWithButton = (
    <section
        class="iterable-item bb-udiff maskable commentable-diff"
        data-path="filename.js"
        data-source-url="/api/internal/repositories/team/repo/src/a6a74247b1a9bc6d33661e28917459b36b50c5aa/filename.js"
        id="chg-filename.js"
        data-identifier="filename.js"
        data-filename="filename.js"
    >
        <div class="diff-container">
            <div class="heading">
                <div class="primary">
                    <h1 class="filename">
                        <span class="aui-icon aui-icon-small aui-iconfont-devtools-file diff-entry-kind-icon">
                            File
                        </span>
                        filename.js
                        <button
                            type="button"
                            class="aui-button aui-button-subtle devtools-task-in-progress--button __rbb-btn-expandDiff"
                            title="Expand unexpanded diff sections once"
                            original-title="Expand unexpanded diff sections once"
                            style={{ position: 'relative' }}
                        >
                            <span class="aui-icon aui-icon-small aui-iconfont-devtools-task-in-progress">
                                Load all diff sections, once
                            </span>
                        </button>
                        <span class="diff-entry-lozenge aui-lozenge aui-lozenge-subtle aui-lozenge-complete">
                            Modified
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    </section>
)

test('`insertExpandDiff` should insert button', t => {
    const diff = cleanSection.cloneNode(true)

    insertExpandDiff(diff)

    t.is(diff.outerHTML, sectionWithButton.outerHTML)
})

test('`insertExpandDiff` should insert a button, even if other buttons already exist', t => {
    const sectionWithTwoButtons = (
        <section
            class="iterable-item bb-udiff maskable commentable-diff"
            data-path="filename.js"
            data-source-url="/api/internal/repositories/team/repo/src/a6a74247b1a9bc6d33661e28917459b36b50c5aa/filename.js"
            id="chg-filename.js"
            data-identifier="filename.js"
            data-filename="filename.js"
        >
            <div class="diff-container">
                <div class="heading">
                    <div class="primary">
                        <h1 class="filename">
                            <span class="aui-icon aui-icon-small aui-iconfont-devtools-file diff-entry-kind-icon">
                                File
                            </span>
                            filename.js
                            <button
                                type="button"
                                class="aui-button aui-button-subtle devtools-task-in-progress--button __rbb-btn-expandDiff"
                                title="Expand unexpanded diff sections once"
                                original-title="Expand unexpanded diff sections once"
                                style={{ position: 'relative' }}
                            >
                                <span class="aui-icon aui-icon-small aui-iconfont-devtools-task-in-progress">
                                    Load all diff sections, once
                                </span>
                            </button>
                            <button
                                type="button"
                                class="aui-button aui-button-subtle devtools-task-in-progress--button __rbb-btn-expandDiff"
                                title="Expand unexpanded diff sections once"
                                original-title="Expand unexpanded diff sections once"
                                style={{ position: 'relative' }}
                            >
                                <span class="aui-icon aui-icon-small aui-iconfont-devtools-task-in-progress">
                                    Load all diff sections, once
                                </span>
                            </button>
                            <span class="diff-entry-lozenge aui-lozenge aui-lozenge-subtle aui-lozenge-complete">
                                Modified
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )

    const diff = sectionWithButton.cloneNode(true)

    insertExpandDiff(diff)

    t.is(diff.outerHTML, sectionWithTwoButtons.outerHTML)
})
