// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import {
    removeUserFromAuthorReviewers,
    getAuthorReviewerLineId,
    insertUserToSelectedReviewers,
    removeUserFromRecentReviewers,
} from '../ui-renderer'
import { addReviewer, isUserRecentReviewer } from '../data-selectors'
import getReviewerBadgeElement from './badge'

const handleAuthorReviewerAddClick = (user: IUser) => () => {
    removeUserFromAuthorReviewers(user)
    addReviewer(user)
    insertUserToSelectedReviewers(user)
    if (isUserRecentReviewer(user)) {
        removeUserFromRecentReviewers(user)
    }
}

export default function getAuthorReviewerElement(user: IUser): HTMLElement {
    return (
        <li class="select2-search-choice" id={getAuthorReviewerLineId(user)}>
            {getReviewerBadgeElement(user)}
            <a
                href="#"
                title="Add"
                onClick={handleAuthorReviewerAddClick(user)}
                class="select2-search-choice-close"
                style={{ transform: 'rotate(135deg)' }}
                tabindex="-1"
            />
        </li>
    )
}
