export default {
    getDetalle(state) {
        return state.detalle
    },
    getPricesSetted(state) {
        return state.prices_setted
    },
    getTotal(state) {
        return state.detalle.reduce((total, item) => {
            return total + item.precio_compra * item.cantidad
        }, 0);
    }
}