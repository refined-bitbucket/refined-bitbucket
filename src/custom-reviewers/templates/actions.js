// @flow
import { h } from 'dom-chef'
import {
    setStorageSyncValue,
    getDefaultReviewersStorageKey,
    getStorageSyncValue,
} from '../../storage'
import {
    getCurrentReviewers,
    prefetchAllReviewers,
    isDefaultReviewersSameThanSelected,
    getReviewersFieldValue,
} from '../data-selectors'

const smallButtonStlye = {
    height: 'initial',
    lineHeight: 'initial',
}

const buttonFeedback = (button, succeeded) => {
    if (succeeded) {
        button.style.backgroundColor = 'rgb(220,255,180)'
    } else {
        button.style.backgroundColor = 'rgb(255,200,200)'
    }

    setTimeout(() => {
        button.style.backgroundColor = ''
    }, 2000)
}

async function handleSaveSelectionAsDefault(e) {
    await setStorageSyncValue(
        getDefaultReviewersStorageKey(),
        getCurrentReviewers()
    )

    const savedReviewers: IUser[] = await getStorageSyncValue(
        getDefaultReviewersStorageKey()
    )
    const currentReviewersIds: string[] = getReviewersFieldValue()

    buttonFeedback(
        e.target,
        (savedReviewers || []).every(r =>
            currentReviewersIds.includes(r.account_id)
        )
    )
}

async function handleLoadAllUsers(e) {
    const result = await prefetchAllReviewers()
    buttonFeedback(e.target, result)
}

function handleManageReviewersTeams() {}

function getActionsElement(isTeamFeatureEnabled: boolean): HTMLElement {
    return (
        <div class="__rbb_reviewers_actions">
            <div style={{ flexGrow: 1 }} />
            <div class="aui-buttons">
                {/* upcoming feature */}
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
                    title="Load all available users as search results"
                >
                    Fetch All
                </button>
                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStlye}
                    onClick={handleSaveSelectionAsDefault}
                    title="Save current reviewers as default for this repository"
                >
                    Save As Default
                </button>
            </div>
        </div>
    )
}

export default getActionsElement
