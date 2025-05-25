<template>
  <div class="certificacion-page">
    <section class="intro text-center py-5">
      <h1>Certificación Fintegram</h1>
      <p>
        Valida tu salud financiera, tributaria y legal con una certificación clara, profesional y estandarizada.
      </p>
    </section>

    <section class="benefits container">
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="icon">📄</div>
          <h3>Informe Profesional</h3>
          <p>Diagnóstico completo y visual de tu situación financiera basado en datos reales.</p>
        </div>
        <div class="col-md-4 mb-4">
          <div class="icon">🔒</div>
          <h3>Confiabilidad</h3>
          <p>Metodología basada en estándares auditables y fuentes tributarias oficiales (SII).</p>
        </div>
        <div class="col-md-4 mb-4">
          <div class="icon">📢</div>
          <h3>Mejor presentación</h3>
          <p>Ideal para postular a créditos, levantar inversión o participar en licitaciones.</p>
        </div>
      </div>
    </section>

    <section class="call-to-action text-center py-5">
      <h2>¿Listo para certificarte?</h2>
      <p>Da el siguiente paso para profesionalizar tu emprendimiento.</p>
      <router-link to="/contacto">
        <button class="btn btn-primary">Solicitar Certificación</button>
      </router-link>
    </section>
  </div>
</template>

<script setup>
// Static page – no JS logic for now
</script>

<style scoped>
.intro h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.intro p {
  font-size: 1.2rem;
}

.benefits .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.call-to-action {
  background-color: #f3f6f9;
}

.call-to-action button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
}
</style>
