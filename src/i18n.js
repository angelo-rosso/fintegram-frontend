import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        welcome: 'Welcome to Fintegram',
        login: 'Login',
    },
    es: {
        welcome: 'Bienvenido a Fintegram',
        login: 'Iniciar sesión',
    },
}

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})
