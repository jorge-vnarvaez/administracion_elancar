export default {
    setDetalle(state, detalle) {
        state.detalle = detalle
    },
    updateProductPrice(state, { id, precio_compra }) {
        let product = state.detalle.find(product => product.id === id)
        let detalle_length = state.detalle.length;
        product.precio_compra = precio_compra
        product.fecha_compra = product.cotizaciones_proveedor_id.fecha_emision
        state.number_of_prices_setted++

        if(state.number_of_prices_setted === detalle_length) {
            state.prices_setted = true
            state.number_of_prices_setted = 0
        } else {
            state.prices_setted = false
        }
    }
}