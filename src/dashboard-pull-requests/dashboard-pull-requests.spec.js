import test from 'ava'
import { h } from 'dom-chef'
import delay from 'yoctodelay'

import '../../test/setup-jsdom'
import { cleanDocumentBody } from '../../test/test-utils'

import insertDashboardOverviewFilters, {
    classFilter,
    filterNames,
    filterStyle,
} from './dashboard-pull-requests'

function initial() {
    return (
        <div>
            <div class="filter-container">
                <ul class="filter-status" />
            </div>
            <section id="pullrequests">
                <table>
                    <tbody>
                        <tr id="tr1" class="iterable-item">
                            <td>
                                <span class="aui-iconfont-error" />
                            </td>
                        </tr>
                        <tr id="tr2" class="iterable-item">
                            <td>
                                <div class="list-stat">
                                    <span class="aui-iconfont-editor-task" />
                                    <a class="approval-link" />
                                </div>
                            </td>
                        </tr>
                        <tr id="tr3" class="iterable-item">
                            <td>
                                <div class="list-stat">
                                    <a class="approval-link approved" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}

const expected = (
    <div>
        <div class="filter-container">
            <ul class="filter-status">
                <li>
                    <label>
                        <input
                            name="successfulBuilds"
                            style={filterStyle}
                            type="checkbox"
                        />
                        Successful builds
                    </label>
                </li>
                <li>
                    <label>
                        <input
                            name="allTasksResolved"
                            style={filterStyle}
                            type="checkbox"
                        />
                        All tasks resolved
                    </label>
                </li>
                <li>
                    <label>
                        <input
                            name="needsMyApproval"
                            style={filterStyle}
                            type="checkbox"
                        />
                        Needs my approval
                    </label>
                </li>
            </ul>
        </div>
        <section id="pullrequests">
            <table>
                <tbody>
                    <tr id="tr1" class="iterable-item">
                        <td>
                            <span class="aui-iconfont-error" />
                        </td>
                    </tr>
                    <tr id="tr2" class="iterable-item">
                        <td>
                            <div class="list-stat">
                                <span class="aui-iconfont-editor-task" />
                                <a class="approval-link" />
                            </div>
                        </td>
                    </tr>
                    <tr id="tr3" class="iterable-item">
                        <td>
                            <div class="list-stat">
                                <a class="approval-link approved" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
)

const isHidden = el => [...el.classList].includes('__refined_bitbucket_hide')

test.serial('should toggle sucessful builds properly', async t => {
    // Arrange
    const actual = initial()

    document.body.appendChild(actual)

    // Act
    await insertDashboardOverviewFilters()

    // Assert
    t.is(actual.outerHTML, expected.outerHTML)

    const checkbox = actual.querySelector(
        `input[name="${filterNames.successfulBuilds}"]`
    )

    const row1 = actual.querySelector('#tr1')
    const row2 = actual.querySelector('#tr2')
    const row3 = actual.querySelector('#tr3')

    t.false(row1.classList.contains(classFilter(filterNames.successfulBuilds)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    // Act
    await delay(100)
    checkbox.click()

    // Assert
    t.true(row1.classList.contains(classFilter(filterNames.successfulBuilds)))
    t.true(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    // Act
    await delay(100)
    checkbox.click()

    // Assert
    t.false(row1.classList.contains(classFilter(filterNames.successfulBuilds)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    cleanDocumentBody()
    await delay(20)
})

test.serial('should toggle all tasks resolved properly', async t => {
    // Arrange
    const actual = initial()

    document.body.appendChild(actual)

    // Act
    await insertDashboardOverviewFilters()

    // Assert
    t.is(actual.outerHTML, expected.outerHTML)

    const checkbox = actual.querySelector(
        `input[name="${filterNames.allTasksResolved}"]`
    )

    const row1 = actual.querySelector('#tr1')
    const row2 = actual.querySelector('#tr2')
    const row3 = actual.querySelector('#tr3')

    t.false(row2.classList.contains(classFilter(filterNames.allTasksResolved)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    // Act
    await delay(100)
    checkbox.click()

    // Assert
    t.true(row2.classList.contains(classFilter(filterNames.allTasksResolved)))
    t.false(isHidden(row1))
    t.true(isHidden(row2))
    t.false(isHidden(row3))

    // Act
    await delay(100)
    checkbox.click()

    // Assert
    t.false(row2.classList.contains(classFilter(filterNames.allTasksResolved)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    cleanDocumentBody()
    await delay(20)
})

test.serial('should toggle needs my approval properly', async t => {
    // Arrange
    const actual = initial()

    document.body.appendChild(actual)

    // Act
    await insertDashboardOverviewFilters()

    // Assert
    t.is(actual.outerHTML, expected.outerHTML)

    const checkbox = actual.querySelector(
        `input[name="${filterNames.needsMyApproval}"]`
    )

    const row1 = actual.querySelector('#tr1')
    const row2 = actual.querySelector('#tr2')
    const row3 = actual.querySelector('#tr3')

    t.false(row3.classList.contains(classFilter(filterNames.needsMyApproval)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    // Act
    await delay(100)
    checkbox.click()

    // Assert
    t.true(row3.classList.contains(classFilter(filterNames.needsMyApproval)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.true(isHidden(row3))

    // Act
    await delay(100)
    checkbox.click()

    // Assert
    t.false(row3.classList.contains(classFilter(filterNames.needsMyApproval)))
    t.false(isHidden(row1))
    t.false(isHidden(row2))
    t.false(isHidden(row3))

    cleanDocumentBody()
    await delay(20)
})
