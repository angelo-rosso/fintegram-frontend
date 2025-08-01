<template>
  <section id="fourth-section">
    <h1>{{ $t('collab.title') }}</h1>
    <p>{{ $t('collab.description') }}</p>

    <section id="fintegram-flow" class="text-center py-5">
      <h2>{{ $t('collab.how') }}</h2>
      <div class="container">
        <img :src="flowImg" alt="Flow Diagram" />
      </div>
    </section>
  </section>
</template>


<script setup>
import flowImg from '@/assets/img/flow_diag.webp'
</script>

<style scoped>
#fourth-section {
  padding: 2rem 1rem;
  text-align: center;
}
#fourth-section h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
#fourth-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.flow-image-wrapper {
  max-width: 100%;
  height: auto;
}
</style>
