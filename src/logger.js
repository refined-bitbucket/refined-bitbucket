// @flow

const logger: typeof console = Object.keys(console).reduce(
    (previous, current) => {
        previous[current] = (...args: any[]) => {
            if (!process) {
                console[current](...args)
            }
        }
        return previous
    },
    {}
)

export default logger
