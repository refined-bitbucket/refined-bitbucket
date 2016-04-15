require({
        baseUrl: chrome.extension.getURL("/"),
        paths: { jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min" }
    }, ["app/highlighter", "app/doubleClickWordSelection", "app/pullRequestActionsControl"],
    function(highlighter, doubleClickWordSelection, pullRequestActionsControl) {
        highlighter.run();
        doubleClickWordSelection.run();
        pullRequestActionsControl.run();
    }
);
