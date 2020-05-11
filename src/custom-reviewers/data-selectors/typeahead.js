// @flow
import { h } from 'dom-chef'
import _deburr from 'lodash.deburr'
import debounce from '../../debounce'
import {
    getReviewersFieldValue,
    addReviewer,
    isUserRecentReviewer,
} from './form-reviewers-input'
import { IUser, IUserXHR, mapUsersXhrToUsers } from '../../_core/models'
import {
    insertUserToSelectedReviewers,
    removeUserFromRecentReviewers,
    removeUserFromAuthorReviewers,
} from '../ui-renderer'
import { isUserAuthorReviewer } from './compare-metadata'
import {
    getCurrentPullRequestAuthorAccountId,
    getCurrentUserAccountId,
} from '../../utils'
import api from '../../api'

var authorId = getCurrentPullRequestAuthorAccountId()
var meId = getCurrentUserAccountId()

function getSearchReviewersResults(): IUser[] {
    const results: IUser[] =
        $('#search_reviewers .typeahead.tt-input').data('results') || []
    return results.filter(r => !getReviewersFieldValue().includes(r.account_id))
}

export function saveSearchReviewersResults(users: IUser[]): void {
    const updatedResults = users.reduce((res, user) => {
        return res.some(u => u.account_id === user.account_id)
            ? res
            : [...res, user]
    }, getSearchReviewersResults())
    $('#search_reviewers .typeahead.tt-input').data('results', updatedResults)
}

export async function getSearchedReviewers(query: string): IUser[] {
    if (!query) return getSearchReviewersResults()

    const alreadySelectedUserIds: string[] = [
        ...getReviewersFieldValue(),
        authorId || meId,
    ]
    const formattedQuery: string = _deburr(query)
    const response: IUserXHR[] = await api.getSearchedUsers(formattedQuery)
    const users: IUser[] = mapUsersXhrToUsers(response)
    const usersFromQuery = users.filter(
        u => !alreadySelectedUserIds.includes(u.account_id)
    )
    saveSearchReviewersResults(usersFromQuery)

    return usersFromQuery
}

export function addSearchedReviewer(user: IUser) {
    addReviewer(user)
    insertUserToSelectedReviewers(user)

    if (isUserRecentReviewer(user)) {
        removeUserFromRecentReviewers(user)
    }
    if (isUserAuthorReviewer(user)) {
        removeUserFromAuthorReviewers(user)
    }
}
