export const getLoadingProductos = (state) => state.loading;

export const getProductos = (state) => {
        return state.productos;
};

export const getFilteredProductos = (state) => {
        return state.filteredProductos;
};

export const getMateriales = (state) => {
        // create an array of unique materiales, the same material can't be repeated
        let materiales = [];

        state.productos.forEach((producto) => {
                if (producto.material != null && !materiales.includes(producto.material.nombre)) {
                        materiales.push(producto.material.nombre);
                }
        });

        materiales = materiales.map((material) => {
                return {
                        title: material,
                        query: material,
                        parent: 'filter_by_material',
                }
        });

        return materiales;
}