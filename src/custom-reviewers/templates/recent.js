// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import {
    insertUserToSelectedReviewers,
    removeUserFromAuthorReviewers,
    removeUserFromRecentReviewers,
    getRecentReviewerLineId,
} from '../ui-renderer'
import { addReviewer, isUserAuthorReviewer } from '../data-selectors'
import getReviewerBadgeElement from './badge'

const handleRecentReviewerAddClick = (user: IUser) => () => {
    removeUserFromRecentReviewers(user)
    addReviewer(user)
    insertUserToSelectedReviewers(user)
    if (isUserAuthorReviewer(user)) {
        removeUserFromAuthorReviewers(user)
    }
}

export default function getRecentReviewerElement(user: IUser): HTMLElement {
    return (
        <li class="select2-search-choice" id={getRecentReviewerLineId(user)}>
            {getReviewerBadgeElement(user)}
            <a
                href="#"
                title="Add"
                onClick={handleRecentReviewerAddClick(user)}
                class="select2-search-choice-close"
                style={{ transform: 'rotate(135deg)' }}
                tabindex="-1"
            />
        </li>
    )
}
