<template>
  <div class="register-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Se connecter</button>
    </form>

    <p v-if="errorMessage" style="color: red; margin-top: 1rem;">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
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
      router.push('/')
    }
  } catch (error: any) {
    errorMessage.value = 'Erreur lors de la connexion : ' + (error.response?.data?.message || error.message)
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
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
