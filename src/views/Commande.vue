<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

interface PrixDto {
  id: number | string;
  taille: string;
  prix: number;
}

interface CocktailDto {
  id: number | string;
  nom: string;
  prixParTaille: PrixDto[];
}

const panier = ref<CocktailDto[]>([])

onMounted(() => {
  const panierStorage = localStorage.getItem('panier')
  panier.value = panierStorage ? JSON.parse(panierStorage) : []
})

function getPrixMoyen(prixParTaille: PrixDto[]) {
  if (!prixParTaille || prixParTaille.length === 0) return 0;
  const total = prixParTaille.reduce((acc, p) => acc + p.prix, 0);
  return total / prixParTaille.length;
}

function retirerDuPanier(index: number) {
  panier.value.splice(index, 1)
  localStorage.setItem('panier', JSON.stringify(panier.value))
}

const total = computed(() => {
  return panier.value.reduce((sum, cocktail) => {
    return sum + getPrixMoyen(cocktail.prixParTaille)
  }, 0)
})

function validerCommande() {
  alert('Commande validée ! Merci de votre achat.')
  localStorage.removeItem('panier')
  panier.value = []
}
</script>
