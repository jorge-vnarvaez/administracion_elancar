export default {
    setCurrentProveedor({ commit }, proveedor) {
        commit('setCurrentProveedor', proveedor)
    },
    setReceptorCurrentProveedor({ commit }, receptor) {
        commit('setReceptorCurrentProveedor', receptor)
    }
}