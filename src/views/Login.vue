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
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
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
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const form = ref({
  nom: '',
  email: '',
  motDePasse: '',
  role: ''
})

// Variable pour stocker le message d'erreur
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  try {
    await axios.post('http://localhost:8080/login', new URLSearchParams({
      email: email.value,
      password: password.value
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    })

    const roleRes = await axios.get('http://localhost:8080/api/utilisateurs/current-role', { withCredentials: true })
    const role = roleRes.data.role

    if (role === 'client') {
      router.push('/client/home')
    } else if (role === 'barmaker') {
      router.push('/barmaker/dashboard')
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
