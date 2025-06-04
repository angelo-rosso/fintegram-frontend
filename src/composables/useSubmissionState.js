import { ref } from 'vue'

export function useSubmissionState() {
    const loading = ref(false)
    const success = ref(false)
    const error = ref(null)

    function reset() {
        loading.value = false
        success.value = false
        error.value = null
    }

    return {
        loading,
        success,
        error,
        reset
    }
}
