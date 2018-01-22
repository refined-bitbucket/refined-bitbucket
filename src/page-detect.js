// Some of this functions are borrowed from https://github.com/sindresorhus/refined-github/blob/master/source/libs/page-detect.js

// Drops leading and trailing slash to avoid /\/?/ everywhere
const getCleanPathname = () => location.pathname.replace(/^[/]|[/]$/g, '');

export const getRepoURL = () => location.pathname.slice(1).split('/', 2).join('/');

// Parses a repo's subpage, e.g.
// '/user/repo/pull-requests/' -> 'pull-requests'
// '/user/repo/' -> ''
// returns false if the path is not a repo
const getRepoPath = () => {
    const match = /^[^/]+[/][^/]+[/]?(.*)$/.exec(getCleanPathname());
    return match && match[1];
};

export const isPullRequestList = () => getRepoPath() === 'pull-requests';

export const isPullRequest = () => getRepoPath().startsWith('pull-requests/');

export const isCreatePullRequestURL = () => getRepoPath() === 'pull-requests/new';

export const isEditPullRequestURL = () => getRepoPath().startsWith('pull-requests/update');
