// @flow

import { h } from 'dom-chef'

// Remove official reviewers search box
export function removeReviewerSearchField(): void {
    $('#s2id_reviewers').remove()
}

// Remove official suggested-recent reviewers list
export function removeRecentReviewersList(): void {
    $('div.suggested-reviewers').remove()
}

// Remove official suggested-author reviewers list
export function removeAuthorReviewersList(): void {
    $('div.commit-author-reviewers').remove()
}
