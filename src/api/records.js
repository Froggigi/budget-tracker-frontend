import api from '../utils/api'

// 取得所有記帳
export const getRecords = () => {
  return api.get('/api/records')
}

// 新增記帳
export const createRecord = (data) => {
  return api.post('/api/records', data)
}

// 更新記帳
export const updateRecord = (id, data) => {
  return api.put(`/api/records/${id}`, data)
}

// 刪除記帳
export const deleteRecord = (id) => {
  return api.delete(`/api/records/${id}`)
}
