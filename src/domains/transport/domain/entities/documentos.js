export class Documentos {
    constructor({
                    id,
                    userId,
                    documentNumber,
                    fullName,
                    type,
                    balance,
                    status,
                    issueDate,
                    expirationDate,
                    filePath
                }) {
        this.id = id;
        this.userId = userId;
        this.documentNumber = documentNumber;
        this.fullName = fullName;
        this.type = type;
        this.balance = balance;
        this.status = status;
        this.issueDate = new Date(issueDate);
        this.expirationDate = new Date(expirationDate);
        this.filePath = filePath;
    }
}
