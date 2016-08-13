module.exports = function getExtension(string) {
    return `.${string.slice((string.lastIndexOf('.') - 1 >>> 0) + 2)}`;
};
