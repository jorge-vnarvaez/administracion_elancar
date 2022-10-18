export default ({ app }, inject) => {
    inject('monto_neto', precios => {
        return precios.reduce((a, b) => a + b, 0)
    });
  }