import { computed, ref } from 'vue'
import { summaryCards as defaultSummaryCards } from '../data/summaryCards'
import { documents as defaultDocuments } from '../data/documents'

export function useDocumentManagement({
                                          initialDocuments = defaultDocuments,
                                          initialSummaryCards = defaultSummaryCards,
                                      } = {}) {
    const searchTerm = ref('')
    const documents = ref(initialDocuments)
    const summaryCards = ref(initialSummaryCards)

    const filteredDocuments = computed(() => {
        if (!searchTerm.value.trim()) {
            return documents.value
        }

        const normalizedTerm = searchTerm.value.trim().toLowerCase()

        return documents.value.filter((document) => {
            const haystack = [
                document.type,
                document.number,
                document.status,
            ]
                .join(' ')
                .toLowerCase()

            return haystack.includes(normalizedTerm)
        })
    })

    return {
        searchTerm,
        summaryCards,
        filteredDocuments,
    }
}