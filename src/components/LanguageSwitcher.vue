<!-- src/components/LanguageSwitcher.vue -->
<template>
  <select v-model="currentLang" @change="changeLanguage">
    <option value="en">English</option>
    <option value="es">Español</option>
    <!-- Add more as needed -->
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'

const { locale } = useI18n()
const currentLang = ref(locale.value)

const changeLanguage = async () => {
  try {
    const res = await fetch(`/api/i18n?lang=${currentLang.value}`, {
      headers: { 'Accept': 'application/json' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const messages = await res.json()
    locale.value = currentLang.value
    localStorage.setItem('lang', currentLang.value)
    // Update the i18n messages
    const { i18n } = await import('@/i18n')
    i18n.global.setLocaleMessage(currentLang.value, messages)
  } catch (err) {
    console.error('Failed to load translations:', err)
  }
}
</script>
