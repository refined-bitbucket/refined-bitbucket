// @flow
import _deburr from 'lodash.deburr'
import { h } from 'dom-chef'
import elementReady from 'element-ready'
import 'typeahead'
import debounce from '../../debounce'
import { IUser } from '../../_core/models'
import { getRepoURL } from '../../page-detect'
import { getSearchedReviewers, addSearchedReviewer } from '../data-selectors'

type BloodhoundResultTemplate = $Exact<{ query: String, dataset: string }>

export function getTypeaheadElement(): HTMLInputElement {
    return (
        <input
            type="text"
            placeholder="Search..."
            class="typeahead"
            style={{ height: 'inherit' }}
        />
    )
}

const getSearchReviewerResultLineId = (user: IUser) =>
    `#__rbb_search_reviewer_result_${user.account_id}`

function getNotFoundResultElement({
    query,
}: BloodhoundResultTemplate): HTMLElement {
    return (
        <div class="empty-message">
            <div class="select2-no-results tt-suggestion">
                {query
                    ? `Found no matches for ${query}`
                    : `Continue typing to search for a user`}
            </div>
        </div>
    )
}

function getSuggestionResultElement(user: IUser): HTMLElement {
    const { display_name: name, nickname } = user
    const username = nickname == name ? '' : nickname
    const title = [name, username].filter(Boolean).join(' - ')

    return (
        <div title={title} id={getSearchReviewerResultLineId(user)}>
            <span class="mention-result">
                <span class="aui-avatar aui-avatar-small mention-result--avatar">
                    <span class="aui-avatar-inner">
                        <img src={user.avatar} />
                    </span>
                </span>
                <span class="display-name mention-result--display-name">
                    {name}
                </span>
                <span class="username mention-result--secondary-name mention-result--username">
                    {username ? `(${username})` : ''}
                </span>
                {user.is_teammate && (
                    <span class="aui-lozenge mention-result--lozenge">
                        teammate
                    </span>
                )}
            </span>
        </div>
    )
}

function selectReviewer(event: JQueryEventObject, user: IUser) {
    addSearchedReviewer(user)
    const input = $(event.delegateTarget)
    input.focus()
    input.typeahead('val', '')
}

const handleQuerySearch = debounce(
    (query: string, callback: () => void, asyncCallback: () => IUser[]) =>
        getSearchedReviewers(query).then(x => asyncCallback(x)),
    100
)

export async function initTypeaheadElement(
    container: HTMLElement
): HTMLElement {
    var input = await elementReady('#search_reviewers .typeahead')
    var repoUrl = getRepoURL()

    $(input).typeahead(
        {
            hint: true,
            highlight: true,
            minLength: 0,
        },
        {
            name: 'search-reviewers',
            source: handleQuerySearch,
            async: true,
            limit: null,
            display: 'display_name',
            templates: {
                notFound: getNotFoundResultElement,
                suggestion: getSuggestionResultElement,
            },
        }
    )
    $(input).bind('typeahead:select', selectReviewer)
    $(input).bind('typeahead:autocomplete', selectReviewer)
    // Move dropdown trapped in <ul> container
    var dropdown = await elementReady(
        '#search_reviewers .twitter-typeahead .tt-menu'
    )
    $(dropdown).insertAfter('#selected_reviewers')
}
