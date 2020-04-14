// @flow
// @jsx h

import { h } from 'dom-chef'

import './collapse-pull-request-description.css'

export default function collapsePullRequestDescription() {
    const description: ?HTMLDivElement = (document.querySelector(
        '.description'
    ): any)

    // eslint-disable-next-line no-eq-null, eqeqeq
    if (description == null) {
        console.warn(
            "refined-bitbucket(collapsePullRequestDescription): Can't find description node. This feature hasn't being adapted for the new PR UI."
        )
        return
    }

    if (description.getElementsByClassName('wiki-content').length === 0) return

    const descriptionContent: HTMLElement = (description.querySelector(
        'dd.wiki-content'
    ): any)

    const onClick = () => {
        // $FlowIgnore
        descriptionContent
            .querySelector('.__rbb-collapse-bar')
            .classList.toggle('__rbb-collapse-bar__collapsed')
        descriptionContent
            .querySelectorAll('svg')
            .forEach(svg => svg.classList.toggle('__refined_bitbucket_hide'))

        descriptionContent
            .querySelector('.__rbb-collapse-content')
            .classList.toggle('__refined_bitbucket_hide')
    }

    const collapseBar = (
        <button
            type="button"
            aria-label="Toggle description text"
            title="Toggle description text"
            class="__rbb-collapse-bar"
            onClick={onClick}
        >
            <svg
                aria-hidden="true"
                height="16"
                version="1.1"
                viewBox="0 0 10 16"
                width="10"
                data-arrow-direction="up"
            >
                <path
                    fill-rule="evenodd"
                    d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z"
                />
            </svg>
            <svg
                aria-hidden="true"
                height="16"
                version="1.1"
                viewBox="0 0 10 16"
                width="10"
                class="__refined_bitbucket_hide"
                data-arrow-direction="down"
            >
                <path
                    fill-rule="evenodd"
                    d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z"
                />
            </svg>
        </button>
    )

    const content = document.createElement('div')
    content.classList.add('__rbb-collapse-content')
    content.innerHTML = descriptionContent.innerHTML
    descriptionContent.innerHTML = ''
    descriptionContent.appendChild(content)
    descriptionContent.insertBefore(collapseBar, content)
}
