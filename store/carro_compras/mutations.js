export default {
    setCarro(state, carro) {
        state.carroCompras = carro;
    },
    // Add product to cart
    addProductToCart(state, { producto, cantidad }) {
        if (!state.carroCompras.find((item) => item.producto.id == producto.id)) {
            state.carroCompras.push({ producto, cantidad })
        } else {
            state.carroCompras.find((item) => item.producto.id == producto.id).cantidad = cantidad
            state.carroCompras.find((item) => item.producto.id == producto.id).producto = producto
        }
        this.$cookies.set('carroCompras', state.carroCompras);
    },
    // Remove product from cart
    removeProductFromCart(state, { producto }) {
        state.carroCompras = state.carroCompras.filter((item) => item.producto.id != producto.id)
        this.$cookies.set('carroCompras', state.carroCompras);
    }
}