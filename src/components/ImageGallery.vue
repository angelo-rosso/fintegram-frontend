<template>
  <section class="image-gallery">
    <div class="image-item" v-for="(item, index) in images" :key="index">
      <img :src="item.src" :alt="t(item.alt)" class="img-fluid" />
      <div class="overlay-text" v-html="t(item.label)"></div>
    </div>
  </section>
</template>

<script setup>
import factoring from '@/assets/img/factoring.webp'
import investment from '@/assets/img/investment.webp'
import insurance from '@/assets/img/insurance.webp'
import credit from '@/assets/img/credit.webp'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const images = [
  { src: factoring, alt: 'gallery.factoring', label: 'gallery.factoring' },
  { src: investment, alt: 'gallery.investment', label: 'gallery.investment' },
  { src: insurance, alt: 'gallery.insurance', label: 'gallery.insurance' },
  { src: credit, alt: 'gallery.creditLine', label: 'gallery.creditLineHTML' }
]
</script>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

@media (max-width: 600px) {
  .image-gallery {
    grid-template-columns: 1fr;
  }
}

.image-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.overlay-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background: rgba(27, 54, 93, 0.85);
  color: #fff;
  padding: 0.5rem;
  font-weight: bold;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
