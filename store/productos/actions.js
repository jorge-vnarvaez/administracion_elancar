export default {
    async loadProductos({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: [
                "*.*",
            ]
        });

        const { data } = await this.$axios.$get(`${this.$config.apiUrl}/items/productos?${query}`).then((res) => res);
        commit('setProductos', data);
    },
    applyFilters({ commit }, filters) {
        commit('setFilters', filters);
    },
    // filterByStringQuery({ commit }, query) {
    //     commit('setStringQuery', query);
    // }
}