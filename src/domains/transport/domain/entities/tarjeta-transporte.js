import {Documentos} from "./documentos.js";
export class TarjetaTransporte extends Documentos {
    /**
     * @param {{id:number, usuarioId:number, tipo:string, numero:string, estado:string, saldo:number}}
     */
    constructor({ id, usuarioId, tipo, numero, estado, saldo }) {
        super({ id, usuarioId, tipo, numero, estado });
        this.saldo = saldo;
    }
}
