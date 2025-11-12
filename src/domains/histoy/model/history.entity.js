export class History {
    constructor({ id = "", usuarioId = "", descripcion = "", monto = 0, fecha = "" }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
}
