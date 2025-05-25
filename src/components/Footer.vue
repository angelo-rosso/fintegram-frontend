<!-- src/components/Footer.vue -->
<template>
  <footer class="text-center py-4 footer-info">
    <p>Somos un producto de la firma de Auditoría SW registrada en Chile</p>
    <p>&copy; {{ currentYear }} Fintegram. Todos los derechos reservados.</p>
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
