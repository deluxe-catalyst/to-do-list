import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import components from './components'

import store from './store'
import router from './router'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component);
});

app.use(store)
app.use(router)
app.mount('#app')
