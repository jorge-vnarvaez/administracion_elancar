export default ({ app }, inject) => {
    inject('formatearPrecio', precio => {
        return precio.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
        });
    });
}