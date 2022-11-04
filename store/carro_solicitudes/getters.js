export default {
    // Get carro compras
    getCarroSolicitudes(state) {
        return state.carroSolicitudes
    },
    // Iterate over carro compras and get total quantity of items
    getTotalQuantity(state) {
        return state.carroSolicitudes.reduce((total, item) => {
            return total + item.cantidad
        }, 0)   
    },
    // Get length of carro compras
    getCarroSolicitudesLength(state) {
        return state.carroSolicitudes.length
    },
    // Iterate over carro compras and get total price of items
    getTotalPrice(state) {
        return state.carroSolicitudes.reduce((total, item) => {
            return total + item.precio * item.cantidad
        }, 0)
    },
    lengthCarro(state) {
        return state.carroSolicitudes.length
    },
    getProveedores(state) {
        return state.proveedores;
    },
    getCurrentProveedor(state) {
        return state.currentProveedor
    },
    getCurrentReceptor(state) {
        return state.currentReceptor
    },
    getReceptoresCurrentProveedor(state) {
        return state.currentProveedor.receptores;
    },
    getLengthReceptoresCurrentProveedor(state) {
        return state.currentProveedor.receptores.length;
    },
    getProductosCurrentProveedor(state) {
        return state.currentProveedor.productos
    },
    getStatusProveedores(state) {
        return state.loadingProveedores;
    }
}