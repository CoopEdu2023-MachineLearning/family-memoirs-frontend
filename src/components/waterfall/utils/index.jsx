// Function to perform deep copy using JSON methods
export function deep_JSON(data) {
    return JSON.parse(JSON.stringify(data));
}

/** 
 * Throttle function to limit the rate at which a function can fire.
 * Executes the function only once within a specified time interval.
 * 
 * @param {Function} func - The function to throttle.
 * @param {number} time - The time interval in milliseconds.
 * @returns {Function} A function that can be used to bind to events, and it will throttle the function calls.
 */
export const throttle = (func, time) => {
    // Throttle flag to manage the function execution
    let flag = false;

    return function (...argu) {
        if (flag) return;

        const context = this;
        flag = true;
        func.apply(context, argu);  // Call the function with the given context and arguments

        // Reset the flag after the specified time interval
        setTimeout(() => {
            flag = false;
        }, time);
    };
};
