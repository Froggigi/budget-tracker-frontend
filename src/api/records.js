import axios from './axios'

// 取得所有記帳
export const getRecords = () => {
  return axios.get('/api/records')
}

// 新增記帳
export const createRecord = (data) => {
  return axios.post('/api/records', data)
}

// 更新記帳
export const updateRecord = (id, data) => {
  return axios.put(`/api/records/${id}`, data)
}

// 刪除記帳
export const deleteRecord = (id) => {
  return axios.delete(`/api/records/${id}`)
}
