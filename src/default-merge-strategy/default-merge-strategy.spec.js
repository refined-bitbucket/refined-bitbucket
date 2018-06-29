import { URL } from 'url'
import test from 'ava'
import { h } from 'dom-chef'
import delay from 'yoctodelay'

import '../../test/setup-jsdom'
import { cleanDocumentBody } from '../../test/test-utils'

import * as defaultMergeStrategy from './default-merge-strategy'

global.location = new URL('https://www.bitbucket.org')

test('should not try to choose default merge strategy on non-pull request pages', async t => {
    location.href = 'https://www.bitbucket.org/user/repo/is-not-a-pull-request'

    try {
        await defaultMergeStrategy.initAsync('squash')
        t.fail()
    } catch (err) {
        t.pass()
    }
})

test('should not choose default merge strategy twice', async t => {
    location.href = 'https://www.bitbucket.org/reyronald/repo/pull-requests/1'

    const script = <script id={defaultMergeStrategy.SCRIPT_ID} />
    document.body.appendChild(script)

    try {
        await defaultMergeStrategy.initAsync('squash')
        t.fail()
    } catch (err) {
        t.pass()
    }

    cleanDocumentBody()
})

test('should not choose default merge strategy if configured strategy is invalid', async t => {
    location.href = 'https://www.bitbucket.org/reyronald/repo/pull-requests/1'

    const script = <script id={defaultMergeStrategy.SCRIPT_ID} />
    document.body.appendChild(script)

    try {
        await defaultMergeStrategy.initAsync('invalid default merge strategy')
        t.fail()
    } catch (err) {
        t.pass()
    }

    cleanDocumentBody()
})

test.serial('should choose default merge strategy', async t => {
    location.href = 'https://www.bitbucket.org/reyronald/repo/pull-requests/1'

    const mergeButton = <button id="fulfill-pullrequest">Merge</button>
    document.body.appendChild(mergeButton)

    const promise = defaultMergeStrategy.initAsync('squash')

    mergeButton.click()

    const mergeStrategies = (
        <select
            class="select aui-select2 select2-offscreen"
            id="id_merge_strategy"
            name="merge_strategy"
        >
            <option value="merge_commit" data-default-commit-msg="...">
                Merge commit
            </option>
            <option value="squash" data-default-commit-msg="...">
                Squash
            </option>
            <option value="fast_forward" data-default-commit-msg="...">
                Fast forward
            </option>
        </select>
    )
    await delay(1000)
    document.body.appendChild(mergeStrategies)

    // Assert
    try {
        await promise
        if (defaultMergeStrategy.scriptAlreadyExists()) {
            t.pass()
        } else {
            t.fail()
        }
    } catch (err) {
        console.error(err)
        t.fail()
    }

    cleanDocumentBody()
})
