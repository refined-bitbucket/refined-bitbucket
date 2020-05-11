// @flow
import { h } from 'dom-chef'
import {
    setStorageSyncValue,
    getStorageSyncValue,
    getDefaultReviewersStorageKey,
} from '../../storage'
import { getRepoURL } from '../../page-detect'
import {
    getCurrentReviewers,
    saveSearchReviewersResults,
} from '../data-selectors'
import api from '../../api'
import debounce from '../../debounce'
import { IUserXHR, IUser, mapUsersXhrToUsers } from '../../_core/models'

const smallButtonStlye = {
    height: 'initial',
    lineHeight: 'initial',
}

async function handleSaveSelectionAsDefault() {
    await setStorageSyncValue(
        getDefaultReviewersStorageKey(),
        getCurrentReviewers()
    )
}

async function handleLoadAllUsers() {
    const dataPromises = Array.from({ length: 26 }).map((_, i) => {
        const q = String.fromCharCode(i + 65)
        return api.getSearchedUsers(q)
    })
    const data: IUserXHR[] = (await Promise.all(dataPromises)).flatMap(x => x)
    const users: IUser[] = mapUsersXhrToUsers(data)
    saveSearchReviewersResults(users)
}

function handleManageReviewersTeams() {}

function getActionsElement(isTeamFeatureEnabled: boolean): HTMLElement {
    return (
        <div class="__rbb_reviewers_actions">
            <div style={{ flexGrow: 1 }} />
            <div class="aui-buttons">
                {isTeamFeatureEnabled && (
                    <button
                        type="button"
                        class="aui-button"
                        title="Manage reviewers teams"
                        style={smallButtonStlye}
                        onClick={handleManageReviewersTeams}
                    >
                        Manage Teams
                    </button>
                )}
                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStlye}
                    onClick={handleLoadAllUsers}
                    title="Load all available users"
                >
                    Load All
                </button>
                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStlye}
                    onClick={handleSaveSelectionAsDefault}
                    title="Save current reviewers as default"
                >
                    Save as default
                </button>
            </div>
        </div>
    )
}

export default getActionsElement
