export default {
    setCarro({ commit }, carro) {
        commit('setCarro', carro)
    },
    // Add product to cart
    addProductToCart({ commit }, { producto, cantidad }) {
        commit('addProductToCart', { producto, cantidad })
    },
    // Remove product from cart
    removeProductFromCart({ commit }, { producto }) {
        commit('removeProductFromCart', { producto })
    }
}