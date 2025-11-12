export class Support {
    constructor({ id = "", usuarioId = "", asunto = "", mensaje = "", estado = "Pendiente" }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.asunto = asunto;
        this.mensaje = mensaje;
        this.estado = estado;
    }
}
