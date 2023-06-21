export default {
    async loadSucursal({ commit }, id) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: [
                "*.*",
            ],
        });

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/items/sucursales/${id}?${query}`).then(res => res.data);
        commit('setSucursal', data)
    },
    async loadSucursales({ commit }) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/items/sucursales`).then(res => res.data);
        commit('setSucursales', data)
    },
    setSucursal({ commit }, sucursal) {
        commit('setSucursal', sucursal)
    }
}