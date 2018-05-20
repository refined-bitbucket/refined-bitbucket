import { h } from 'dom-chef'

import { getRepoURL } from '../page-detect'

const repoUrl = getRepoURL()

const linkifyTargetBranch = node => {
    const targetBranchSpan = node.querySelector(
        '.pull-request-target-branch span.name'
    )
    const targetBranchName = targetBranchSpan.textContent
    targetBranchSpan.removeChild(targetBranchSpan.lastChild)
    const a = (
        <a
            style={{ color: '#707070' }}
            title={targetBranchName}
            href={`https://bitbucket.org/${repoUrl}/branch/${targetBranchName}`}
        >
            {targetBranchName}
        </a>
    )
    targetBranchSpan.appendChild(a)
}

export default linkifyTargetBranch
