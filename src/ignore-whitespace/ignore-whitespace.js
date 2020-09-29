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

export async function ignoreWhitespaceInit() {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('w') !== '1') {
        searchParams.append('w', '1')
        const nextUrl = window.location.pathname + '?' + searchParams.toString()
        window.location.replace(nextUrl)
    }
}
