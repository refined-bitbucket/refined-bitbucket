// @flow

import onetime from 'onetime'

// Some of this functions are borrowed from https://github.com/sindresorhus/refined-github/blob/master/source/libs/page-detect.js

// Drops leading and trailing slash to avoid /\/?/ everywhere
const getCleanPathname = () => location.pathname.replace(/^[/]|[/]$/g, '')

// '/user/repo/.../...' -> 'user/repo'
// eslint-disable-next-line no-warning-comments
// FIXME TODO: I noticed much later that maybe this could simply be:
// `JSON.parse(document.body.dataset.currentRepo).fullslug`
// Confirm, compare perf and replace if better.
export const getRepoURL = onetime(() =>
    location.pathname
        .slice(1)
        .split('/', 2)
        .join('/')
)

// Parses a repo's subpage, e.g.
// '/user/repo/pull-requests/' -> 'pull-requests'
// '/user/repo/' -> ''
// returns false if the path is not a repo
const getRepoPath = () => {
    const match = /^[^/]+[/][^/]+[/]?(.*)$/.exec(getCleanPathname())
    return (match && match[1]) || ''
}

export const isPullRequestList = () => getRepoPath() === 'pull-requests'

export const isPullRequest = () => /^pull-requests\/\d+/.test(getRepoPath())

export const getPullRequestId = () => {
    const repoPath = getRepoPath()
    const matches = repoPath.match(/pull-requests\/(\d*)/)
    return matches ? matches[1] || null : null
}

export const isComparePage = () => /^branches\/compare/.exec(getRepoPath())

export const isCreatePullRequestURL = () =>
    getRepoPath() === 'pull-requests/new'

export const isEditPullRequestURL = () =>
    getRepoPath().startsWith('pull-requests/update')

export const isCommit = () => getRepoPath().startsWith('commits/')

export const isBranch = () => getRepoPath().startsWith('branch/')

export const isDashBoardOverview = () =>
    getRepoURL().startsWith('dashboard/overview')
