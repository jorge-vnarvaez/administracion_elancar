export default {
    async loadSucursal({ commit }, id) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/items/empresas/${id}`).then(res => res.data);
        commit('setSucursal', data)
    },
    setSucursal({ commit }, sucursal) {
        commit('setSucursal', sucursal)
    }
}