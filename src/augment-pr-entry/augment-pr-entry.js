/* eslint operator-linebreak: "off" */

import { h } from 'dom-chef';
import { ago } from 'time-ago';

import getApiToken from '../get-api-token';
import logger from '../logger';
import { getRepoURL } from '../page-detect';

import './augment-pr-entry.css';
import linkifyTargetBranch from '../linkify-target-branch/linkify-target-branch';

const repoUrl = getRepoURL();

export const getPrData = async (prId, collection) => {
    const baseUrl = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${prId}`;
    const url =
        typeof collection === 'undefined'
            ? baseUrl
            : `${baseUrl}/${collection}`;

    const token = getApiToken();
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`
        })
    });
    const prData = await response.json();

    if (prData.error) {
        logger.error(
            `refined-bitbucket(augment-pr-entry): ${prData.error.message}`
        );
        return;
    }

    return prData;
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

export const addSourceBranch = async (prNode, prData) => {
    const sourceBranchNode = buildSourceBranchNode(prData.source.branch.name);
    const arrow = prNode.querySelector(
        'span.aui-iconfont-devtools-arrow-right'
    );
    arrow.parentElement.insertBefore(sourceBranchNode, arrow);
};

export const addCreationDate = async (prNode, prData) => {
    const date = new Date(prData.created_on);
    const dateString = date.toDateString();
    const creationDateNode = (
        <div title={dateString} datetime={prData.created_on}>
            Created on {dateString} ({ago(date)})
        </div>
    );

    const prNumberAndTimestamp = prNode.querySelector(
        '.pr-number-and-timestamp'
    );
    prNumberAndTimestamp.append(<br />);
    prNumberAndTimestamp.appendChild(creationDateNode);
};

export const addUsernameWithLatestUpdate = async (prNode, prActivity) => {
    // pull requests by default have the initial commit info as an activity
    const mostRecentAction = prActivity.values[0];
    let author = '';

    // merges, commit updates
    if (mostRecentAction.update) {
        author = mostRecentAction.update.author.display_name;
    } else if (mostRecentAction.approval) {
        // approvals
        author = mostRecentAction.approval.user.display_name;
    } else if (mostRecentAction.comment) {
        // comments
        author = mostRecentAction.comment.user.display_name;
    }

    const prUpdateTime = prNode.querySelector('.pr-number-and-timestamp')
        .firstElementChild;
    prUpdateTime.append(` by ${author}`);
};

export default async function augmentPrEntry(prNode) {
    linkifyTargetBranch(prNode);

    const prId = prNode.dataset.pullRequestId;
    const prData = await getPrData(prId);
    const prActivity = await getPrData(prId, 'activity');

    if (!prData) {
        return;
    }

    await addSourceBranch(prNode, prData);
    await addUsernameWithLatestUpdate(prNode, prActivity);
    await addCreationDate(prNode, prData);
}
