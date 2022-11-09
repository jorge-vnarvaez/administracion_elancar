export default {
    setProductos(state, productos) {
        state.productos = productos;
        state.filteredProductos = productos;
        state.loading = false;
    },
    setFilters(state, filters) {
        if (filters.length > 0) {
            let parents = filters.map((filter) => filter.parent);

            if (parents.includes('order_by_precio')) {
                const order_by_precio_active = filters.find((filter) => filter.parent === 'order_by_precio');
                state.filteredProductos.sort((a, b) => {
                    if (order_by_precio_active.query === 'asc') {
                        return a.precio - b.precio;
                    } else if(order_by_precio_active.query === 'desc') {
                        return b.precio - a.precio;
                    } else {
                        return 1;
                    }

                });
            }

            // if (parents.includes('order_by_precio')) {
            //     console.log('asdasdasdasd');
            //     state.filteredProductos = state.productos;
            // }

            //     if (parents.includes('range_precio')) {
            //         const range_precio_active = filters.find((filter) => filter.parent === 'range_precio');

            //         state.productos = state.productos.filter((producto) => {
            //             return producto.precio >= range_precio_active.query[0] && producto.precio <= range_precio_active.query[1];
            //         });
            //     }

            // if (parents.includes('filter_by_material')) {
            //     const filter_by_material_active = filters.find((filter) => filter.parent === 'filter_by_material');

            //     state.filteredProductos = state.productos.filter((producto) => {
            //         return producto.material != null ? producto.material.nombre === filter_by_material_active.query : false;
            //     });
            // }

            if (parents.includes('query_buscador')) {
                const query_buscador_active = filters.find((filter) => filter.parent === 'query_buscador');
                if (query_buscador_active.query) {
                    state.filteredProductos = state.productos.filter((producto) => {
                        return (producto.nombre.toLowerCase().includes(query_buscador_active.query.toLowerCase())) || (producto.descripcion != null ? producto.descripcion.toLowerCase().includes(query_buscador_active.query.toLowerCase()) : false);
                    });
                }
            }
        } 
    },
}