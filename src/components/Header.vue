<template>
  <header class="header-image">
    <div class="header-content">
      <h1>Bar'App</h1>
      
    </div>
  </header>
</template>

<script setup lang="ts">
// Pas besoin de script ici, simple header statique
</script>

<style scoped>
.header-image {
  background-image: url('https://boutiquekozy.ca/cdn/shop/products/fta7003-19_1_lg.jpg?v=1673895419&width=500');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0 0 6px rgba(0,0,0,0.7);
}

/* .header-content {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
} */

h1 {
  margin: 0;
  font-size: 5rem;
  font-family: "Indie Flower", cursive;
  font-weight: 500;
  font-style: normal;
}

p {
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
}
</style>
