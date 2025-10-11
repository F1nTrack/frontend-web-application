export class DashboardData {
    constructor({
                    user,
                    documents,
                    balance,
                    pendingPayments,
                    profileCompletion,
                    transportCards,
                    notifications
                }) {
        this.user = user || {};
        this.documents = documents || { active: 0, changeThisMonth: 0, items: [] };
        this.balance = balance || { total: 0, currency: 'S/', type: '' };
        this.pendingPayments = pendingPayments || { count: 0, note: '', items: [] };
        this.profileCompletion = profileCompletion || 0;
        this.transportCards = transportCards || [];
        this.notifications = notifications || [];
    }

    static fromJSON(json) {
        return new DashboardData(json);
    }
}