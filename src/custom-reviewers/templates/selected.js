// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import {
    insertUserToRecentReviewers,
    insertUserToAuthorReviewers,
    removeUserFromSelectedReviewers,
    getSelectedReviewerLineId,
} from '../ui-renderer'
import {
    isUserAuthorReviewer,
    isUserRecentReviewer,
    removeReviewer,
} from '../data-selectors'
import getReviewerBadgeElement from './badge'

const handleSelectedReviewerRemoveClick = (user: IUser) => () => {
    removeUserFromSelectedReviewers(user)
    removeReviewer(user)
    if (isUserRecentReviewer(user)) {
        insertUserToRecentReviewers(user)
    }
    if (isUserAuthorReviewer(user)) {
        insertUserToAuthorReviewers(user)
    }
}

export default function getSelectedReviewerElement(user: IUser): HTMLElement {
    return (
        <li class="select2-search-choice" id={getSelectedReviewerLineId(user)}>
            {getReviewerBadgeElement(user)}
            <a
                title="Remove"
                onClick={handleSelectedReviewerRemoveClick(user)}
                class="select2-search-choice-close"
                tabindex="-1"
            />
        </li>
    )
}
