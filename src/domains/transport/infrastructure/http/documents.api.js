import {http} from '../../../../shared/services/httpClient.js';

export async function apiFindDocumentByUserID(userID) {
    const list = await http.get(`/documentos?usuarioId=${encodeURIComponent(userID)}`);

    return list

}

export async function apiFindTransportCardBalance(documentID) {
    const bal = await http.get(`/balance?documentID=${encodeURIComponent(documentID)}`);

    // bal es un array, por ejemplo: [{ documentId: '5', balance: '20' }]
    if (Array.isArray(bal) && bal.length > 0) {
        return { balance: Number(bal[0].balance) || 0 };
    }

    // Si no hay datos, devolvemos balance 0
    return { balance: 0 };

}
export async function apiPatchBalanceByDocumentID(documentID, balance) {
    const list = await http.patch(`/documentos?documentID=${encodeURIComponent(documentID)}`,balance );
}


