import { tasksApi } from './config'
// const baseURL = 'https://666867aff53957909ff7e50c.mockapi.io/'

export const getTasks = async () => {
  try {
    const response = await tasksApi.get('/todo')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const addTask = async (task) => {
  try {
    const response = await tasksApi.post('/todo', task)
    console.log('posted', response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateTask = async (task) => {
  try {
    const response = await tasksApi.put(`/todo/${task.id}`, task)
    console.log('upd', response.data)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await tasksApi.delete(`/todo/${id}`)
    console.log('deleteid', id, response.data)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
