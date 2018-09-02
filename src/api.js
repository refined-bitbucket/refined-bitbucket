import logger from './logger'
import { getRepoURL } from './page-detect'
import { getApiToken } from './utils'

const repoUrl = getRepoURL()
const token = getApiToken()

const api = {
    getPullrequest(id) {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}`
        return get(url)
    },
    getPullrequestActivity(id) {
        const url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/activity?pagelen=1`
        return get(url)
    },
}

async function get(url) {
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })
    const result = await response.json()

    if (result.error) {
        logger.error(
            `refined-bitbucket(augment-pr-entry): ${result.error.message}`
        )
        return
    }

    return result
}

export default api
