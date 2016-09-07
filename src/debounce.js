// Courtesy of http://underscorejs.org/
module.exports = function debounce(func, wait, immediate) {
    var timeout;

    return function () {
        const context = this;
        const args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
