export default {
    async setCarro({ commit }, carro) {
        await commit('setCarro', carro)
    },
    // Add product to cart
    addProductToCart({ commit }, { producto, cantidad }) {
        commit('addProductToCart', { producto, cantidad })
    },
    // Remove product from cart
    removeProductFromCart({ commit }, { producto }) {
        commit('removeProductFromCart', producto)
    },
    updateProductQuantity({ commit }, { id, cantidad }) {
        commit('updateProductQuantity', { id, cantidad })
    },
    borrarCarro({ commit }) {
        commit('borrarCarro')
    },
    setReceptorCurrentProveedor({ commit }, receptor) {
        commit('setReceptorCurrentProveedor', receptor)
    },
    setCurrentProveedor({ commit }, proveedor) {
        commit('setCurrentProveedor', proveedor)
    },
    async fetchProveedores({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: ["id", "rut", "nombre", "casa_matriz.*", "receptores.*", "productos.productos_id.*",],
        });

        const data = await this.$axios
            .$get(`${this.$config.apiUrl}/items/proveedores?${query}`)
            .then((res) => res.data);

        commit('setCurrentProveedor', data[0]);
        commit('setProveedores', data);
    }
}