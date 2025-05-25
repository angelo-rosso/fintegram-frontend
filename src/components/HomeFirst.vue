<template>
  <section class="fintegram-hero">
    <div class="hero-bg">
      <div class="container py-5">
        <div class="row align-items-center flex-column-reverse flex-lg-row">
          <!-- Text -->
          <div
            class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0 animate-slide-left">
            <h1 class="fintegram-heading">Pyme Power</h1>
            <p class="fintegram-subtitle">
              Te acompañamos en el crecimiento de tu emprendimiento.
            </p>
          </div>

          <!-- Image -->
          <div class="col-lg-6 text-center animate-slide-right">
            <img
              src="@/assets/img/diagram.webp"
              alt="Diagrama Fintegram"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
/* Section container */
.fintegram-hero {
  position: relative;
  overflow: hidden;
}

/* Background shape with diagonal/curved cut */
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
</style>
