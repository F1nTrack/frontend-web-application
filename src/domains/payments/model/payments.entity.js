export class Payment {
    constructor({ id = "", usuarioId = "", servicio = "", monto = 0, fecha = "" }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.servicio = servicio;
        this.monto = monto;
        this.fecha = fecha;
    }
}
