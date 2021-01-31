// @flow

const isTestingEnvironment = process.env.NODE_ENV === 'test'

const logger: typeof console = Object.keys(console).reduce(
    (previous, current) => {
        previous[current] = (...args: any[]) => {
            if (!isTestingEnvironment) {
                console[current](...args)
            }
        }
        return previous
    },
    {}
)

export default logger
