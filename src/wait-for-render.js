const INTERVAL = 50; // Interval in milliseconds.
const TIMEOUT = 5000;

/**
 * Waits some intervals until a specific element is displayed.
 * @return {Promise} Returns a promise that is fulfilled when it finds a specific element.
 */
module.exports = function waitForRender(selector) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);

        if (element) {
            resolve(element);
        }

        let totalWaitTime = 0;
        const intervalId = setInterval(() => {
            if (totalWaitTime === TIMEOUT) {
                reject(
                    new Error(
                        `waitForRender: Couldn't find the element ${selector}`
                    )
                );
            }

            const element = document.querySelector(selector);
            if (!element) {
                totalWaitTime += INTERVAL;
                return;
            }

            // If element is rendered, stop the interval and continue.
            clearInterval(intervalId);
            resolve(element);
        }, INTERVAL);
    });
};
