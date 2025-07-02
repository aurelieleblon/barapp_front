<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input type="text" id="nom" v-model="form.nom" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="motDePasse">Mot de passe</label>
        <input type="password" id="motDePasse" v-model="form.motDePasse" required />
      </div>

      <div class="form-group">
        <label for="role">Rôle</label>
        <select id="role" v-model="form.role" required>
          <option disabled value="">Choisir un rôle</option>
          <option value="client">Client</option>
          <option value="barmaker">Barmaker</option>
        </select>
      </div>

      <button type="submit">S'inscrire</button>
    </form>

    <!-- Affichage du message d'erreur -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  nom: '',
  email: '',
  motDePasse: '',
  role: ''
})

// Variable pour stocker le message d'erreur
const errorMessage = ref('')

const registerUser = async () => {
  errorMessage.value = ''  // reset à chaque tentative
  try {
    await axios.post('http://localhost:8080/api/utilisateurs', form.value)
    alert('Inscription réussie !')
    // Rediriger vers une autre page si besoin
  } catch (error: any) {
    console.error('Erreur lors de l’inscription', error)

    // Si l'erreur vient du backend et contient un message, on l'affiche
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Email déjà existant.'
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Style message d'erreur */
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
