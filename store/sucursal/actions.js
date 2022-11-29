export default {
    async loadSucursal({ commit }, id) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/items/empresas/${id}`).then(res => res.data);
        commit('setSucursal', data)
    },
    async loadSucursales({ commit }) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/items/empresas`).then(res => res.data);
        commit('setSucursales', data)
    },
    setSucursal({ commit }, sucursal) {
        commit('setSucursal', sucursal)
    }
}