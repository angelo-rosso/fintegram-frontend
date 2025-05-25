<template>
  <section class="fintegram-process">
    <h1 class="section-title text-center mb-4">Tu camino con Fintegram</h1>
    <div id="fintegramCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000"
         data-bs-touch="true" data-bs-pause="false">
      <div class="carousel-inner">
        <div v-for="(item, index) in steps" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <div class="step text-center">
            <div class="icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#fintegramCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#fintegramCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { icon: '📝', title: 'Registro', description: 'Ingresa tus credenciales para enrolarte en Fintegram.' },
  { icon: '🔍', title: 'Radiografía', description: 'Accede a tu perfil financiero y genera un reporte.' },
  { icon: '⚙️', title: 'Consultoría', description: 'Recibe análisis y recomendaciones a medida.' },
  { icon: '📄', title: 'Certificación', description: 'Certificación financiera, legal y tributaria.' },
  { icon: '🤝', title: 'Match', description: 'Ofertas pre-aprobadas según tu perfil: factoring, seguros, inversión.' }
]
</script>
