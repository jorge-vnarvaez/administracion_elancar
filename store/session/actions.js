export default {
    async login({ commit }, options) {
        try {
            const { data } = await this.$axios.post(`${this.$config.apiUrl}/api/auth/local`, {
                identifier: options.credenciales.username,
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