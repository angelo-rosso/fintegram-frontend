<template>
  <section class="fintegram-hero">
    <div class="hero-bg">
      <div class="container py-5">
        <div class="row align-items-center flex-column-reverse flex-lg-row">
          <!-- Text -->
          <div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0 animate-slide-left">
            <h1 class="fintegram-heading">
              {{ $t('ecosystem.title') }}
            </h1>
            <p class="fintegram-subtitle">
              {{ $t('ecosystem.subtitle') }}
            </p>
          </div>

          <!-- Image -->
          <div class="col-lg-6 text-center animate-slide-right">
            <img
              src="@/assets/img/flow-diag.webp"
              alt="Ecosistema empresarial"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
// No JS logic needed unless you want to animate on scroll
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
</style>
