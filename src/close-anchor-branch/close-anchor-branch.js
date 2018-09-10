// @flow

import elementReady from 'element-ready'

export default async function closeAnchorBranch() {
    const closeAnchorBranchCheckbox: HTMLElement = await elementReady(
        '#id_close_anchor_branch:not(:disabled)'
    )
    // $FlowIgnore I want this to crash if the element is not an HTMLInputElement
    closeAnchorBranchCheckbox.checked = true
}
