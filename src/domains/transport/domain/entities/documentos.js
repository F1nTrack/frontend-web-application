export class Documentos {
    /**
     * @param {{id:number, email: string, tipo:string, numero: string, estado: string}}
     */
    constructor({id, usuarioId, tipo, numero, estado }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.tipo = tipo;
        this.numero = numero;
        this.estado = estado;
    }
}