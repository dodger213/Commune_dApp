export default function useThrottling () {
    let timerId = null;
    function throttle(callback) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            callback();
        }, 1000);
    }

    return throttle;
}