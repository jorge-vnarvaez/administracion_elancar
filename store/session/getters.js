export default {
    getError(state) {
        return {
            value: state.error,
            errorMsg: state.errorMsg,
        }
    },
    getUser(state) {
        return state.user;
    }
}