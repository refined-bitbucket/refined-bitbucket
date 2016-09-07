// Courtesy of http://underscorejs.org/
module.exports = function debounce(func, wait, immediate) {
    var timeout;

    return function () {
        let context = this;
        let args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
