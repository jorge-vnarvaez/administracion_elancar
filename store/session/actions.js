export default {
    async login({ commit }, options) {
        try {
            const { data } = await this.$axios.post(`${this.$config.apiUrl}/auth/login`, {
                email: options.credenciales.email,
                password: options.credenciales.password,
            });

            commit('setSession', { session: data, params: options.params});
        } catch(e) {
            commit('hasLoginError');
        }
    },
    desconectar({ commit }) {
        commit('removeSession');
    }
}