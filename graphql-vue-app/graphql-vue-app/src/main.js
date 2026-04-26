import { createApp } from 'vue'
import App from './App.vue'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apolloClient'

const app = createApp(App);
provideApolloClient(apolloClient);

app.mount('#app')
