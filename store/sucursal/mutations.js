export default {
    setSucursal(state, sucursal) {
        this.$cookies.remove('datosSucursal')
        this.$cookies.set('datosSucursal', sucursal);
        state.datosSucursal = sucursal;
    },
    setSucursales(state, sucursales) {
        state.sucursales = sucursales;
    }
}