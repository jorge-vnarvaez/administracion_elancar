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

            const qs = require('qs');

            const query = qs.stringify({
                fields: ['*.*', 'role.*']
            })


            const { data } = await this.$axios.get(`${this.$config.apiUrl}/users/me?${query}`, {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get('access_token')}`,
                },
            });

            commit('setCurrentUser', { data });
        } catch(e) {

        }
    },
    async refreshToken({ commit }, token) {
        console.log('refreshingToken');
        const refresh_token = this.$cookies.get('refresh_token');

         await this.$axios.post(`${this.$config.apiUrl}/auth/refresh`, {
            "refresh_token": refresh_token,
    }).then((res) => { 
        this.$cookies.remove('access_token');
        this.$cookies.remove('refresh_token');
        this.$cookies.set('refresh_token', res.data.data.refresh_token)
        this.$cookies.set('access_token', res.data.data.access_token)
    });

    },
    desconectar({ commit }) {
        commit('removeSession');
    }
}