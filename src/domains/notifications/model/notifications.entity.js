export class Notification {
    constructor({ id = "", usuarioId = "", mensaje = "", leido = false }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.mensaje = mensaje;
        this.leido = leido;
    }
}
