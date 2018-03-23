import { h } from 'dom-chef';
import test from 'ava';

import '../../test/setup-jsdom';

import { addPRLink } from './merge-page-pull-request';

test('mergePagePullRequest should add a create pull request link', t => {
    const comparePage = (
        <div class="detail-summary--panel" data-contributors="[]">
            <ul class="detail-summary--section" />
        </div>
    );

    const comparePageAddPR = (
        <div class="detail-summary--panel" data-contributors="[]">
            <ul class="detail-summary--section">
                <li class="detail-summary--item">
                    <span
                        class="aui-icon aui-icon-small aui-iconfont-devtools-pull-request detail-summary--icon"
                        title="Pull requests"
                    >
                        Pull requests
                    </span>
                    <a
                        href="https://bitbucket.org//pull-requests/new?source=TEST_SOURCE&amp;dest=TEST_DESTINATION"
                        title="Create a pull request"
                        class="js-pr-create"
                    >
                        Create pull request
                    </a>
                </li>
            </ul>
        </div>
    );

    addPRLink(comparePage, 'TEST_SOURCE', 'TEST_DESTINATION');

    t.is(comparePage.outerHTML, comparePageAddPR.outerHTML);
});
