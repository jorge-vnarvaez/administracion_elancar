export default {
    async loadProductos({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: [
                "*.*",
            ]
        });

        const { data } = await this.$axios.$get(`${this.$config.apiUrl}/items/productos?${query}`).then((res) => {
            return res
        });

        commit('setProductos', data);
    },
    async filterByMaterial({ commit }, material) {


        const qs = require('qs');

        const query = qs.stringify({
            fields: [
                "*.*",
            ],
            filter:
            {
                _and: [
                    {
                        material: {
                            nombre: {
                                _contains: material.nombre
                            }
                        }
                    },
                    {
                        kg: {
                            _gt: 0
                        }
                    }
                ]
            }
        });
        const { data } = await this.$axios.$get(`${this.$config.apiUrl}/items/productos?${query}`).then((res) => {
            return res
        });


        commit('setProductos', data);
        commit('setMaterialSeleccionado', material);
    },
    applyFilters({ commit }, filters) {
        commit('setFilters', filters);
    },

    async recalcularPrecio({ commit }, { productos, material, precio } ) {
        await this.$axios.patch(`${this.$config.apiUrl}/items/materiales/${material.id}`, { ultimo_precio: precio })
        productos.forEach( async (producto) => {
            await this.$axios.patch(`${this.$config.apiUrl}/items/productos/${producto.id}`, {precio_neto: producto.kg * precio});
        });
    }
}