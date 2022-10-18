export default {
    setSucursal(state, sucursal) {
        this.$cookies.set('datosSucursal', sucursal);
        state.datosSucursal = sucursal;
    }
}