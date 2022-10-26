export default {
    setCurrentProveedor({ commit }, proveedor) {
        commit('setCurrentProveedor', proveedor)
    },
    setReceptorCurrentProveedor({ commit }, receptor) {
        commit('setReceptorCurrentProveedor', receptor)
    },
    async fetchProveedores({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: ["id", "nombre", "casa_matriz.*", "receptores.*", "productos.productos_id.*",],
        });

        const data = await this.$axios
            .$get(`${this.$config.apiUrl}/items/proveedores?${query}`)
            .then((res) => res.data);

        commit('setCurrentProveedor', data[0]);
        commit('setProveedores', data);
    }
}