import { Notification } from '../model/notifications.entity.js';

export class NotificationsAssembler {
    static toEntitiesFromResponse(response) {
        return response.data.map((notif) => this.toEntityFromResource(notif));
    }

    static toEntityFromResource(resource) {
        return new Notification({
            id: resource.id,
            usuarioId: resource.usuarioId,
            mensaje: resource.mensaje,
            leido: resource.leido,
        });
    }
}

