import test from 'ava'
import { h } from 'dom-chef'
import flushPromises from 'flush-promises'
import { cleanDocumentBody } from '../../test/test-utils'
import '../../test/setup-jsdom'

import mergeCommitMessage from '.'

const mockFetchWithSuccessfulResponse = () => {
    global.fetch = url => {
        if (url.includes('MERGE_COMMIT_TEMPLATE')) {
            return Promise.resolve({
                ok: true,
                text: () =>
                    Promise.resolve(
                        '{title} (#{id})\n\n' +
                            '{sourceBranch} => {targetBranch}\n\n' +
                            '{description}\n\n' +
                            '{approvedByList}'
                    ),
            })
        }
        if (
            url ===
            'https://api.bitbucket.org/2.0/repositories/user/repo/pullrequests/1'
        ) {
            return Promise.resolve({
                json: () =>
                    Promise.resolve({
                        id: 1,
                        title: 'Title',
                        description: 'Description',
                        source: { branch: { name: 'source-branch' } },
                        destination: { branch: { name: 'destination-branch' } },
                        participants: [
                            {
                                approved: true,
                                user: {
                                    // eslint-disable-next-line camelcase
                                    display_name: 'Ronald Rey',
                                    username: 'reyronald',
                                },
                            },
                        ],
                    }),
            })
        }
    }
}

test('happy path functionality', async t => {
    // Arrange
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

    const node = (
        <section id="pullrequest" data-local-id="1">
            <a id="pr-menu-commits">Commits</a>
        </section>
    )
    document.body.appendChild(node)
    mockFetchWithSuccessfulResponse()

    const mergeButton = <button id="fulfill-pullrequest">Merge</button>
    document.body.appendChild(mergeButton)

    const textarea = <textarea id="id_commit_message" />
    document.body.appendChild(textarea)

    // Act
    await mergeCommitMessage()
    mergeButton.click()
    await flushPromises()

    // Assert
    t.is(
        textarea.value,
        'Title (#1)\n\n' +
            'source-branch => destination-branch\n\n' +
            'Description\n\n' +
            'Approved By: Ronald Rey <reyronald>'
    )

    cleanDocumentBody()
})
