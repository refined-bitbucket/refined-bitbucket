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

function getRestrictedUserIds(): string[] {
    return [...getReviewersFieldValue(), authorId || meId]
}

function getSearchReviewersResults(): IUser[] {
    const results: IUser[] =
        $('#search_reviewers .typeahead.tt-input').data('results') || []
    const restrictedUserIds = getRestrictedUserIds()
    return results.filter(r => !restrictedUserIds.includes(r.account_id))
}

export function saveSearchReviewersResults(users: IUser[]): void {
    const element = $('#search_reviewers .typeahead.tt-input')
    const updatedResults = users.reduce((res, user) => {
        return res.some(u => u.account_id === user.account_id)
            ? res
            : [...res, user]
    }, element.data('results') || [])
    element.data('results', updatedResults)
}

export async function getSearchedReviewers(query: string): IUser[] {
    if (!query) return getSearchReviewersResults()

    const formattedQuery: string = _deburr(query)
    const response: IUserXHR[] = await api.getSearchedUsers(formattedQuery)
    const users: IUser[] = mapUsersXhrToUsers(response)
    saveSearchReviewersResults(users)

    const restrictedUserIds = getRestrictedUserIds()
    const usersFromQuery = users.filter(
        u => !restrictedUserIds.includes(u.account_id)
    )

    return usersFromQuery
}

export async function prefetchAllReviewers(): boolean {
    const dataPromises = Array.from({ length: 26 }).map((_, i) => {
        const q = String.fromCharCode(i + 65)
        return api.getSearchedUsers(q)
    })
    const data: IUserXHR[] = (await Promise.all(dataPromises)).flatMap(x => x)
    const users: IUser[] = mapUsersXhrToUsers(data)
    saveSearchReviewersResults(users)

    return users.length > 0
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
