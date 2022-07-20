export default {
    // Get carro compras
    getCarroCompras(state) {
        return state.carroCompras
    },
    // Get number of products in cart
    getNumeroDeProductos(state) {
        return state.carroCompras.length
    }
}