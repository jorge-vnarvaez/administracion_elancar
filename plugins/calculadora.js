export default ({ app }, inject) => {
    inject('monto_neto', precios => {
        return precios.reduce((a, b) => a + b, 0)
    });
    inject('total_kg', kgs => {
        return kgs.reduce((a, b) => a + b, 0)
    });
    inject('total_precio', (precio_uni, cantidad) => {
        return precio_uni * cantidad;
    });
  }