import { Support } from '../model/support.entity.js';

export class SupportAssembler {
    static toEntitiesFromResponse(response) {
        return response.data.map((ticket) => this.toEntityFromResource(ticket));
    }

    static toEntityFromResource(resource) {
        return new Support({
            id: resource.id,
            usuarioId: resource.usuarioId,
            asunto: resource.asunto,
            mensaje: resource.mensaje,
            estado: resource.estado || "Pendiente",
        });
    }
}
