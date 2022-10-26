export default {
    getProveedores(state) {
        return state.proveedores;
    },
    // getFirstProveedor(state) {
    //     return state.proveedores[0];
    // },
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
    },
    getStatusProveedores(state) {
        return state.loadingProveedores;
    }
}