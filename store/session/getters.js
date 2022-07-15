export default {
    getError(state) {
        return {
            value: state.error,
            errorMsg: state.errorMsg,
        }
    }
}