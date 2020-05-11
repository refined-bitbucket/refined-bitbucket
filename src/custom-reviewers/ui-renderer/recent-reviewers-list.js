// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import { getRecentReviewerElement } from '../templates'
import { getReviewersFieldValue, getRecentReviewers } from '../data-selectors'

export const getRecentReviewerLineId = (user: IUser) =>
    `#__rbb_recent_reviewer_${user.account_id}`

function findUserInRecentReviewers(user: IUser): HTMLElement {
    return document.getElementById(getRecentReviewerLineId(user))
}

function showRecentsAddAllButton(): void {
    document
        .getElementById('recent_reviewers')
        .querySelector('.__rbb_reviewers_add_all')
        .classList.remove('__refined_bitbucket_hide')
}

function hideRecentsAddAllButton(): void {
    document
        .getElementById('recent_reviewers')
        .querySelector('.__rbb_reviewers_add_all')
        .classList.add('__refined_bitbucket_hide')
}

export function insertUserToRecentReviewers(user: IUser): void {
    if (findUserInRecentReviewers(user)) return
    const el: HTMLElement = getRecentReviewerElement(user)
    document.getElementById('recent_reviewers').appendChild(el)
}

export function insertUsersToRecentReviewers(users: IUser[]): void {
    const currentReviewers: string[] = getReviewersFieldValue()
    users
        .filter((u: IUser) => !currentReviewers.includes(u.account_id))
        .forEach((u: IUser) => insertUserToRecentReviewers(u))
}

export function initRecentReviewers(): void {
    const reviewers = getRecentReviewers()
    if (reviewers.length === 0) {
        hideRecentsAddAllButton()
    } else {
        showRecentsAddAllButton()
        insertUsersToRecentReviewers(reviewers)
    }
}

export function clearRecentReviewers(): void {
    document
        .getElementById('recent_reviewers')
        .querySelectorAll('li.select2-search-choice')
        .forEach((c: Element) => c.remove())
}

export function removeUserFromRecentReviewers(user: IUser): void {
    const el: HTMLElement = findUserInRecentReviewers(user)
    if (!el) return
    el.remove()
}
