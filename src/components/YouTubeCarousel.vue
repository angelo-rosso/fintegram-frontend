<template>
  <div v-if="videos.length" class="carousel-container">
    <div class="carousel" ref="carouselRef">
      <div
        v-for="video in videos"
        :key="video.videoId"
        class="video-card"
        @click.stop="toggleDescription(video.videoId)"
      >
        <img :src="video.thumbnailUrl" :alt="video.title" />
        <h3>{{ video.title }}</h3>
        <p v-if="selectedVideoId === String(video.videoId)">
          {{ video.description || 'No description available.' }}
        </p>
      </div>
    </div>
  </div>
  <div v-else class="empty">No videos available.</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import axios from 'axios'

const carouselRef = ref(null)
let scrollInterval

const videos = ref([])

const props = defineProps({
  playlistId: String
})

const selectedVideoId = ref(null)

const toggleDescription = (videoId) => {
  const id = String(videoId)
  selectedVideoId.value = selectedVideoId.value === id ? null : id
}

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

onMounted(async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
    const response = await axios.get(`${baseUrl}/videos/${props.playlistId}`, {
      headers: { Accept: 'application/json' }
    })
    videos.value = response.data

    await nextTick()
    startAutoScroll()
  } catch (err) {
    console.error('Error fetching videos:', err)
  }
})

function startAutoScroll() {
  if (!carouselRef.value) return

  scrollInterval = setInterval(() => {
    const carousel = carouselRef.value
    const maxScroll = carousel.scrollWidth - carousel.clientWidth

    if (carousel.scrollLeft >= maxScroll - 1) {
      carousel.scrollLeft = 0
    } else {
      carousel.scrollLeft += 300
    }
  }, 5000)
}

onUnmounted(() => {
  clearInterval(scrollInterval)
})
</script>

<style scoped>
.carousel-container {
  overflow: hidden;
  flex: 1;
}

.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
}

.video-card {
  flex: 0 0 auto;
  width: clamp(200px, 80vw, 300px);
  scroll-snap-align: start;
  border: 1px solid #ccc;
  padding: 0.5rem;
  background: #fff;
  border-radius: 8px;
  transition: transform 0.3s;
  position: relative;
}

.video-card:hover {
  transform: translateY(-4px);
}

.video-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.video-card h3 {
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #333;
  line-height: 1.2;
}

/* Description - toggled via tap */
.video-card p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #333;
  max-height: 120px;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .video-card {
    width: 240px;
    padding: 0.5rem;
  }

  .video-card h3 {
    font-size: 0.9rem;
  }

  .video-card p {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .video-card {
    width: 200px;
  }

  .video-card h3 {
    font-size: 0.85rem;
  }
}

@media (min-width: 1024px) {
  .video-card {
    width: 250px;
  }
}
</style>
