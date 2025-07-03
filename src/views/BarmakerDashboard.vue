<template>
  <div>
    <h1>Tableau de bord Barmaker</h1>
    <p>Bienvenue sur la page dédiée aux barmakers.</p>

    <div v-if="cocktails.length === 0">
      <p>Aucun cocktail disponible pour le moment.</p>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Taille</th>
          <th>Prix (€)</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="cocktail in cocktails" :key="cocktail.id">
          <tr @click="toggleAccordion(cocktail.id)" style="cursor: pointer;">
            <td>{{ cocktail.nom }}</td>
            <td>{{ cocktail.taille }}</td>
            <td>{{ cocktail.prix.toFixed(2) }}</td>
          </tr>
          <tr v-if="ouvert === cocktail.id">
            <td colspan="3">
              <strong>Ingrédients :</strong>
              <ul>
                <li v-for="ingredient in ingredients" :key="ingredient.nom">
                  {{ ingredient.nom }} - {{ ingredient.quantite }}
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Cocktail {
  id: number
  nom: string
  taille: string
  prix: number
}

interface Ingredient {
  nom: string
  quantite: string
}

const cocktails = ref<Cocktail[]>([])
const ingredients = ref<Ingredient[]>([])
const ouvert = ref<number | null>(null)

const fetchCocktails = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cocktails', {
      withCredentials: true
    })
    cocktails.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des cocktails', error)
  }
}

const toggleAccordion = async (idCocktail: number) => {
  if (ouvert.value === idCocktail) {
    ouvert.value = null
    return
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/cocktails/${idCocktail}/ingredients`)
    ingredients.value = response.data
    ouvert.value = idCocktail
  } catch (error) {
    console.error('Erreur lors du chargement des ingrédients', error)
  }
}

onMounted(() => {
  fetchCocktails()
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f0f0f0;
}

tr:hover td {
  background-color: #f9f9f9;
}

ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}
</style>
