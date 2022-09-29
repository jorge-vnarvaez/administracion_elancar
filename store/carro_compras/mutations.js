export default {
    setCarro(state, carro) {
        state.carroCompras = carro;

        this.$cookies.set("carroCompras", state.carroCompras);
    },
    // Add product to cart
    addProductToCart(state, { producto, cantidad }) {
        state.carroCompras = state.carroCompras || [];

        if (state.carroCompras.length > 0) {
            if (!state.carroCompras.find((item) => item.producto.id == producto.id)) {
                state.carroCompras.push({ producto, cantidad })
            } else {
                state.carroCompras.find((item) => item.producto.id == producto.id).cantidad += cantidad
                state.carroCompras.find((item) => item.producto.id == producto.id).producto = producto
            }
        } else {
            state.carroCompras.push({ producto, cantidad })
        }

        this.$cookies.set('carroCompras', state.carroCompras);
    },
    // Remove product from cart
    removeProductFromCart(state, { producto }) {
        state.carroCompras = state.carroCompras.filter((item) => item.producto.id != producto.id)
        this.$cookies.set('carroCompras', state.carroCompras);
    },
    borrarCarro(state) {
        state.carroCompras = [];
        this.$cookies.remove('carroCompras');
    }
}