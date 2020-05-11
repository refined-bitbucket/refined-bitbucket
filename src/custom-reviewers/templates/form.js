// @flow
import { h } from 'dom-chef'
import {
    clearReviewersFieldValue,
    getRecentReviewers,
    isUserRecentReviewer,
    getAuthorReviewers,
    isUserAuthorReviewer,
} from '../data-selectors'
import {
    clearSelectedReviewers,
    insertUsersToSelectedReviewers,
    initRecentReviewers,
    clearRecentReviewers,
    removeUserFromRecentReviewers,
    initAuthorReviewers,
    clearAuthorReviewers,
    removeUserFromAuthorReviewers,
} from '../ui-renderer'
import { getTypeaheadElement } from './typeahead'

const focusOnTypeaheadStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
}

const reviewersSectionStyle = {
    listStyle: 'none',
    padding: 0,
    marginBottom: 0,
    border: 0,
}

function handleFocusOnTypeaheadClick(): void {
    $('#search_reviewers .typeahead').focus()
}

function handleRemoveAllClick(): void {
    // Selected reviewers list
    clearReviewersFieldValue()
    clearSelectedReviewers()
    // Suggested recent reviewers list
    initRecentReviewers()
    // Suggested authors reviewers list
    initAuthorReviewers()
}

function handleRecentsAddAll(): void {
    const recents = getRecentReviewers()
    insertUsersToSelectedReviewers(recents)
    clearRecentReviewers()
    recents.forEach(
        (u: IUser) =>
            isUserAuthorReviewer(u) && removeUserFromAuthorReviewers(u)
    )
}

function handleAuthorsAddAll(): void {
    const authors = getAuthorReviewers()
    insertUsersToSelectedReviewers(authors)
    clearAuthorReviewers()
    authors.forEach(
        (u: IUser) =>
            isUserRecentReviewer(u) && removeUserFromRecentReviewers(u)
    )
}

const formElement: HTMLElement = (
    <div>
        <div class="select2-container select2-container-multi aui-select2-container text long-field">
            <ul
                id="selected_reviewers"
                class="select2-choices"
                style={{ marginBottom: 0 }}
            >
                <li
                    style={focusOnTypeaheadStyle}
                    onClick={handleFocusOnTypeaheadClick}
                />
                <li
                    class="select2-search-field"
                    onClick={handleFocusOnTypeaheadClick}
                    id="search_reviewers"
                    style={{ display: 'inline-block', background: 'white' }}
                >
                    {getTypeaheadElement()}
                </li>
                <a
                    title="Remove all"
                    onClick={handleRemoveAllClick}
                    class="select2-search-choice-close"
                />
            </ul>
        </div>

        <div className="select2-container select2-container-multi aui-select2-container text long-field __rbb_reviewers_container">
            <ul
                id="recent_reviewers"
                className="select2-choices"
                style={reviewersSectionStyle}
            >
                <li class="__rbb_reviewers_add_all __refined_bitbucket_hide">
                    Recents
                    <a href="#" title="Add All" onClick={handleRecentsAddAll} />
                </li>
            </ul>
        </div>
        <div className="select2-container select2-container-multi aui-select2-container text long-field __rbb_reviewers_container">
            <ul
                id="author_reviewers"
                className="select2-choices"
                style={reviewersSectionStyle}
            >
                <li class="__rbb_reviewers_add_all __refined_bitbucket_hide">
                    Authors
                    <a href="#" title="Add All" onClick={handleAuthorsAddAll} />
                </li>
            </ul>
        </div>
    </div>
)

export default formElement
