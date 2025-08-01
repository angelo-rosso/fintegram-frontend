<template>
  <section class="fintegram-hero">
    <div class="hero-bg">
      <div class="container py-5">
        <div class="row align-items-center flex-column-reverse flex-lg-row">
          <!-- Text -->
          <div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0 animate-slide-left">
            <h1 class="fintegram-heading">{{ t('banking.title') }}</h1>
            <p class="fintegram-subtitle">{{ t('banking.subtitle') }}</p>
          </div>

          <!-- 2x2 image grid -->
          <div class="col-lg-6 animate-slide-right">
            <div class="grid-2x2">
              <div v-for="(item, index) in gridImages" :key="index" class="circle-img-container">
                <img :src="item.src" :alt="t(item.alt)" class="circle-img" />
                <div class="hover-label">{{ t(item.label) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
const gridImages = [
  { src: factoring, alt: 'banking.option.factoring', label: 'banking.option.factoring' },
  { src: investment, alt: 'banking.option.investment', label: 'banking.option.investment' },
  { src: insurance, alt: 'banking.option.insurance', label: 'banking.option.insurance' },
  { src: credit, alt: 'banking.option.creditLine', label: 'banking.option.creditLine' }
]

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

/* 2x2 Grid Styles */
.grid-2x2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.circle-img-container {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.circle-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.4s ease;
}

.circle-img-container:hover .circle-img {
  transform: scale(1.05);
}

.hover-label {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(27, 54, 93, 0.8);
  color: #fff;
  text-align: center;
  font-weight: 600;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.circle-img-container:hover .hover-label {
  opacity: 1;
}
</style>
