export default function waitForPullRequestContents() {
    return new Promise((resolve, reject) => {
        const pullRequestContentsNode = document.getElementById(
            'pr-tab-content'
        );

        if (!pullRequestContentsNode) {
            reject('Current page is not a pull request');
        }

        new MutationObserver(function(mutations) {
            const maskRemoved = mutations.every(
                m =>
                    m.oldValue.includes('has-mask') &&
                    !m.target.classList.contains('has-mask')
            );
            if (maskRemoved) {
                this.disconnect();
                resolve(pullRequestContentsNode);
            }
        }).observe(pullRequestContentsNode, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ['class']
        });
    });
}
