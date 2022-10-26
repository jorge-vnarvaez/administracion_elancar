export default {
    setProveedores(state, proveedores) {
        state.proveedores = proveedores;
    },
    setCurrentProveedor(state, proveedor) {
        state.currentProveedor = proveedor
    },
    setReceptorCurrentProveedor(state, receptor) {
        state.currentReceptor = receptor
    }
}