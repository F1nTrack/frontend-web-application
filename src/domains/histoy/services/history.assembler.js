import { History } from '../model/history.entity.js';

export class HistoryAssembler {
    static toEntitiesFromResponse(response) {
        return response.data.map((item) => this.toEntityFromResource(item));
    }

    static toEntityFromResource(resource) {
        return new History({
            id: resource.id,
            usuarioId: resource.usuarioId,
            descripcion: resource.servicio || resource.descripcion || "Transacción",
            monto: resource.monto,
            fecha: resource.fecha,
        });
    }
}
