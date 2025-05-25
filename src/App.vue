<template>
  <div id="app">
    <Header />
    <div class="page-content" :style="{ paddingTop: navbarHeight + 'px' }">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const navbarHeight = ref(0)

onMounted(async () => {
  await nextTick()
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    navbarHeight.value = navbar.offsetHeight
  }
})
</script>
