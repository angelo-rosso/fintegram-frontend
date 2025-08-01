<template>
  <div class="upload-container">
    <h3 class="upload-widget-title">
      {{ $t('uploadWidget.title') }}<br />"{{ $t('uploadWidget.subtitle') }}"
    </h3>
    <div
      class="drop-area"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      :class="{ dragging: isDragging }">
      <label for="fileInput">
        <div class="icon">
            <svg v-if="status === 'idle'" width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H14L20 10V20H4V4Z" stroke="#0a8ef2" stroke-width="2"/>
            </svg>

            <svg v-else-if="status === 'loaded'" width="40" height="40" viewBox="0 0 24 24" fill="none" class="icon-check">
                <path d="M5 13L9 17L19 7" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg v-else-if="status === 'error'" width="40" height="40" viewBox="0 0 24 24" fill="none" class="icon-cross">
                <line x1="18" y1="6" x2="6" y2="18" stroke="#dc3545" stroke-width="3"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="#dc3545" stroke-width="3"/>
            </svg>
        </div>

        <div v-if="statusMessage" class="status-message">
        {{ statusMessage }}
        </div>

        <div class="upload-widget-text">
          {{ $t('uploadWidget.instruction') }}
        </div>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        @change="handleFileSelect"
        hidden
      />
    </div>

   <button class="submit-btn" :disabled="!selectedFile || isSubmitting" @click="submitFile">
    <template v-if="!isSubmitting">{{ $t('uploadWidget.send') }}</template>
    <template v-else><Spinner :size="18" :border="2" /></template>
   </button>


  </div>

</template>

<script setup>
import { ref } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
const status = ref('idle') // 'idle' | 'loaded' | 'error'
const statusMessage = ref('')
const selectedFile = ref(null)
const isDragging = ref(false)
const isSubmitting = ref(false)
const emit = defineEmits(['uploaded'])

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/pdf') {
    selectedFile.value = file
    status.value = 'loaded'
    statusMessage.value = $t('uploadWidget.success')
  } else {
    selectedFile.value = null
    status.value = 'error'
    statusMessage.value = $t('uploadWidget.onlyPdf')
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    selectedFile.value = file
    status.value = 'loaded'
    statusMessage.value = 'Archivo cargado correctamente'
  } else {
    selectedFile.value = null
    status.value = 'error'
    statusMessage.value = 'Solo se permiten archivos PDF.'
  }
}


async function submitFile() {
  if (!selectedFile.value) return

  isSubmitting.value = true
  statusMessage.value = ''
  status.value = ''

  const API_URL = import.meta.env.VITE_API_URL
  const formData = new FormData()
  formData.append('cteFile', selectedFile.value)

  try {
    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      status.value = 'error'
      statusMessage.value = result.message || $t('uploadWidget.uploadError') 
    } else {
      status.value = 'loaded'
      statusMessage.value = result.message || $t('uploadWidget.success')
      emit('uploaded', result)
    }
  } catch (err) {
    console.error(err)
    status.value = 'error'
    statusMessage.value = $t('uploadWidget.serverError') 
  } finally {
    isSubmitting.value = false
  }
}

</script>

<style scoped>
.upload-widget-title {
  color: #1b365d;
  font-size: 1.5rem; /* or 24px */
  font-weight: bold;
}

.upload-widget-text {
  color: #1b365d;
  font-size: 1.0rem;
}

.upload-container {
  width: 320px;
  text-align: center;
  font-family: sans-serif;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.drop-area {
  border: 2px dashed #0a8ef2;
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1.5rem;
}

.drop-area.dragging {
  background-color: #f0f8ff;
}

.drop-area label {
  display: block;
  cursor: pointer;
}

.icon {
  font-size: 2rem;
  color: #0a8ef2;
  margin-bottom: 0.5rem;
}

.browse-text {
  color: #0a8ef2;
  text-decoration: underline;
  cursor: pointer;
}

.submit-btn {
  background-color: #0a8ef2;
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.status-message {
  color: #1b365d;
  font-weight: bold;
  margin-top: 0.5rem;
}

.status-message:empty {
  display: none;
}
.icon-check {
  animation: checkmark 0.5s ease-out forwards;
}

.icon-cross {
  animation: fadein 0.5s ease-out forwards;
}

@keyframes checkmark {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-15deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes fadein {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}

</style>
