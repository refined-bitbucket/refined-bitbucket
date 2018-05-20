import elementReady from 'element-ready'

export default async function closeAnchorBranch() {
    const closeAnchorBranchCheckbox = await elementReady(
        '#id_close_anchor_branch:not(:disabled)'
    )
    closeAnchorBranchCheckbox.checked = true
}
