const INTERVAL = 50; // Interval in milliseconds.

/**
 * Waits some intervals until a specific element is displayed.
 * @return {Promise} Returns a promise that is fulfilled when it finds a specific element.
 */
module.exports = function waitForRender(selector) {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            const element = document.querySelector(selector);
            if (!element) {
                return;
            }

            // If element is rendered, stop the interval and continue.
            clearInterval(intervalId);
            resolve();
        }, INTERVAL);
    });
};
