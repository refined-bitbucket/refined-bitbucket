require({
        baseUrl: chrome.extension.getURL("/")
    }, ["app/highlighter"],
    function(highlighter) {
        highlighter.run();
    }
);
