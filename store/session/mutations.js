export default {
    setSession(state, data) {
        console.log(data);
        this.$cookies.set('access_token', data.session.data.access_token);
        this.$cookies.set('refresh_token', data.session.data.refresh_token);

        state.error = false;

        state.is_logged = true;

        this.$router.push(data.params);
    },
    removeSession(state) {
        this.$cookies.remove("access_token");

        state.is_logged = false;

        this.$router.push("/");
    },
    hasLoginError(state) {
        state.error = true;
    }
}