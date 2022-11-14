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
    // Return a boolean if carro solicitudes is empty
    getCarroSolicitudesIsEmpty(state) {
        return state.carroSolicitudes.length === 0
    },
    // Iterate over carro compras and get total price of items
    getTotalPrice(state) {
        return state.carroSolicitudes.reduce((total, item) => {
            return total + item.precio * item.cantidad
        }, 0)
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
    },
    getMetodoDePago(state) {
        return state.metodoDePago
    },
    getCondicionDeVenta(state) {
        return state.condicionesDeVenta
    }
}