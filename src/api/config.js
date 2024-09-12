import axios from 'axios'

const baseURL = 'https://666867aff53957909ff7e50c.mockapi.io/'
export const tasksApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
