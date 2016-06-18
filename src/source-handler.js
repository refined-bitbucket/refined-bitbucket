module.exports.transformPreElement = function transformPreElement(preElement) {
    if (!preElement) {
        throw new Error('<pre> element parameter was not passed.');
    }
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.innerHTML = preElement.innerHTML;
    pre.appendChild(code);
    return pre;
};
