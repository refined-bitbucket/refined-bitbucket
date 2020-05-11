// @flow

import { h } from 'dom-chef'
import { getActionsElement, formElement } from '../templates'

function insertForm(container: HTMLElement) {
    container.insertBefore(formElement, container.querySelector('#reviewers'))
}

function insertActions(container: HTMLElement, isTeamFeatureEnabled: boolean) {
    container.insertBefore(
        getActionsElement(isTeamFeatureEnabled),
        container.firstChild
    )
}

export { insertForm, insertActions }
