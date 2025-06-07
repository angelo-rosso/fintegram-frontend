<template>
  <section>
    <h2>Entrevistas</h2>
    <YouTubeCarousel playlistId="PLAYLIST_ID_ENTREVISTAS" />

    <h2>Tendencias</h2>
    <YouTubeCarousel playlistId="PLAYLIST_ID_TENDENCIAS" />

    <h2>Consejos</h2>
    <YouTubeCarousel playlistId="PLAYLIST_ID_CONSEJOS" />
  </section>
</template>

<script setup>
import YouTubeCarousel from '@/components/YouTubeCarousel.vue'
</script>


<style scoped>
.education-container {
  padding: 2rem;
}

.carousel-section {
  margin-bottom: 3rem;
}

.carousel-section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>
