<template>
  <section id="sixth-section">
    <div
      v-for="(section, index) in sections"
      :key="index"
      :class="['sub-section', { reverse: index % 2 === 1 }]"
    >
      <img :src="section.image" :alt="section.alt" class="img-fluid" />
      <div class="text-content">
        <h1>{{ section.title }}</h1>
        <p>{{ section.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import techImage from '@/assets/img/tech-image.webp'
import teamworkImage from '@/assets/img/teamwork-image.webp'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const sections = [
  {
    title: $t('sixthSection.tech.title'),
    text: $t('sixthSection.tech.text'),
    image: techImage,
    alt: $t('sixthSection.tech.alt')
  },
  {
    title: $t('sixthSection.eco.title'),
    text: $t('sixthSection.eco.text'),
    image: teamworkImage,
    alt: $t('sixthSection.eco.alt')
  }
]
</script>

<style scoped>
#sixth-section {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.sub-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
}

.sub-section.reverse {
  flex-direction: row-reverse;
}

.text-content {
  flex: 1;
  min-width: 250px;
}

.sub-section img {
  flex: 1;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
