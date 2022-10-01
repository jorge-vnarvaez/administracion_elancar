export default {
    getPerformance(state) {
        return window.performance.now() - state.timeNow;
    }
}