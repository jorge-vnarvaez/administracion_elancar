export default {
    async getSucursal({ commit }, id) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/items/empresas/${id}`).then(res => res.data);
        commit('setSucursal', data)
    }
}