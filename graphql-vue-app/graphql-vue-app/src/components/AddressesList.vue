<template>
  <div class="addresses-list">
    <h2>Addresses</h2>
    
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Error: {{ error.message }}</p>
    </div>

    <ul v-else class="list">
      <li v-for="(address, index) in addresses" :key="index" class="list-item">
        <p>{{ address.city }}, {{ address.street }}, {{ address.zip }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAddresses } from '@/composables/useAddresses.js'

const { loading, error, addresses } = useAddresses()
</script>

<style scoped>
.addresses-list {
  width: 100%;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 4px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item p {
  margin: 0;
  color: #555;
}
</style>
