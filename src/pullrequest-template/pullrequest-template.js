import elementReady from 'element-ready';
import marked from 'marked';
import { getRepoURL } from '../page-detect';

export default function fetchAndInsertPullrequestTemplate(externalUrl) {
    const pullrequestTemplateUrls = getPullrequestTemplateUrls();
    const requests = pullrequestTemplateUrls.map(url =>
        fetch(url, { credentials: 'include' })
    );
    if (externalUrl) {
        requests.push(fetch(externalUrl));
    }
    insertPullrequestTemplate(requests);
}

export function getPullrequestTemplateUrls() {
    const repoURL = getRepoURL();

    const defaultBranch = (() => {
        const branchSelectValue = document.querySelector('select[name="dest"]')
            .value;
        return branchSelectValue.substring(
            branchSelectValue.lastIndexOf(':') + 1
        );
    })();

    const pullrequestTemplateUrls = [
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/PULL_REQUEST_TEMPLATE.md`,
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/docs/PULL_REQUEST_TEMPLATE.md`,
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/.github/PULL_REQUEST_TEMPLATE.md`,
        `https://bitbucket.org/${repoURL}/raw/${defaultBranch}/.bitbucket/PULL_REQUEST_TEMPLATE.md`
    ];

    return pullrequestTemplateUrls;
}

export async function insertPullrequestTemplate(requests) {
    const responses = await Promise.all(requests);
    const firstSuccessfulResponse = responses.find(response => response.ok);

    if (!firstSuccessfulResponse) {
        return;
    }

    const defaultEditor = elementReady('textarea[id="id_description"]');
    const atlassianEditor = elementReady(
        '#ak_editor_description div[contenteditable="true"]'
    );
    const editorPromises = [defaultEditor, atlassianEditor];
    const editor = await Promise.race(editorPromises);
    editorPromises.forEach(p => requestAnimationFrame(() => p.cancel()));

    const md = await firstSuccessfulResponse.text();

    if (editor instanceof HTMLTextAreaElement) {
        editor.value = md;
    } else if (editor instanceof HTMLDivElement) {
        const html = marked(md);
        editor.innerHTML = html;
    } else {
        console.warn(
            'refined-bitbucket(pullrequest-template): Could not find pull request editor.'
        );
    }
}
