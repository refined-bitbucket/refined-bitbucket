import test from 'ava'
import { h } from 'dom-chef'
import delay from 'yoctodelay'
import marked from 'marked'

import '../../test/setup-jsdom'
import { cleanDocumentBody } from '../../test/test-utils'

import {
    getPullrequestTemplateUrls,
    insertPullrequestTemplate,
} from './pullrequest-template'

function setDocumentBodyAttributes() {
    document.body.setAttribute(
        'data-current-repo',
        JSON.stringify({
            scm: 'git',
            readOnly: false,
            mainbranch: { name: 'develop' },
            uuid: '12345678-4347-405e-96a4-600fd01e5f90',
            language: 'javascript',
            owner: {
                username: 'user',
                uuid: '12345678-929f-4bf1-b5e3-764d1bc80101',
                isTeam: true,
            },
            fullslug: 'user/repo',
            slug: 'repo',
            id: 1,
            pygmentsLanguage: 'javascript',
        })
    )
}

test("should get repo's pull request template urls", t => {
    setDocumentBodyAttributes()

    const branchSelect = (
        <select
            data-placeholder="Select destination branch…"
            data-repo="user/repo"
            data-field="dest"
            class="branch-field select2-offscreen"
            tabindex="-1"
            name="dest"
        >
            <optgroup label="Branches">
                <option value="user/repo:8e70157fd541:branch-1">
                    branch-1
                </option>
                <option value="user/repo:9140a9b18ec3:branch-2">
                    branch-2
                </option>
                <option
                    selected=""
                    data-mainbranch="true"
                    value="user/repo:548a0cb7aa77:master"
                >
                    master
                </option>
            </optgroup>
        </select>
    )

    document.body.appendChild(branchSelect)

    const expected = [
        'https://bitbucket.org/user/repo/raw/develop/PULL_REQUEST_TEMPLATE.md',
        'https://bitbucket.org/user/repo/raw/develop/docs/PULL_REQUEST_TEMPLATE.md',
        'https://bitbucket.org/user/repo/raw/develop/.github/PULL_REQUEST_TEMPLATE.md',
        'https://bitbucket.org/user/repo/raw/develop/.bitbucket/PULL_REQUEST_TEMPLATE.md',
    ]

    const actual = getPullrequestTemplateUrls()

    t.deepEqual(actual, expected)
})

test.serial(
    'should insert pull request template in default editor',
    async t => {
        setDocumentBodyAttributes()

        const templateContents = 'pull request template contents'

        const defaultEditor = <textarea id="id_description" />
        delay(100).then(() => document.body.appendChild(defaultEditor))

        await insertPullrequestTemplate(templateContents)

        t.is(defaultEditor.value, templateContents)

        cleanDocumentBody()
        await delay(16)
    }
)

test.serial(
    'should insert pull request template in Atlassian editor with commits',
    async t => {
        setDocumentBodyAttributes()
        const prCommits = true

        const templateContents = 'pull request template contents'

        const atlassianEditor = (
            <ak-editor-bitbucket id="ak_editor_description">
                <div contenteditable="true">
                    <ul class="ak-ul" data-indent-level="1">
                        <li>
                            <p>feat: example commit in list</p>
                        </li>
                        <li>
                            <p>feat: second commit example in list</p>
                        </li>
                    </ul>
                </div>
            </ak-editor-bitbucket>
        )
        const editorCurrentCommits = atlassianEditor.firstChild.innerHTML

        delay(100).then(() => document.body.appendChild(atlassianEditor))

        await insertPullrequestTemplate(templateContents, prCommits)

        let richTemplateContents = marked(templateContents)
        if (prCommits) {
            richTemplateContents += editorCurrentCommits
        }
        t.is(atlassianEditor.firstChild.innerHTML, richTemplateContents)

        cleanDocumentBody()
        await delay(16)
    }
)

test.serial(
    'should insert pull request template in Atlassian editor without commits',
    async t => {
        setDocumentBodyAttributes()
        const prCommits = false

        const templateContents = 'pull request template contents'

        const atlassianEditor = (
            <ak-editor-bitbucket id="ak_editor_description">
                <div contenteditable="true" />
            </ak-editor-bitbucket>
        )
        delay(100).then(() => document.body.appendChild(atlassianEditor))

        await insertPullrequestTemplate(templateContents, prCommits)

        const richTemplateContents = marked(templateContents)
        t.is(atlassianEditor.firstChild.innerHTML, richTemplateContents)

        cleanDocumentBody()
        await delay(16)
    }
)
