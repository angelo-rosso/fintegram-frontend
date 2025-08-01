<template>
  <section>
    <h2>{{ $t('edu.interviews') }}</h2>
    <YouTubeCarousel playlistId="PLAYLIST_ID_ENTREVISTAS" />

    <h2>{{ $t('edu.trends') }}</h2>
    <YouTubeCarousel playlistId="PLAYLIST_ID_TENDENCIAS" />

    <h2>{{ $t('edu.tips') }}</h2>
    <YouTubeCarousel playlistId="PLAYLIST_ID_CONSEJOS" />
  </section>
</template>

<script setup>
import YouTubeCarousel from '@/components/YouTubeCarousel.vue'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()
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
