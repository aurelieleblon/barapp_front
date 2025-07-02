<template>
  <div class="cocktail-card">
    <img :src="imageUrl" alt="Image du cocktail" class="cocktail-image" @error="onImageError" />
    <h3 class="cocktail-name">{{ cocktail.nom }}</h3>
    <p>Taille : {{ cocktail.taille || 'N/A' }}</p>
<p>Prix : {{ (cocktail.prix ?? 0).toFixed(2) }} €</p>
    <button class="add-to-cart-button" @click="$emit('ajouter', cocktail)">Ajouter au panier</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  cocktail: {
    id: number | string;
    nom: string;
    taille: string;
    prix: number;
    imageUrl?: string;
  }
}>()

const defaultImage = 'https://images.unsplash.com/photo-1562440499-c8b9d6f6615f?auto=format&fit=crop&w=400&q=80'
const imageUrl = ref(props.cocktail.imageUrl || defaultImage)

function onImageError() {
  imageUrl.value = defaultImage
}

</script>




<style scoped>
.cocktail-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-width: 220px;
  text-align: center;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}
.cocktail-card:hover {
  box-shadow: 0 6px 15px rgb(0 0 0 / 0.2);
}

.cocktail-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.cocktail-name {
  margin: 0 0 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
}

.prices-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: #444;
}
.prices-list li {
  margin-bottom: 0.3rem;
}

.add-to-cart-button {
  margin-top: 0.75rem;
  background-color: #d3d3d3; /* gris clair */
  color: #333; /* texte un peu foncé pour le contraste */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px; /* bords arrondis */
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.add-to-cart-button:hover {
  background-color: #bcbcbc; /* gris un peu plus foncé au hover */
}
</style>

