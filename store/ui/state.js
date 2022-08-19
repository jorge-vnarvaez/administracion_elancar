import moment from 'moment';

moment.locale('es');

export default () => ({
    mostrarOpciones: false,
    fecha_actual: moment().format('dddd, D [de] MMMM [de] YYYY'),
    hora_actual: moment().format('hh:mm [hrs]'),
})