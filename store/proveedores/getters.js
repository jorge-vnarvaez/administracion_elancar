export default {
    getProveedores(state) {
        return state.proveedores;
    },
    getCurrentProveedor(state) {
        return state.currentProveedor
    },
    getReceptoresCurrentProveedor(state) {
        return state.currentProveedor.receptores;
    },
    getLengthRecetoresCurrentProveedor(state) {
        return state.currentProveedor.receptores.length;
    },
    getProductosCurrentProveedor(state) {
        return state.currentProveedor.productos
    }
}