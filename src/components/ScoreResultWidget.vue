<template>
  <div class="score-result" v-if="score">
    <h3 class="status-name" :style="{ color: scoreColor }">{{ scoreStatusName }}</h3>

    <ScoreSvgGauge
      :score="score"
      :scoreStatusName="scoreStatusName"
      :scoreStatusDescription="scoreStatusDescription"
      @animation-complete="onGaugeAnimationComplete"
    />

    <div class="score-widget">
      <h3>{{ scoreStatusName }}</h3>
      <p>{{ scoreStatusDescription }}</p>
    </div>

    <button class="action-button" :disabled="!gaugeDone">
      {{ $t('score.requestReport') }}
    </button>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue'
import ScoreSvgGauge from '@/components/ScoreSvgGauge.vue'

const props = defineProps({
  score: {
    type: Object,
    required: true
  }
})

const score = computed(() => props.score.fintegramScore)
const scoreStatusName = computed(() => props.score.scoreStatusName)
const scoreStatusDescription = computed(() => props.score.scoreStatusDescription)
const gaugeDone = ref(false)

function onGaugeAnimationComplete() {
  gaugeDone.value = true
}

const scoreColor = computed(() => getGradientColor(props.score.fintegramScore))


function getGradientColor(score) {
  if (score <= 500) {
    const ratio = score / 500
    return interpolateColor('#d63031', '#fdcb6e', ratio) // red → yellow
  } else if (score <= 750) {
    const ratio = (score - 500) / 250
    return interpolateColor('#fdcb6e', '#00b894', ratio) // yellow → green
  } else {
    const ratio = (score - 750) / 250
    return interpolateColor('#00b894', '#0984e3', ratio) // green → blue
  }
}

function interpolateColor(c1, c2, t) {
  const hex = (h) => parseInt(h, 16)
  const r1 = hex(c1.slice(1, 3)), g1 = hex(c1.slice(3, 5)), b1 = hex(c1.slice(5, 7))
  const r2 = hex(c2.slice(1, 3)), g2 = hex(c2.slice(3, 5)), b2 = hex(c2.slice(5, 7))

  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)

  return `rgb(${r},${g},${b})`
}
</script>


<style scoped>
.score-result {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  font-family: sans-serif;
}

.score-result {
  display: flex;
  flex-direction: column;
  align-items: center;   /* centers horizontally */
  justify-content: center; /* centers vertically if needed */
}

.status-name {
  font-weight: bold;
}

.score-result p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.score-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0a8ef2;
  margin-top: 1rem;
}

.action-button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #0094e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-weight: bold
}

.action-button:hover:enabled {
  background-color: #0078c2;
}

.action-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

</style>
