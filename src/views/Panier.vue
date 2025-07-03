<template>
  <div class="panier-container">
    <h1>Votre Panier</h1>

    <div v-if="panier.length === 0" class="empty">
      Le panier est vide.
    </div>

    <div v-else class="panier-list">
      <div
        v-for="(item, index) in panier"
        :key="index"
        class="panier-item"
      >
        <img :src="item.imageUrl" alt="Cocktail" class="cocktail-img" />
        <div class="item-info">
          <h3>{{ item.nom }}</h3>
          <p>{{ item.taille }}</p>
          <p>{{ item.prix.toFixed(2) }} €</p>
        </div>
        <button @click="retirerDuPanier(index)">Retirer</button>
      </div>

      <!-- 🔢 Total -->
      <div class="panier-total">
        Total : <span>{{ totalPrix.toFixed(2) }} €</span>
      </div>

      <!-- Bouton Passer commande -->
      <div class="panier-actions">
        <button @click="passerCommande" :disabled="panier.length === 0">
          Passer commande
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface CocktailPlat {
  id: string | number
  nom: string
  taille: string
  prix: number
  imageUrl?: string
}

const panier = ref<CocktailPlat[]>([])

onMounted(() => {
  try {
    const stored = localStorage.getItem('panier')
    const parsed = stored ? JSON.parse(stored) : []
    panier.value = parsed.filter(
      (item: any) => item && typeof item.nom === 'string' && typeof item.prix === 'number'
    ) as CocktailPlat[]
  } catch (e) {
    console.error('Erreur lors du chargement du panier :', e)
    panier.value = []
  }
})

function retirerDuPanier(index: number) {
  panier.value.splice(index, 1)
  localStorage.setItem('panier', JSON.stringify(panier.value))
}

const totalPrix = computed(() =>
  panier.value.reduce((total, item) => total + (item.prix || 0), 0)
)

function passerCommande() {
  if (panier.value.length === 0) {
    alert("Votre panier est vide !");
    return;
  }
  // Ici tu peux remplacer l'alert par ta logique pour envoyer la commande
  alert("Commande passée avec succès !");
  
  // Vider le panier après commande
  panier.value = []
  localStorage.removeItem('panier')

  async function passerCommande() {
  if (panier.value.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/commandes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(panier.value),
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.statusText}`);
    }

    alert("Commande passée avec succès !");
    panier.value = [];
    localStorage.removeItem('panier');
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la commande, veuillez réessayer.");
  }
}

}
</script>

<style scoped>
.panier-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.empty {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.panier-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panier-item {
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 1rem;
  gap: 1rem;
}

.cocktail-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex-grow: 1;
}

.item-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.item-info p {
  margin: 0.3rem 0;
  color: #555;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e63939;
}

.panier-total {
  text-align: right;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
}

/* Style bouton Passer commande */
.panier-actions {
  text-align: right;
  margin-top: 1rem;
}

.panier-actions button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.panier-actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.panier-actions button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>
