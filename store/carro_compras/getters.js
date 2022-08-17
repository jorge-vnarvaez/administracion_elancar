export default {
    // Get carro compras
    getCarroCompras(state) {
        return state.carroCompras
    },
    // Iterate over carro compras and get total quantity of items
    getTotalQuantity(state) {
        return state.carroCompras.reduce((total, item) => {
            return total + item.cantidad
        }, 0)   
    },
    // Iterate over carro compras and get total price of items
    getTotalPrice(state) {
        return state.carroCompras.reduce((total, item) => {
            return total + item.producto.precio_actual * item.cantidad
        }, 0)
    },
    lengthCarro(state) {
        return state.carroCompras.length
    },
}