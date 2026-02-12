<template>
  <div class="records-container">
    <h1>記帳列表</h1>

    <!-- 新增記帳表單 -->
    <form @submit.prevent="handleAddRecord">
      <input v-model="newRecord.name" placeholder="項目" required />
      <input v-model.number="newRecord.amount" placeholder="金額" required />
      <button type="submit">新增</button>
    </form>

    <!-- 記帳列表 -->
    <ul>
      <li v-for="record in records" :key="record.id">
        <input v-model="record.name" />
        <input v-model.number="record.amount" />
        <button @click="handleUpdateRecord(record)">更新</button>
        <button @click="handleDeleteRecord(record.id)">刪除</button>
      </li>
    </ul>

    <!-- 總結金額 -->
    <div class="SUMMARY">
      <P>總收入:{{ totalIncome }}</P>
      <P>總支出:{{ totalExpense }}</P>
      <P>餘額:{{ balance}}</P>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/api'
import { computed } from 'vue'

// 記帳資料
const records = ref([])
// 新增記帳表單資料
const newRecord = ref({ name: '', amount: 0 })

// 1️⃣ GET 所有記帳（掛載時）
const fetchRecords = async () => {
  try {
    const res = await api.get('/api/records')
    records.value = res.data
  } catch (err) {
    console.error('無法取得記帳資料',err.response?.data || err)
  }
}

// 2️⃣ 新增記帳
const handleAddRecord = async () => {
    try {
        const res = await api.post('/api/records', newRecord.value)
        records.value.push(res.data)  // 更新畫面
        newRecord.value = { name:'', amount:0 } // 清空畫面 
    }catch (err) {
        console.error('新增失敗', err.response?.data || err)
    }
}

// 3️⃣ 更新記帳
const handleUpdateRecord = async (record) => {
    try {
        const res = await api.put(`/api/records/${record.id}`,record)
        console.log('更新成功', res.data)
    }catch (err) {
        console.log( '更新失敗', err.response?.data || err)
    }
}

// 4️⃣ 刪除記帳
const handleDeleteRecord = async (id) => {
    try {
        const res = await api.delete(`/api/records/${id}`)
        records.value = records.value.filter(r => r.id !== id) // 更新畫面
    }catch (err) {
        console.log('刪除失敗', err.response?.data || err)
    }
}

const totalIncome = computed(() => {
  return records.value
    .filter(r => r.amount >0)
    .reduce((sum, r) => sum + r.amount, 0)
})

const totalExpense = computed(() => {
  return records.value
    .filter(r => r.amount <0)
    .reduce((sum, r) => sum + r.amount, 0)
})

const balance = computed(() => {
  return totalIncome.value + totalExpense.value
})

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
.summary {
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}
.summary p {
  margin: 5px 0;
  font-weight: bold;
}
</style>