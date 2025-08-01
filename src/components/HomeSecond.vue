<template>
  <section class="fintegram-hero">
    <div class="hero-bg">
      <div class="container py-5">
        <div class="row align-items-center flex-column-reverse flex-lg-row">
          <!-- Text -->
          <div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0 animate-slide-left">
            <h1 class="fintegram-heading">{{ t('journey.title') }}</h1>
            <p class="fintegram-subtitle">{{ t('journey.subtitle') }}</p>
          </div>

          <!-- Carousel -->
          <div class="col-lg-6 text-center animate-slide-right">
            <div
              id="fintegramCarousel"
              class="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div class="carousel-inner">
                <div
                  v-for="(step, index) in steps"
                  :key="index"
                  :class="['carousel-item', { active: index === 0 }]">
                  <div class="step px-4">
                    <div class="display-3 mb-3">{{ t(step.icon) }}</div>
                    <h3 class="h4 text-primary">{{ t(step.title) }}</h3>
                    <p class="text-secondary">{{ t(step.description) }}</p>
                  </div>
                </div>
              </div>

              <button class="carousel-control-prev" type="button" data-bs-target="#fintegramCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#fintegramCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = [
  {
    icon: '📝',
    title: 'journey.step1.title',
    description: 'journey.step1.desc'
  },
  {
    icon: '🔍',
    title: 'journey.step2.title',
    description: 'journey.step2.desc'
  },
  {
    icon: '⚙️',
    title: 'journey.step3.title',
    description: 'journey.step3.desc'
  },
  {
    icon: '📄',
    title: 'journey.step4.title',
    description: 'journey.step4.desc'
  }
]

onMounted(() => {
  const el = document.getElementById('fintegramCarousel')
  if (el && window.bootstrap) {
    new bootstrap.Carousel(el, {
      interval: 5000,
      ride: 'carousel'
    })
  }
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

.step {
  padding: 2rem;
}
</style>
