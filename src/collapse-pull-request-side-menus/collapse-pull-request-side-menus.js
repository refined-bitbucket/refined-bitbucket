export default function collapsePullRequestSideMenus(windowWidth) {
    if (windowWidth > 0 && windowWidth < window.innerWidth) return

    const left = document.querySelector(
        'button[data-qa-id="expand-collapse-button"][aria-expanded="true"]'
    )
    if (left) left.click()

    const right = document.querySelector(
        '#PullRequestWelcomeTourTarget-Sidebar button[data-testid="collapse-sidebar-button"][aria-expanded="true"]'
    )
    if (right) right.click()
}
