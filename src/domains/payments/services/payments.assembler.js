import { Payment } from '../model/payments.entity.js';

export class PaymentsAssembler {
    static toEntitiesFromResponse(response) {
        return response.data.map((payment) => this.toEntityFromResource(payment));
    }

    static toEntityFromResource(resource) {
        return new Payment({
            id: resource.id,
            usuarioId: resource.usuarioId,
            servicio: resource.servicio,
            monto: resource.monto,
            fecha: resource.fecha,
        });
    }
}
