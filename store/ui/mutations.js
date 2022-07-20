export default {
    toggleBarra(state) {
        state.mostrarBarra = !state.mostrarBarra;
    },
    cerrarBarra(state) {
        state.mostrarBarra = false;
    }
}