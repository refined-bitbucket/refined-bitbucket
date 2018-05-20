'use strict'

import { h } from 'dom-chef'
import 'selector-observer'
import { getRepoURL } from '../page-detect'

const COMPARE_DETAILS_SELECTOR = '#branch-compare.content-container'

export default function comparePagePullRequest() {
    /*
     * Changes to the compare details selector indicate that either:
     *  1) The Compare button has been hit for the first time
     *  2) The branches that are being compared have changed
     */
    document.body.observeSelector(COMPARE_DETAILS_SELECTOR, addUrlIfComparing)
}

function addUrlIfComparing() {
    const { source, destination } = getSourceAndDestination()

    if (source && destination) {
        addPRLink(source, destination)
    }
}

export function addPRLink(source, destination, comparePage = document.body) {
    // Get compare branches area
    const detailSummarySection = comparePage.querySelector(
        'ul.detail-summary--section'
    )
    const url = getPullRequestUrl(source, destination)

    // Remove Create PR link URL if it already exists
    const previousLink = detailSummarySection.querySelector(
        '.js-pr-create-item'
    )
    if (previousLink) {
        previousLink.parentNode.removeChild(previousLink)
    }

    const link = (
        <li className="detail-summary--item js-pr-create-item">
            <span
                className="aui-icon aui-icon-small aui-iconfont-devtools-pull-request detail-summary--icon"
                title="Pull requests"
            >
                Pull requests
            </span>
            <a href={url} title="Create a pull request">
                Create pull request
            </a>
        </li>
    )
    detailSummarySection.appendChild(link, detailSummarySection)
    return link
}

function getPullRequestUrl(source, destination) {
    return `https://bitbucket.org/${getRepoURL()}/pull-requests/new?source=${encodeURIComponent(
        source
    )}&dest=${encodeURIComponent(destination)}`
}

function getSourceAndDestination() {
    // This element contains all metadata about any current compare
    const branchCompare = document.querySelector(COMPARE_DETAILS_SELECTOR)

    // Get source and destination branch from data attributes
    const {
        compareSourceValue: source,
        compareDestValue: destination,
    } = branchCompare.dataset

    return { source, destination }
}
