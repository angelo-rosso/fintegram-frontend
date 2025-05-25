<template>
  <div class="contact-page pt-5">
    <ContactForm />
  </div>
</template>

<script setup>
import ContactForm from '@/components/ContactForm.vue'
</script>

<style scoped>
.contact-page {
  padding-top: 100px; /* in case navbar is fixed-top */
}
</style>
