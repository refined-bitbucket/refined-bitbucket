// @flow
export function ignoreWhitespaceSearchParam(prRow: Element) {
    const link: HTMLAnchorElement = (prRow.querySelector(
        'a[data-qa="pull-request-row-link"]'
    ): any)
    const url = new URL(link.href)
    const searchParams = new URLSearchParams(url.search)
    searchParams.set('w', '1')
    url.search = searchParams.toString()
    link.href = url.href
}

export function ignoreWhitespaceInit() {
    const toggle = document.querySelector('[data-key="ignoreWhitespace"]')
    if (toggle && toggle.getAttribute('aria-checked') === 'false') {
        toggle.click()
    }
}
