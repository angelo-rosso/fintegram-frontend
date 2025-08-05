<template>
  <header>
    <nav class="navbar navbar-expand-lg fintegram-navbar shadow-sm fixed-top">
      <div class="container">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="@/assets/img/fintegram-logo.png" alt="Fintegram Logo" height="40" class="me-2" />
        </router-link>

        <!-- Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" exact-active-class="active" @click="collapseMenu">
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/scoring" class="nav-link" exact-active-class="active" @click="collapseMenu">
                {{ $t('nav.scoring') }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/education" class="nav-link" exact-active-class="active" @click="collapseMenu">
                {{ $t('nav.education') }}
              </router-link>
            </li>
            <li class="nav-item">
              <a href="/contact" class="nav-link" @click="collapseMenu">
                {{ $t('nav.contact') }}
              </a>
            </li>
          </ul>

          <!-- Language Switcher -->
          <div class="d-flex align-items-center ms-3">
            <select class="form-select form-select-sm" v-model="currentLang" @change="changeLanguage"
              style="width: auto;">
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

        </div>
      </div>
    </nav>
  </header>
</template>


<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLang = ref(locale.value)

async function changeLanguage() {
  try {
    const res = await fetch(`/api/i18n?lang=${currentLang.value}`, {
      headers: { 'Accept': 'application/json' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const messages = await res.json()
    const { i18n } = await import('@/i18n')
    i18n.global.setLocaleMessage(currentLang.value, messages)
    locale.value = currentLang.value
    localStorage.setItem('lang', currentLang.value)
  } catch (err) {
    console.error('Failed to load translations:', err)
  }
}
function collapseMenu() {
  const collapseEl = document.getElementById('navbarNav')
  if (collapseEl?.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false })
    bsCollapse.hide()
  }
}
</script>

<style scoped>
.fintegram-navbar {
  background-color: #ffffff;
  /* white base */
  border-bottom: 2px solid #13A8FE;
  /* primary accent */
}

.navbar-nav .nav-link {
  color: #120052;
  /* dark text */
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.router-link-exact-active {
  color: #13A8FE;
  /* primary highlight on hover/active */
  text-decoration: underline;
}

.navbar-toggler {
  border-color: #13A8FE;
}
</style>
