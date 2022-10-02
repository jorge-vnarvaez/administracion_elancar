export default {
    setCarro(state, carro) {
        state.carroCompras = carro;

        this.$cookies.set("carroCompras", state.carroCompras);
    },
    // Add product to cart
    addProductToCart(state, { producto, cantidad }) {
        state.carroCompras = state.carroCompras || [];

        // add cantidad to existing product as a new atributo
        const productInCart = state.carroCompras.find(
            (item) => item.id === producto.id
        );

        if (productInCart) {
            productInCart.cantidad += cantidad;
        } else {
            producto.cantidad = cantidad;
            state.carroCompras.push({
                ...producto,
            });
        }

        this.$cookies.set('carroCompras', state.carroCompras);
    },
    // remover producto del carro
    removeProductFromCart(state, producto) {
        state.carroCompras = state.carroCompras.filter(
            (item) => item.id !== producto.id
        );

        this.$cookies.set('carroCompras', state.carroCompras);
    },
    borrarCarro(state) {
        state.carroCompras = [];
        this.$cookies.remove('carroCompras');
    }
}