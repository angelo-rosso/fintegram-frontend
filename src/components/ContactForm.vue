<template>
  <div class="contact-page">
    <section class="contact-form">
      <h2>Contáctanos</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea id="message" v-model="form.message" rows="4" required></textarea>
        </div>

        <Spinner v-if="loading" :size="32" :border="5" />


        <button :disabled="loading" type="submit" id="contactSubmitBtn">
        {{ loading ? 'Enviando...' : 'Enviar' }}
        </button>

        <div
          id="contactMessage"
          class="mt-3"
          v-if="submitted"
          style="color: green;">
          ¡Gracias por tu mensaje!
        </div>
      </form>

      <div v-if="loading" class="status-message loading">Enviando mensaje...</div>
      <div v-if="success" class="status-message success">¡Gracias por tu mensaje!</div>
      <div v-if="error" class="status-message error">{{ error }}</div>

    </section>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSubmissionState } from '@/composables/useSubmissionState'
import Spinner from '@/components/Spinner.vue'


const form = ref({
  name: '',
  email: '',
  message: ''
})

const { loading, success, error, reset } = useSubmissionState()

async function handleSubmit() {
  reset()
  loading.value = true

  try {
    const API_URL = import.meta.env.VITE_API_URL

    const response = await fetch(`${API_URL}/contact/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    success.value = true
    form.value = { name: '', email: '', message: '' }

    setTimeout(() => {
      success.value = false
    }, 5000)
  } catch (err) {
    error.value = 'No se pudo enviar el formulario.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.contact-form {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.contact-form h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.status-message {
  text-align: center;
  margin-top: 1rem;
}
.status-message.success {
  color: green;
}
.status-message.loading {
  color: gray;
}
.status-message.error {
  color: red;
}


label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type='submit'] {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #1b365d;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #142849;
}

footer {
  margin-top: 4rem;
  background-color: #f8f8f8;
  padding: 1rem;
  font-size: 0.9rem;
}
</style>
