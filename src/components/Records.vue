<template>
  <div class="records-container">
    <h1>記帳列表</h1>

    <!-- 新增記帳表單 -->
    <form @submit.prevent="handleAddRecord">
      <input v-model="newRecord.title" placeholder="項目" required />
      <input v-model.number="newRecord.amount" placeholder="金額" required />
      <button type="submit">新增</button>
    </form>

    <!-- 記帳列表 -->
    <ul>
      <li v-for="record in records" :key="record.id">
        <input v-model="record.title" />
        <input v-model.number="record.amount" />
        <button @click="handleUpdateRecord(record)">更新</button>
        <button @click="handleDeleteRecord(record.id)">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../api/axios'

// 記帳資料
const records = ref([])
// 新增記帳表單資料
const newRecord = ref({ title: '', amount: 0 })
// // 取得 JWT
// const token = localStorage.getItem('token') 
// console.log('JWT token:', token)

// 1️⃣ GET 所有記帳（掛載時）
const fetchRecords = async () => {
  try {
    const res = await axios.get('/api/records')
    records.value = res.data
  } catch (err) {
    console.error('無法取得記帳資料',err.response?.data || err)
  }
}

// 2️⃣ 新增記帳
const handleADDRecords = (async () => {
    try {
        const res = await axios.post('/api/records', newRecord.value)
        records.value.push(res.data)  // 更新畫面
        newRecord.value = { title:'', amount:0 } // 清空畫面 
    }catch (err) {
        console.error('新增失敗', err.response?.data || err)
    }
})

// 3️⃣ 更新記帳
const handleUpdateRecord = async () => {
    try {
        const res = await axios.put(`/api/records/${record.id}`,record)
        console.log('更新成功', res.data)
    }catch (err) {
        console.log( '更新失敗', err.response?.data || err)
    }
}

// 4️⃣ 刪除記帳
const handleDeleteRecord = async () => {
    try {
        res = await axios.delete(`/api/records/${id}`)
        records.value = records.value.filter(r => r.id !== id) // 更新畫面
    }catch (err) {
        console.log('刪除失敗', err.response?.data || err)
    }
}
onMounted(fetchRecords)
</script>

<style scoped>
.records-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
input {
  margin: 5px;
  padding: 5px;
}
button {
  margin: 5px;
  padding: 5px 10px;
}
</style>