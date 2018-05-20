/* eslint-disable operator-linebreak */
import { h } from 'dom-chef'

const onChange = ({ target, target: { checked: showComments } }) => {
    const diff = target.closest('section.bb-udiff')
    const comments = Array.from(
        diff.getElementsByClassName('comment-thread-container')
    )

    comments.forEach(comment => {
        comment.style.display = showComments ? '' : 'none'
    })
}

export default function insertShowComments(section) {
    // Diff failed because pull request is too big
    if (section.querySelector('div.too-big-message')) {
        return
    }

    section.observeSelector(
        'li.comment',
        () => onAddComment(section),
        () => onDeleteComment(section)
    )
}

function onAddComment(section) {
    const existingCheckbox = section.querySelector('.__rbb-show-comments input')

    // Show comments checkbox already exists
    if (existingCheckbox) {
        if (!existingCheckbox.checked) {
            existingCheckbox.checked = true
            existingCheckbox.dispatchEvent(new Event('change'))
        }

        return
    }

    const hasCommentsOnPreviousVersions = Boolean(
        section.getElementsByClassName('eclipsedcount').length
    )
    const showCommentsCheckbox = (
        <span class="__rbb-show-comments">
            <label
                style={{
                    'font-size': 12,
                    ...(hasCommentsOnPreviousVersions
                        ? null
                        : {
                              'margin-right': 10,
                          }),
                }}
            >
                <input type="checkbox" checked onChange={onChange} />
                Comments
            </label>
        </span>
    )

    const diffActions = section.querySelector('.diff-actions.secondary')
    diffActions.style.minWidth = '480px'
    diffActions.style.textAlign = 'right'
    diffActions.insertBefore(showCommentsCheckbox, diffActions.firstChild)
}

function onDeleteComment(section) {
    // Only remove if there are no comments left in the diff
    if (!section.querySelector('li.comment')) {
        const node = section.querySelector('.__rbb-show-comments')
        if (node) {
            node.remove()
        }
    }
}
