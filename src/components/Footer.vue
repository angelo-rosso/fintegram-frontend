<template>
  <footer class="text-center py-4 footer-info">
    <p>{{ $t('footer.audit') }}</p>
    <p>&copy; {{ currentYear }} Fintegram. {{ $t('footer.rights') }}</p>
  </footer>
</template>


<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-info {
  background-color: #f8f8f8;
  font-size: 0.9rem;
}
</style>
