const logger = {}

Object.keys(console).forEach(method => {
    logger[method] = (...args) => {
        // Only warn when in browser, not when testing
        if (!process) {
            console[method](...args)
        }
    }
})

export default logger
