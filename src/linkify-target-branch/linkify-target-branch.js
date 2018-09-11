// @flow
// @jsx h

import { h } from 'dom-chef'
import { getRepoURL } from '../page-detect'

const linkifyTargetBranch = (node: Element) => {
    const repoUrl = getRepoURL()
    const targetBranchSpan: Node = (node.querySelector(
        '.pull-request-target-branch span.name'
    ): any)
    const targetBranchName = targetBranchSpan.textContent
    // $FlowIgnore
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
