import test from 'ava';
import delay from 'yoctodelay';
import { h } from 'dom-chef';
import closeAnchorBranch from '../src/close-anchor-branch';

import './setup-jsdom';

test('should check the "Close anchor branch" checkbox when creating/editing pr', async t => {
    const checkbox = (
        <input
            type="checkbox"
            id="id_close_anchor_branch"
            class="checkbox"
            name="close_anchor_branch"
            disabled
        />
    );

    const fieldGroup = (
        <div class="field-group reset-height">
            <label for="id_close_anchor_branch" class="reset-height">
                Close branch
            </label>
            <div class="checkbox">
                {checkbox}
                <label for="id_close_anchor_branch" class="">
                    Close <span class="branch-name">anchor-branch</span> after
                    the pull request is merged
                </label>
            </div>
        </div>
    );

    document.body.appendChild(fieldGroup);

    delay(100).then(() => checkbox.removeAttribute('disabled'));

    await closeAnchorBranch();

    t.is(checkbox.checked, true);
});
