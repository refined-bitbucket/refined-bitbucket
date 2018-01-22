import { URL } from 'url';
import test from 'ava';
import { h } from 'dom-chef';
import delay from 'yoctodelay';
import marked from 'marked';

import {
    getPullrequestTemplateUrls,
    insertPullrequestTemplate
} from '../src/pullrequest-template/pullrequest-template';
import { cleanDocumentBody } from './test-utils';

import './setup-jsdom';

test('should get repo\'s pull request template urls', t => {
    global.location = new URL(
        'https://www.bitbucket.org/user/repo/pull-requests/new'
    );

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
    );

    document.body.appendChild(branchSelect);

    const expected = [
        `/user/repo/raw/master/PULL_REQUEST_TEMPLATE.md`,
        `/user/repo/raw/master/docs/PULL_REQUEST_TEMPLATE.md`,
        `/user/repo/raw/master/.github/PULL_REQUEST_TEMPLATE.md`,
        `/user/repo/raw/master/.bitbucket/PULL_REQUEST_TEMPLATE.md`
    ];

    const actual = getPullrequestTemplateUrls();

    t.deepEqual(actual, expected);
});

test.serial(
    'should not insert pull request templates if didn\'t find them',
    async t => {
        const requests = Array.from(Array(4)).map(() => {
            return new Promise(resolve => {
                delay(100).then(() => resolve({ ok: false }));
            });
        });

        await insertPullrequestTemplate(requests);

        t.is(document.body.innerHTML, '');
    }
);

test.serial(
    'should insert pull request template in default editor',
    async t => {
        const templateContents = 'pull request template contents';
        const requests = [
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(templateContents)
            })
        ];

        const defaultEditor = <textarea id="id_description" />;
        delay(1000).then(() => document.body.appendChild(defaultEditor));

        await insertPullrequestTemplate(requests);

        t.is(defaultEditor.value, templateContents);

        cleanDocumentBody();
        await delay(16);
    }
);

test.serial(
    'should insert pull request template in Atlassian editor',
    async t => {
        const templateContents = 'pull request template contents';
        const requests = [
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(templateContents)
            })
        ];

        const atlassianEditor = (
            <ak-editor-bitbucket id="ak_editor_description">
                <div contenteditable="true" />
            </ak-editor-bitbucket>
        );
        delay(1000).then(() => document.body.appendChild(atlassianEditor));

        await insertPullrequestTemplate(requests);

        const richTemplateContents = marked(templateContents);
        t.is(atlassianEditor.firstChild.innerHTML, richTemplateContents);

        cleanDocumentBody();
        await delay(16);
    }
);
