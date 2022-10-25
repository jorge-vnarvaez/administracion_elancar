export default {
    getCurrentProveedor(state) {
        return state.currentProveedor
    },
    getReceptoresCurrentProveedor(state) {
        return state.currentProveedor.receptores
    },
    getProductosCurrentProveedor(state) {
        return state.currentProveedor.productos
    }
}