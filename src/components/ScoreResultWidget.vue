<template>
  <div class="score-result" v-if="score">
    <h3 class="status-name" :style="{ color: scoreColor }">
      {{ props.score.scoreStatusName }}
    </h3>

    <div class="score-widget">
    <h3>{{ score.scoreStatusName }}</h3>
    <p>{{ score.scoreStatusDescription }}</p>
        <ScoreSvgGauge
        :score="score"
        :scoreStatusDescription="props.score.scoreStatusDescription"
        />
  </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
import ScoreSvgGauge from '@/components/ScoreSvgGauge.vue'

const props = defineProps({
  score: {
    type: Object,
    required: true
  }
})
const score = computed(() => props.score.fintegramScore)

const scoreColor = computed(() => {
  const value = score.value // between 0 and 1000

  function interpolate(c1, c2, ratio) {
    const hex = (h) => parseInt(h, 16)
    const r1 = hex(c1.slice(1, 3)), g1 = hex(c1.slice(3, 5)), b1 = hex(c1.slice(5, 7))
    const r2 = hex(c2.slice(1, 3)), g2 = hex(c2.slice(3, 5)), b2 = hex(c2.slice(5, 7))
    const r = Math.round(r1 + (r2 - r1) * ratio)
    const g = Math.round(g1 + (g2 - g1) * ratio)
    const b = Math.round(b1 + (b2 - b1) * ratio)
    return `rgb(${r},${g},${b})`
  }

  if (value <= 333) {
    return interpolate('#d63031', '#fdcb6e', value / 333) // red → yellow
  } else if (value <= 666) {
    return interpolate('#fdcb6e', '#00b894', (value - 333) / 333) // yellow → green
  } else {
    return interpolate('#00b894', '#0984e3', (value - 666) / 334) // green → blue
  }
})

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
</style>
