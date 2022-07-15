export default {
    setSession(state, data) {
        this.$cookies.set('jwt', data.session.jwt);

        const user = data.session.user;

        this.$cookies.set('userId', user.id);

        state.error = false;

        state.is_logged = true;

        this.$router.push(data.params);
    },
    removeSession(state) {
        this.$cookies.remove("userId");
        this.$cookies.remove("jwt");

        state.is_logged = false;

        this.$router.push("/");
    },
    hasLoginError(state) {
        state.error = true;
    }
}