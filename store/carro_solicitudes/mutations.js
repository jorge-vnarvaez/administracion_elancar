export default {
    setCarro(state, carro) {
        state.carroSolicitudes = carro;

        this.$cookies.set("carroSolicitudes", state.carroSolicitudes);
    },
    // Add product to cart
    addProductToCart(state, { producto, cantidad }) {
        state.carroSolicitudes = state.carroSolicitudes || [];

        // add cantidad to existing product as a new atributo
        const productInCart = state.carroSolicitudes.find(
            (item) => item.id === producto.id
        );

        if (productInCart) {
            productInCart.cantidad += cantidad;
        } else {
            producto.cantidad = cantidad;
            state.carroSolicitudes.push({
                ...producto,
            });
        }

        this.$cookies.set('carroSolicitudes', state.carroSolicitudes);
    },
    // remover producto del carro
    removeProductFromCart(state, producto) {
        state.carroSolicitudes = state.carroSolicitudes.filter(
            (item) => item.id !== producto.id
        );

        this.$cookies.set('carroSolicitudes', state.carroSolicitudes);
    },
    borrarCarro(state) {
        state.carroSolicitudes = [];
        this.$cookies.remove('carroSolicitudes');
    },
    // actualizar cantidad de producto en carro de compras basado en la id del producto y la cantidad nueva
    updateProductQuantity(state, { id, cantidad }) {
        const productInCart = state.carroSolicitudes.find((item) => item.id === id);

        if (productInCart) {
            productInCart.cantidad = cantidad;
        }

        this.$cookies.set('carroSolicitudes', state.carroSolicitudes);
    }
}