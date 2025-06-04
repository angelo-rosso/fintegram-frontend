<!-- src/components/Spinner.vue -->
<template>
  <div class="spinner" :style="{ width: size + 'px', height: size + 'px', borderWidth: border + 'px' }"></div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 24
  },
  border: {
    type: Number,
    default: 4
  }
})
</script>

<style scoped>
.spinner {
  border-style: solid;
  border-color: #f3f3f3;
  border-top-color: #1b365d;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
