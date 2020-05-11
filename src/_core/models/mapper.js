// @flow

import { h } from 'dom-chef'
import { IUser } from './user'
import { IUserXHR } from './user-xhr'

export function mapUserXhrToUser(userXhr: IUserXHR): IUser {
    /* eslint-disable camelcase */
    return {
        avatar: userXhr.avatar_url,
        display_name: userXhr.display_name,
        is_team: userXhr.is_team,
        is_teammate: userXhr.is_teammate,
        account_id: userXhr.mention_id,
        nickname: userXhr.nickname,
    }
    /* eslint-enable camelcase */
}

export function mapUsersXhrToUsers(usersXhr: IUserXHR[]): IUser[] {
    return usersXhr.map(u => mapUserXhrToUser(u))
}
