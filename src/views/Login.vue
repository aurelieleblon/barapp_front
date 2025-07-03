<template>
  <div class="register-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          autocomplete="username"
          placeholder="Entrez votre email"
        />
      </div>

      <div class="form-group">
        <label for="motDePasse">Mot de passe</label>
        <input
          type="password"
          id="motDePasse"
          v-model="motDePasse"
          required
          autocomplete="current-password"
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button type="submit">Se connecter</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const motDePasse = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    await axios.post(
      'http://localhost:8080/api/login',
      {
        email: email.value,
      motDePasse: motDePasse.value   // Utilise "password" ici si ton backend attend ce nom
      }
      
    )
    router.push('/')
  } catch (error: any) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Email ou mot de passe incorrect'
    } else {
      errorMessage.value = 'Erreur lors de la connexion.'
    }
    console.error('Erreur lors de la connexion', error)
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

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005fa3;
}

.error-message {
  color: red;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
