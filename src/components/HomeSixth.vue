<template>
  <section class="fintegram-duo-section">
    <div class="subsection curved-top py-5">
      <div class="container">
        <!-- Subsection 1: Tecnología -->
        <div class="row align-items-center mb-5 flex-column-reverse flex-lg-row">
          <div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0 animate-slide-left">
            <h2 class="fintegram-heading">Tecnología</h2>
            <p class="fintegram-subtitle">
              Aplicamos tecnología apalancada en big data para generar leads con un alto porcentaje de conversión.
            </p>
          </div>
          <div class="col-lg-6 text-center animate-slide-right">
            <img
              src="@/assets/img/tech-image.webp"
              alt="Tecnología"
              class="img-fluid duo-image"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="subsection gradient-transition py-5">
      <div class="container">
        <!-- Subsection 2: Ecosistema -->
        <div class="row align-items-center flex-column flex-lg-row">
          <div class="col-lg-6 text-center animate-slide-left mb-4 mb-lg-0">
            <img
              src="@/assets/img/teamwork-image.webp"
              alt="Ecosistema"
              class="img-fluid duo-image"
            />
          </div>
          <div class="col-lg-6 text-center text-lg-start animate-slide-right">
            <h2 class="fintegram-heading">Ecosistema</h2>
            <p class="fintegram-subtitle">
              Aplicamos tecnología apalancada en big data para generar leads con un alto porcentaje de conversión.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.fintegram-duo-section {
  background-color: #E5ECF2;
  overflow: hidden;
}

.subsection {
  position: relative;
  z-index: 1;
}

.gradient-transition {
  background: linear-gradient(to bottom right, #EDF3F9 0%, #E5ECF2 100%);
}

.curved-top {
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
  background-color: #E5ECF2;
}

/* Headings - smaller + responsive */
.fintegram-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: #120052;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.75rem;
}

/* Subtitles - left aligned on desktop, centered on mobile */
.fintegram-subtitle {
  font-size: 1rem;
  color: #7B90A1;
  font-weight: 400;
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

@media (min-width: 768px) {
  .fintegram-subtitle {
    text-align: left;
    margin-left: 0;
    margin-right: 0;
  }

  .fintegram-heading {
    font-size: 2rem;
  }
}

/* Image sizing */
.duo-image {
  max-width: 60%;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

/* Animation */
.animate-slide-left {
  animation: slideLeftFade 1s ease forwards;
  opacity: 0;
}

.animate-slide-right {
  animation: slideRightFade 1s ease forwards;
  opacity: 0;
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

</style>
