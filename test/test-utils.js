import { h } from 'dom-chef'
import onetime from 'onetime'

export const cleanDocumentBody = () => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.lastChild)
    }
}

export const addApiTokenMetadata = onetime(() => {
    const meta = (
        <meta
            name="apitoken"
            content={'{"token": "...", "expiration": 1517595777.580439}'}
        />
    )
    document.head.appendChild(meta)
})

export const setUrlLocation = () => {
    global.location = new URL('https://www.bitbucket.org/user/repo')
}
