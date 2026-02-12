<template>
  <div class="records-container">
    <h1>記帳列表</h1>

    <!-- 新增記帳表單 -->
    <form @submit.prevent="handleAddRecord" class="add-form">
      <input v-model="newRecord.name" placeholder="項目" required />
      <input v-model.number="newRecord.amount" placeholder="金額(正數=收入, 負數=支出)" required />
      <button type="submit">新增</button>
    </form>

    <!-- 記帳列表 -->
    <ul class="record-list">
      <li v-for="record in records" :key="record.id">
        <input v-model="record.name" />
        <input v-model.number="record.amount" />
        <button @click="handleUpdateRecord(record)">更新</button>
        <button @click="handleDeleteRecord(record.id)">刪除</button>
      </li>
    </ul>

    <!-- 總結金額 -->
    <div class="SUMMARY">
      <div class="summary-item">
        <P class="income">總收入:{{ totalIncome }}</P>
        <div class="progress-bar">
          <div
            class="progress income"
            :style="{ width: incomePercent + '%' }"
          ></div>
        </div>
      </div>

      <div class="summary-item">
        <P class="expense">總支出:{{ totalExpense }}</P>
        <div class="progress-bar">
          <div
            class="progress expense"
            :style="{ width: expensPercent + '%'}"
          ></div>
        </div>
      </div>
      
      <div class="summary-item">
        <P class="balance">餘額:{{ balance}}</P>
      </div>
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
// 加入總收入 支出 餘額
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

// 加計算比例
const incomePercent = computed(() => {
  const total = totalIncome.value + Math.abs(totalExpense.value)
  return total ? Math.round((totalIncome.value / total) * 100) : 0
})

const expensePercent = computed(() => {
  const total = totalIncome.value + Math.abs(totalExpense.value)
  return total ? Math.round((Math.abs(totalExpense.value) / total) * 100) : 0
})


onMounted(fetchRecords)
</script>

<style scoped>
.records-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fafafa;
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
  padding: 15px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.summary-item {
  margin-bottom: 10px;
}
.progress-bar {
  width: 100%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}
.summary p {
  margin: 5px 0;
  font-weight: bold;
}
.summary .income {
  color: green;
}
.summary .expense {
  color: red;
}
.summary .balance {
  color: #333;
}
.progress {
  height: 100%;
  border-radius: 6px;
}
.progress.income {
  background-color: #4CAF50;
}
.progress.expense {
  background-color: #f44336;
}
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.add-form input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.add-form button {
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
.add-form button:hover {
  background-color: #45a049;
}
.record-list {
  list-style: none;
  padding: 0;
}
.record-list li {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.record-list input {
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.record-list button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.record-list button:first-of-type {
  background-color: #2196F3;
  color: white;
}
.record-list button:first-of-type:hover {
  background-color: #1976D2;
}
.record-list button:last-of-type {
  background-color: #f44336;
  color: white;
}
.record-list button:last-of-type:hover {
  background-color: #d32f2f;
}
</style>