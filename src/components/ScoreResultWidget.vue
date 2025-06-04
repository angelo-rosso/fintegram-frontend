<template>
  <div class="score-result" v-if="score">
    <h3>Resultado Fintegram</h3>
    <div class="score-widget">
    <h3>{{ score.scoreStatusName }}</h3>
    <p>{{ score.scoreStatusDescription }}</p>
        <ScoreGauge :score="fintegramScore" />
  </div>
    <p class="score-number">Puntaje: {{ score.fintegramScore }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ScoreGauge from '@/components/ScoreGauge.vue'

const props = defineProps({
  score: {
    type: Object,
    required: true
  }
})

const fintegramScore = computed(() => props.score.fintegramScore)
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

.score-result h3 {
  margin-bottom: 1rem;
  color: #1b365d;
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
