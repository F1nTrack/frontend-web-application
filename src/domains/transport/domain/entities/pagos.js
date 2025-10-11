export class Pagos {
    /**
     * @param {{id:number, usuarioId:number, servicio:string, monto:number, fecha:string}}
     */
    constructor({ id, usuarioId, servicio, monto, fecha }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.servicio = servicio;
        this.monto = monto;
        this.fecha = fecha;
    }
}
