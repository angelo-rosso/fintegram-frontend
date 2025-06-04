<template>
  <div class="scoring-container">
    <video autoplay muted loop playsinline class="background-video">
      <source src="@/assets/vid/combined_background.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>

    <div class="overlay-content">
      <UploadWidget @uploaded="handleUploadResponse" />
      <ScoreResultWidget v-if="scoreData" :score="scoreData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UploadWidget from '@/components/UploadWidget.vue'
import ScoreResultWidget from '@/components/ScoreResultWidget.vue'

const scoreData = ref(null)

function handleUploadResponse(score) {
  scoreData.value = score
}
</script>


<style scoped>
.scoring-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay-content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: row;            /* key: arrange widgets horizontally */
  justify-content: flex-start;    /* align widgets to the left */
  align-items: center;            /* vertical centering */
  gap: 2rem;                      /* space between widgets */
  height: 100vh;                  /* full viewport height */
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.4); /* optional: dark overlay for contrast */
}
</style>
