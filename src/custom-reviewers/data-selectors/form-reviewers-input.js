// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'

export function clearReviewersFieldValue(): void {
    $('#reviewers')
        .val('') // clear field value: selected ids
        .data('selected', '') // clear field data: selected users
}

export function getRecentReviewers(): IUser[] {
    return $('#reviewers').data('suggested') || []
}

export function isUserRecentReviewer(user: IUser): boolean {
    return getRecentReviewers().some(
        (s: IUser) => s.account_id === user.account_id
    )
}

export function getDefaultReviewers(): IUser[] {
    return $('#reviewers').data('reviewers') || []
}

export function isUserDefaultReviewer(user: IUser): boolean {
    return getDefaultReviewers().some(
        (s: IUser) => s.account_id === user.account_id
    )
}

export function getReviewersFieldValue(): string[] {
    return $('#reviewers')
        .val()
        .split(',')
        .filter(Boolean)
}

export function getCurrentReviewers(): IUser[] {
    return $('#reviewers').data('selected') || []
}

export function setCurrentReviewers(users: IUser[]): void {
    $('#reviewers').data('selected', users)
}

export function setReviewersFieldValue(reviewerIds: string[]): void {
    $('#reviewers').val([...new Set(reviewerIds.filter(Boolean))].join(','))
}

export function resetReviewers(users: IUser[]): void {
    setCurrentReviewers(users)
    setReviewersFieldValue(users.map(({ account_id: id }: IUser) => id))
}

export function addReviewers(users: IUser[]): void {
    const updatedReviewers: IUser[] = users.reduce(
        (result: IUser[], reviewer: IUser) =>
            result.some(u => u.account_id === reviewer.account_id)
                ? result
                : [...result, reviewer],
        getCurrentReviewers()
    )

    setCurrentReviewers(updatedReviewers)
    setReviewersFieldValue(updatedReviewers.map(u => u.account_id))
}

export function removeReviewers(users: IUser[]): void {
    const reviewerIdsToRemove: string[] = users.map(u => u.account_id)

    const updatedReviewers: IUser[] = getCurrentReviewers().filter(
        u => !reviewerIdsToRemove.includes(u.account_id)
    )
    setCurrentReviewers(updatedReviewers)
    setReviewersFieldValue(updatedReviewers.map(u => u.account_id))
}

export function addReviewer(user: IUser): void {
    const currentReviewers: IUser[] = getCurrentReviewers()
    if (currentReviewers.some(u => u.account_id === user.account_id)) return

    const updatedReviewers: IUser[] = [...currentReviewers, user]
    setCurrentReviewers(updatedReviewers)
    setReviewersFieldValue(updatedReviewers.map(u => u.account_id))
}

export function removeReviewer(user: IUser): void {
    const updatedReviewers: IUser[] = getCurrentReviewers().filter(
        u => u.account_id !== user.account_id
    )
    console.log(updatedReviewers)
    setCurrentReviewers(updatedReviewers)
    setReviewersFieldValue(updatedReviewers.map(u => u.account_id))
}
