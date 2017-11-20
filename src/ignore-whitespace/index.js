import {isPullRequestList} from '../page-detect';

export default {
    init
};

function init() {
    if (isPullRequestList()) {
        const links = document.querySelectorAll('a.pull-request-title');

        links.forEach(link => {
            const url = new URL(link.href);
            const searchParams = new URLSearchParams(url.search);
            searchParams.set('w', 1);
            url.search = searchParams.toString();
            link.href = url.href;
        });
    }
}
