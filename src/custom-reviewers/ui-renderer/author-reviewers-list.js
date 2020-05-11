// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import { getAuthorReviewerElement } from '../templates'
import { getReviewersFieldValue, getAuthorReviewers } from '../data-selectors'

export const getAuthorReviewerLineId = (user: IUser) =>
    `#__rbb_author_reviewer_${user.account_id}`

function findUserInAuthorReviewers(user: IUser): HTMLElement {
    return document.getElementById(getAuthorReviewerLineId(user))
}

function showAuthorsAddAllButton(): void {
    document
        .getElementById('author_reviewers')
        .querySelector('.__rbb_reviewers_add_all')
        .classList.remove('__refined_bitbucket_hide')
}

function hideAuthorsAddAllButton(): void {
    document
        .getElementById('author_reviewers')
        .querySelector('.__rbb_reviewers_add_all')
        .classList.add('__refined_bitbucket_hide')
}

export function insertUserToAuthorReviewers(user: IUser): void {
    if (findUserInAuthorReviewers(user)) return
    const el: HTMLElement = getAuthorReviewerElement(user)
    document.getElementById('author_reviewers').appendChild(el)
}

export function insertUsersToAuthorReviewers(users: IUser[]): void {
    const currentReviewers: string[] = getReviewersFieldValue()
    users
        .filter((u: IUser) => !currentReviewers.includes(u.account_id))
        .forEach((u: IUser) => insertUserToAuthorReviewers(u))
}

export function initAuthorReviewers(): void {
    const reviewers = getAuthorReviewers()
    if (reviewers.length === 0) {
        hideAuthorsAddAllButton()
    } else {
        showAuthorsAddAllButton()
        insertUsersToAuthorReviewers(reviewers)
    }
}

export function clearAuthorReviewers(): void {
    document
        .getElementById('author_reviewers')
        .querySelectorAll('li.select2-search-choice')
        .forEach((c: Element) => c.remove())
}

export function removeUserFromAuthorReviewers(user: IUser): void {
    const el: HTMLElement = findUserInAuthorReviewers(user)
    if (!el) return
    el.remove()
}
