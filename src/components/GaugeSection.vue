<template>
  <section id="fifth-section">
    <h1>Evaluación crediticia</h1>
    <p>Carga de carpeta tributaria electrónica</p>

    <div class="gauge-container text-center">
      <h4 class="gauge-title">Tu calificación:</h4>
      <h5 id="gauge-subtitle">{{ subtitle }}</h5>
      <canvas ref="gaugeCanvas" width="300" height="150"></canvas>
      <p id="gaugeValue">{{ gaugeValue }}</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const subtitle = ref('Ejemplo')
const gaugeValue = ref(72)
const gaugeCanvas = ref(null)

function drawGauge(value) {
  const canvas = gaugeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const centerX = canvas.width / 2
  const centerY = canvas.height
  const radius = 120

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw background arc
  ctx.beginPath()
  ctx.lineWidth = 15
  ctx.strokeStyle = '#e0e0e0'
  ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI)
  ctx.stroke()

  // Draw value arc
  ctx.beginPath()
  ctx.strokeStyle = value >= 80 ? '#28a745' : value >= 50 ? '#ffc107' : '#dc3545'
  const endAngle = Math.PI + (value / 100) * Math.PI
  ctx.arc(centerX, centerY, radius, Math.PI, endAngle)
  ctx.stroke()

  // Text value
  ctx.font = '20px Arial'
  ctx.fillStyle = '#333'
  ctx.textAlign = 'center'
  ctx.fillText(`${value}`, centerX, centerY - 10)
}

onMounted(() => {
  drawGauge(gaugeValue.value)
})
</script>

<style scoped>
#fifth-section {
  padding: 2rem 1rem;
  text-align: center;
}

.gauge-container {
  margin-top: 2rem;
}

canvas {
  display: block;
  margin: 0 auto;
}
</style>
