'use strict';

import { h } from 'dom-chef';
import { isComparing, getRepoURL } from '../page-detect';

export default function init() {
    if (isComparing()) {
        const [, source, destination] = isComparing();
        addPRLink(document.querySelector('#content'), source, destination);
    }
}

export function addPRLink(comparePage, source, destination) {
    const detailSummarySection = comparePage.querySelector(
        'ul.detail-summary--section'
    );
    const url = getUrl(source, destination);

    const link = (
        <li className="detail-summary--item">
            <span
                className="aui-icon aui-icon-small aui-iconfont-devtools-pull-request detail-summary--icon"
                title="Pull requests"
            >
                Pull requests
            </span>
            <a
                href={url}
                title="Create a pull request"
                className="js-pr-create"
            >
                Create pull request
            </a>
        </li>
    );
    detailSummarySection.appendChild(link, detailSummarySection);
    return link;
}

function getUrl(source, destination) {
    /*
        Note: Bitbucket has some odd behaviour when applying query params to its pull request page
        It needs two colons '::' to be URL encoded in the query param of the new pull request page in place of the single colon.
        i.e. The source branch: 'refined-bitbucket/refined-bitbucket:dev' would have to be 'refined-bitbucket/refined-bitbucket::dev' when passed to the query param
    */
    return `https://bitbucket.org/${getRepoURL()}/pull-requests/new?source=${encodeURIComponent(
        source.replace(':', '::')
    )}&dest=${encodeURIComponent(destination.replace(':', '::'))}`;
}
