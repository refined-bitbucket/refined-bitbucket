import { h } from 'dom-chef';

import getApiToken from '../get-api-token';
import logger from '../logger';

import { getRepoURL } from '../page-detect';

import './source-branch.css';

const repoUrl = getRepoURL();

export const getPrSourceBranch = async prId => {
    const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${prId}`;
    const token = getApiToken();
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`
        })
    });

    const prData = await response.json();
    if (prData.error) {
        logger.error(
            `refined-bitbucket(source-branch): ${prData.error.message}`
        );
        return;
    }

    return prData.source.branch.name;
};

const buildSourceBranchNode = branchName => {
    return (
        <span class="__rbb-pull-request-source-branch">
            <span class="ref-label">
                <span class="ref branch">
                    <span class="name" aria-label={`branch ${branchName}`}>
                        <a
                            style={{ color: '#707070' }}
                            title={branchName}
                            href={`https://bitbucket.org/${repoUrl}/branch/${branchName}`}
                        >
                            {branchName}
                        </a>
                    </span>
                </span>
            </span>
        </span>
    );
};

export default async function addSourceBranch(prNode) {
    const prId = prNode.dataset.pullRequestId;
    const sourceBranchName = await getPrSourceBranch(prId);

    if (!sourceBranchName) {
        return;
    }

    const sourceBranchNode = buildSourceBranchNode(sourceBranchName);
    const arrow = prNode.querySelector(
        'span.aui-iconfont-devtools-arrow-right'
    );
    arrow.parentElement.insertBefore(sourceBranchNode, arrow);
}
