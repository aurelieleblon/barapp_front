<template>
  <div>
      <div class="centered-container">
  <p>Bar’App est une application vous permettant de commander vos cocktails préférés et de suivre l’avancement de leur préparation.</p>
</div><
<h1>Nos Cocktails</h1>
    <div class="cocktail-list">
      <CocktailCard
        v-for="cocktail in cocktails"
        :key="cocktail.id"
        :cocktail="cocktail"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CocktailCard from '../components/CocktailCard.vue'

interface PrixDto {
  id: number | string;
  taille: string;
  prix: number;
}

interface CocktailDto {
  id: number | string;
  nom: string;
  prixParTaille: PrixDto[];
  imageUrl?: string;
}

const cocktails = ref<CocktailDto[]>([])

const cocktailImages = [
  'https://www.themixer.com/en-uk/wp-content/uploads/sites/3/2022/07/147.-Bronx-Cocktail-Ingredients_Canva_yulka3ice.jpg',
  'https://i.pinimg.com/originals/44/a3/a2/44a3a2b008e44dcb12fa564663daf7aa.jpg',
  'https://www.tasteofhome.com/wp-content/uploads/2017/09/Brandy-Old-Fashioned-Sweet_exps37101_HC2847498D03_28_5bC_RMS.jpg',
  'https://www.tastingtable.com/img/gallery/tropical-painkiller-cocktail-recipe/l-intro-1662490463.jpg',
  'https://th.bing.com/th/id/R.5b3001eaa4325048d0be82b3f524c1c6?rik=7xill%2bpHaaepqA&pid=ImgRaw&r=0',
  'https://images.cocktailwave.com/galaxy-cocktail.png'
]

const fetchCocktails = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cocktails')
    cocktails.value = response.data.map((cocktail: CocktailDto, index: number) => ({
      ...cocktail,
      imageUrl: cocktailImages[index % cocktailImages.length]
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des cocktails', error)
  }
}

onMounted(() => {
  fetchCocktails()
})
</script>

<style scoped>
.cocktail-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

h1 {
  font-size: 3rem;
  font-family: "Indie Flower", cursive;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  
}

p {font-size: 2rem;
  font-family: "Indie Flower", cursive;
  font-weight: 500;
  font-style: normal;
  text-align: center;
}

.centered-container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 800px;   /* limite la largeur */
  margin: 0 auto;     /* centre horizontalement dans la page */
  padding: 0 2rem;    /* espace à gauche et à droite */
}

</style>
