// @flow
/* eslint-disable camelcase */
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'

export default function getReviewerBadgeElement(user: IUser): HTMLElement {
    const { display_name, avatar } = user
    return (
        <div class="__rbb-reviewer-badge">
            <div class="aui-avatar aui-avatar-xsmall">
                <div class="aui-avatar-inner">
                    <img src={avatar} />
                </div>
            </div>
            <span>{display_name}</span>
        </div>
    )
}
/* eslint-enable camelcase */
