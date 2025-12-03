import { Documentos } from "./documentos.js";

export class TarjetaTransporte extends Documentos {

    constructor(documentDto, saldo) {
        super(documentDto);

        this.numero = documentDto.documentNumber;
        this.estado = documentDto.status;
        this.saldo = saldo;

        const tiposTransporte = ['Metropolitano Card', 'Metro de Lima', 'Tarjeta Lima'];

        // Asignar nombre según el type
        this.tipo = tiposTransporte[documentDto.type - 1] ?? 'Tarjeta de Transporte';
    }
}
