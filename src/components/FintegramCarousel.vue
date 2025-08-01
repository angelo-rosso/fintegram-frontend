<template>
  <section class="fintegram-process">
    <h1 class="section-title text-center mb-4">{{ t(process.title) }}</h1>
    <div id="fintegramCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000"
         data-bs-touch="true" data-bs-pause="false">
      <div class="carousel-inner">
        <div v-for="(item, index) in steps" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <div class="step text-center">
            <div class="icon">{{ item.icon }}</div>
            <h3>{{ t(item.title) }}</h3>
            <p>{{ t(item.description) }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#fintegramCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">{{ t(process.prev) }}</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#fintegramCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">{{ t(process.next) }}</span>
      </button>
    </div>
  </section>
</template>


<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const steps = [
  { icon: '📝', title: 'process.steps.register.title', description: 'process.steps.register.desc' },
  { icon: '🔍', title: 'process.steps.report.title', description: 'process.steps.report.desc' },
  { icon: '⚙️', title: 'process.steps.consulting.title', description: 'process.steps.consulting.desc' },
  { icon: '📄', title: 'process.steps.cert.title', description: 'process.steps.cert.desc' },
  { icon: '🤝', title: 'process.steps.match.title', description: 'process.steps.match.desc' }
]
</script>
