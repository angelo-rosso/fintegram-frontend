<template>
  <div class="svg-gauge">
    <svg viewBox="0 0 200 110" class="gauge-svg">
      <!-- Gradient defs -->
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d63031" />
          <stop offset="33%" stop-color="#fdcb6e" />
          <stop offset="66%" stop-color="#00b894" />
          <stop offset="100%" stop-color="#0984e3" />
        </linearGradient>
      </defs>

      <!-- Background arc -->
      <path
        d="M10,100 A90,90 0 0,1 190,100"
        stroke="#222"
        stroke-width="20"
        fill="none"
      />

      <!-- Colored arc -->
      <path
        d="M10,100 A90,90 0 0,1 190,100"
        stroke="url(#gaugeGradient)"
        stroke-width="20"
        fill="none"
      />

      <!-- Needle -->
      <line
        :x1="100"
        :y1="100"
        :x2="needleX"
        :y2="needleY"
        stroke="#1b365d"
        stroke-width="3"
        stroke-linecap="round"
      />

      <!-- Value -->
      <text x="100" y="95" text-anchor="middle" font-size="24" fill="#1b365d">
        {{ score }}
      </text>

      <!-- Optional ticks -->
      <g v-for="t in tickValues" :key="t">
        <line
          :x1="tickX(t, 80)"
          :y1="tickY(t, 80)"
          :x2="tickX(t, 90)"
          :y2="tickY(t, 90)"
          stroke="#ccc"
          stroke-width="2"
        />
        <text
          :x="tickX(t, 72)"
          :y="tickY(t, 72)"
          text-anchor="middle"
          alignment-baseline="middle"
          font-size="10"
          fill="#1b365d"
        >
          {{ t }}
        </text>
      </g>
    </svg>

    <p class="status-description">{{ scoreStatusDescription }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  score: { type: Number, required: true },
  scoreStatusName: String,
  scoreStatusDescription: String
})

const emit = defineEmits(['animation-complete'])

const currentScore = ref(0)
const currentAngle = computed(() => (currentScore.value / 1000) * 180)

const needleX = computed(() =>
  100 + 70 * Math.cos(Math.PI - (currentAngle.value * Math.PI / 180))
)
const needleY = computed(() =>
  100 - 70 * Math.sin(Math.PI - (currentAngle.value * Math.PI / 180))
)

const tickValues = [0, 250, 500, 750, 1000]
function tickX(value, radius) {
  const a = (value / 1000) * 180
  return 100 + radius * Math.cos(Math.PI - (a * Math.PI / 180))
}
function tickY(value, radius) {
  const a = (value / 1000) * 180
  return 100 - radius * Math.sin(Math.PI - (a * Math.PI / 180))
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

watch(
  () => props.score,
  (newScore) => {
    animateNeedle(newScore)
  },
  { immediate: true }
)

function animateNeedle(target) {
  const duration = 600
  const start = currentScore.value
  const change = target - start
  const steps = 30
  const interval = duration / steps
  let frame = 0

  const anim = setInterval(() => {
    const progress = frame / steps
    currentScore.value = start + change * easeOutCubic(progress)
    frame++
    if (frame > steps) {
      currentScore.value = target
      clearInterval(anim)
      emit('animation-complete')
    }
  }, interval)
}
</script>



<style scoped>
.svg-gauge {
  width: 100%;
  text-align: center;
}
.gauge-svg {
  width: 100%;
  max-width: 300px;
}
.status-name {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: #1b365d;
  font-weight: bold;
}
.status-description {
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #1b365d;
  font-weight: bold;
}
</style>
