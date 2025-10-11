import { DashboardData } from '../model/datos.entity.js';

export class DashboardAssembler {
    static toEntity(jsonData) {
        return DashboardData.fromJSON(jsonData);
    }
}