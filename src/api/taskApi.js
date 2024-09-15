import { tasksApi } from './config'
// const baseURL = 'https://666867aff53957909ff7e50c.mockapi.io'

export const getTasks = async () => {
  try {
    const { data } = await tasksApi.get('/todo')
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const addTask = async (task) => {
  try {
    const response = await tasksApi.post('/todo', task)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateTask = async (task) => {
  try {
    const response = await tasksApi.put(`/todo/${task.id}`, task)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await tasksApi.delete(`/todo/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
