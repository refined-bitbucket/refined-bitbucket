require.load = function(context, moduleName, url) {
    var xhr = new XMLHttpRequest(),
        evalResponseText = function(xhr) {
            eval(xhr.responseText);
            context.completeLoad(moduleName);
        };

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // we have to specifically pass the window context or underscore
            // will fail since it defines "root = this"
            evalResponseText.call(window, xhr);
        }
    };
    xhr.send(null);
};
