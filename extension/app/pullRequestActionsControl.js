/* jshint esversion: 6 */

define(['../var/document', 'jquery'], function(document, jquery) {
    'use strict';

    const MIN_APPROVALS_REQ = 2;

    function hasMinApprovals() {
        let approvals = parseInt(document.getElementsByClassName('approvals')[0].innerHTML),
            hasMinApprovals = approvals && approvals >= MIN_APPROVALS_REQ;

        return hasMinApprovals;
    }

    function setupHandlers() {
        // Button element and number of approvals element are recreated after each click.
        // So wait 500ms for elements rendering and bind the event handler again.
        // TODO: It's working now but I think we can change this fixed time waiting
        // for something smarter.
        $("#approve-button").on("click", function() {

            setTimeout(function() {
                setMergeState();

                if (hasMinApprovals()) {
                    var ok = confirm("Merge pull request?");
                    if (ok) {
                        let mergeButton = document.getElementById('fulfill-pullrequest');
                        mergeButton.click();
                    }
                }

                setupHandlers();
            }, 500);
        });
    }

    function setMergeState() {
        let mergeButton = document.getElementById('fulfill-pullrequest');
        mergeButton.disabled = !hasMinApprovals();
    }

    return {
        run: function() {
            setMergeState();
            setupHandlers();
        }
    };
});
