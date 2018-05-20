import { h } from 'dom-chef'

export const cleanDocumentBody = () => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.lastChild)
    }
}

export const addApiTokenMetadata = () => {
    const meta = (
        <meta
            name="apitoken"
            content={'{"token": "...", "expiration": 1517595777.580439}'}
        />
    )
    document.head.appendChild(meta)
}
