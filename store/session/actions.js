export default {
    async login({ commit }, options) {
        try {
            const { data } = await this.$axios.post(`${this.$config.apiUrl}/auth/login`, {
                email: options.credenciales.email,
                password: options.credenciales.password,
            })

            commit('setSession', { session: data, params: options.params});
        } catch(e) {
            commit('hasLoginError');
        }
    },
    async current({ commit }) {
        try {
            const { data } = await this.$axios.get(`${this.$config.apiUrl}/users/me`, {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get('access_token')}`,
                },
            });

            commit('setCurrentUser', { data });
        } catch(e) {

        }
    },
    desconectar({ commit }) {
        commit('removeSession');
    }
}