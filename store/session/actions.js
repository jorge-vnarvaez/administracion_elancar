export default {
    async login({ commit }, options) {
        try {

            const qs = require("qs");

            const query = qs.stringify({
                fields: ["*.*", "role.*"],
            });

            const { data } = await this.$axios.post(`${this.$config.apiUrl}/auth/login`, {
                email: options.credenciales.email,
                password: options.credenciales.password,
            }).then(res => {
                return res
            })

            
            const current = await this.$axios.get(`${this.$config.apiUrl}/users/me?${query}`,
            {
                headers: {
                    Authorization: `Bearer ${data.data.access_token}`,
                },
            }).then(res => {
                return res.data
            })
            
            commit('setSession', { session: data, params: options.params });
            commit('setCurrentUser', { data: current });
        } catch (e) {
            commit('hasLoginError');
        }
    },
    async current({ commit }) {
        try {

            const qs = require('qs');

            const query = qs.stringify({
                fields: ['*.*', 'role.name']
            })


            const { data } = await this.$axios.get(`${this.$config.apiUrl}/users/me?${query}`, {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get('access_token')}`,
                },
            });

            commit('setCurrentUser', { data });
        } catch (e) {

        }
    },
    setCurrentRole({ commit }, role_name) {
        commit('setCurrentRole', role_name);
    },
    desconectar({ commit }) {
        commit('removeSession');
    }
}