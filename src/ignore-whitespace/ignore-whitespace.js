export default function init(prRow) {
    const link = prRow.querySelector('a.pull-request-title')
    const url = new URL(link.href)
    const searchParams = new URLSearchParams(url.search)
    searchParams.set('w', 1)
    url.search = searchParams.toString()
    link.href = url.href
}
