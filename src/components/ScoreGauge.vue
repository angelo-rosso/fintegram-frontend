<template>
  <div class="gauge-container">
    <apexchart
      type="radialBar"
      :options="chartOptions"
      :series="[animatedScore]"
      height="300"
    />

    <div class="score-info">
      <h3 class="status-name">{{ scoreStatusName }}</h3>
      <p class="status-description">{{ scoreStatusDescription }}</p>
    </div>
  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
import ApexCharts from 'vue3-apexcharts'

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  scoreStatusName: {
    type: String,
    default: ''
  },
  scoreStatusDescription: {
    type: String,
    default: ''
  }
})

const animatedScore = ref(0)

watch(
  () => props.score,
  (newScore) => {
    const target = (newScore / 1000) * 100
    animateScore(target)
  },
  { immediate: true }
)

function animateScore(target) {
  const duration = 600
  const frames = 30
  const step = (target - animatedScore.value) / frames
  let count = 0

  const interval = setInterval(() => {
    animatedScore.value += step
    count++
    if (count >= frames) {
      animatedScore.value = target
      clearInterval(interval)
    }
  }, duration / frames)
}

function getColorGradient(score) {
  if (score <= 500) {
    const ratio = score / 500
    return interpolateColor('#d63031', '#fdcb6e', ratio)
  } else {
    const ratio = (score - 500) / 500
    return interpolateColor('#fdcb6e', '#00b894', ratio)
  }
}

function interpolateColor(color1, color2, factor) {
  const hex = (c) => parseInt(c, 16)
  const r1 = hex(color1.slice(1, 3))
  const g1 = hex(color1.slice(3, 5))
  const b1 = hex(color1.slice(5, 7))
  const r2 = hex(color2.slice(1, 3))
  const g2 = hex(color2.slice(3, 5))
  const b2 = hex(color2.slice(5, 7))

  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)

  return `rgb(${r},${g},${b})`
}

const chartOptions = computed(() => {
  const dynamicColor = getColorGradient(animatedScore.value)

  return {
    chart: {
      type: 'radialBar',
      animations: { enabled: false }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '70%' },
        track: {
          background: '#eee',
          strokeWidth: '100%',
          margin: 5
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '32px',
            color: '#1b365d',
            fontWeight: 'bold',
            formatter: () => props.score.toString()
          }
        }
      }
    },
    fill: {
      colors: [dynamicColor]
    },
    labels: ['Fintegram Score']
  }
})
</script>


