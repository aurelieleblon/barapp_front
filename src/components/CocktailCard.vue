<template>
  <div class="cocktail-card">
    <img
      :src="imageUrl"
      alt="Image du cocktail"
      class="cocktail-image"
      @error="onImageError"
    />
    <h3 class="cocktail-name">{{ cocktail.nom }}</h3>
    <ul class="prices-list">
      <li v-for="prix in cocktail.prixParTaille" :key="prix.id">
        {{ formatTaille(prix.taille) }} : {{ prix.prix.toFixed(2) }} €
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

interface PrixDto {
  id: number | string;
  taille: string;
  prix: number;
}

interface CocktailDto {
  id: number | string;
  nom: string;
  prixParTaille: PrixDto[];
  imageUrl?: string; // Optionnel, sinon on met une image par défaut
}

const props = defineProps<{
  cocktail: CocktailDto
}>();

const defaultImage = 'https://images.unsplash.com/photo-1562440499-c8b9d6f6615f?auto=format&fit=crop&w=400&q=80';

const imageUrl = ref(props.cocktail.imageUrl || defaultImage);

function onImageError() {
  imageUrl.value = defaultImage;
}

function formatTaille(taille: string) {
  // Par exemple, S, M, L en texte plus friendly
  switch(taille.toUpperCase()) {
    case 'S': return 'Small';
    case 'M': return 'Medium';
    case 'L': return 'Large';
    default: return taille;
  }
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
</style>

<!-- <template>
  <div class="cocktail-card">
    <img
      :src="imageUrl"
      alt="Image du cocktail"
      class="cocktail-image"
      @error="onImageError"
    />
    <h3 class="cocktail-name">{{ cocktail.nom }}</h3>
    <ul class="prices-list">
      <li v-for="prix in cocktail.prixParTaille" :key="prix.id">
        {{ formatTaille(prix.taille) }} : {{ prix.prix.toFixed(2) }} €
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

interface PrixDto {
  id: number | string;
  taille: string;
  prix: number;
}

interface CocktailDto {
  id: number | string;
  nom: string;
  prixParTaille: PrixDto[];
  imageUrl?: string; // Optionnel, sinon on met une image par défaut
}

const props = defineProps<{
  cocktail: CocktailDto
}>();

const defaultImage = 'https://images.unsplash.com/photo-1562440499-c8b9d6f6615f?auto=format&fit=crop&w=400&q=80';

const imageUrl = ref(props.cocktail.imageUrl || defaultImage);

function onImageError() {
  imageUrl.value = defaultImage;
}

function formatTaille(taille: string) {
  // Par exemple, S, M, L en texte plus friendly
  switch(taille.toUpperCase()) {
    case 'S': return 'Small';
    case 'M': return 'Medium';
    case 'L': return 'Large';
    default: return taille;
  }
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
</style>




 -->
