<template>
  <section class="fintegram-hero">
    <div class="hero-bg">
      <div class="container py-5">
        <div class="row align-items-center flex-column-reverse flex-lg-row">
          <!-- Text -->
          <div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0 animate-slide-left">
            <h1 class="fintegram-heading">{{ $t('hero.title') }}</h1>
            <p class="fintegram-subtitle">{{ $t('hero.subtitle') }}</p>
          </div>

          <!-- Gauge -->
          <!-- Gauge -->
            <div class="col-lg-6 text-center animate-slide-right">
            <div class="gauge-box px-4 py-3 rounded">
                <canvas ref="gaugeCanvas" width="250" height="150"></canvas>
                <div class="gauge-value mt-2 text-dark fw-bold fs-4">{{ currentValue }}</div>
            </div>
            </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const gaugeCanvas = ref(null)
const currentValue = ref(0)
let intervalId = null

const drawGauge = (ctx, value) => {
  ctx.clearRect(0, 0, 250, 150)

  // Label
  ctx.font = '16px Helvetica Neue, Arial, sans-serif'
  ctx.fillStyle = '#120052'
  ctx.textAlign = 'center'
  ctx.fillText(t('hero.canvasLabel'), 125, 30)

  // Gradient
  const gradient = ctx.createLinearGradient(45, 0, 205, 0)
  gradient.addColorStop(0, '#C62828')
  gradient.addColorStop(0.5, '#FFB300')
  gradient.addColorStop(1, '#43B36D')

  ctx.beginPath()
  ctx.lineWidth = 12
  ctx.strokeStyle = gradient
  const angle = Math.PI + (value / 850) * Math.PI
  ctx.arc(125, 125, 80, Math.PI, angle, false)
  ctx.stroke()
}

const animateGaugeTo = (ctx, finalValue) => {
  const duration = 2000
  const startTime = performance.now()

  const easeOut = (t) => 1 - Math.pow(1 - t, 3)

  const animate = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOut(progress)
    const value = Math.floor(eased * finalValue)

    currentValue.value = value
    drawGauge(ctx, value)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

const startLoop = (ctx) => {
  if (intervalId) clearInterval(intervalId)
  const loop = () => {
    const newValue = Math.floor(Math.random() * (850 - 350 + 1)) + 350
    animateGaugeTo(ctx, newValue)
  }
  loop() // run once immediately
  intervalId = setInterval(loop, 3000)
}

onMounted(() => {
  const ctx = gaugeCanvas.value.getContext('2d')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startLoop(ctx)
        } else {
          clearInterval(intervalId)
        }
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(gaugeCanvas.value)
})
</script>

<style scoped>
.fintegram-hero {
  position: relative;
  overflow: hidden;
}

.hero-bg {
  background: linear-gradient(to bottom right, #13A8FE 0%, #f9f9f9 100%);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

/* Animations */
@keyframes slideLeftFade {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRightFade {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-left {
  animation: slideLeftFade 1s ease forwards;
  opacity: 0;
}

.animate-slide-right {
  animation: slideRightFade 1s ease forwards;
  opacity: 0;
}

.gauge-value {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.gauge-box {
  background-color: #f2f6fb; /* Soft Fintegram-aligned color */
  display: inline-block;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

</style>
