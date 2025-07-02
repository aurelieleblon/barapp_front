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
        <tr v-for="cocktail in cocktails" :key="cocktail.id">
          <td>{{ cocktail.nom }}</td>
          <td>{{ cocktail.taille }}</td>
          <td>{{ cocktail.prix.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

type Cocktail = {
  id: number
  nom: string
  taille: string
  prix: number
}

const cocktails = ref<Cocktail[]>([])

const fetchCocktails = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cocktails', {
      withCredentials: true // important pour la session
    })

    if (Array.isArray(response.data)) {
      cocktails.value = response.data
    } else {
      console.error('response.data n\'est pas un tableau', response.data)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des cocktails', error)
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
</style>
