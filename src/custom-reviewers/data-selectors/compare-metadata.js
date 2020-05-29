// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import {
    getCurrentPullRequestAuthorAccountId,
    getCurrentUserAccountId,
} from '../../utils'

const authorId = getCurrentPullRequestAuthorAccountId()
const meId = getCurrentUserAccountId()

export function getAuthorReviewers(): IUser[] {
    const el = $('#compare-metadata')
    const authors = el.data('authors')
    if (!el || !Array.isArray(authors)) return []
    return authors.filter((u: IUser) => u.account_id !== (authorId || meId))
}

export function isUserAuthorReviewer(user: IUser): boolean {
    return getAuthorReviewers().some(
        (u: IUser) => u.account_id === user.account_id
    )
}
