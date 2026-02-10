<template>
  <div class="login-container">
    <h1>登入</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../utils/api'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    // 登入成功，存 JWT

    // 分開寫法
    // const token = res.data.token
    // localStorage.setItem('token', token)

    // 合併寫法
    localStorage.setItem('token', res.data.token) 
    alert('登入成功！JWT 已存')

    router.push('/records')
  } catch (err) {
    // 前端錯誤訊息會優先顯示後端回傳的 message
    errorMessage.value = err.response?.data?.message || '登入失敗'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
input {
  width: 100%;
  margin: 5px 0 15px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 10px;
}
</style>
