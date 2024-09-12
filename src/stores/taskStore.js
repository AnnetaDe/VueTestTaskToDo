import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getTasks, addTask, updateTask, deleteTask } from '../api/taskApi'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  getters: {
    doneTasks: (state) => state.tasks.filter((task) => task.done),
    favoriteTasks: (state) => state.tasks.filter((task) => task.favorite)
  },
  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      this.tasks = await getTasks()
      this.loading = false
    },
    async addNewTask(task) {
      this.loading = true
      this.error = null
      const newTask = await addTask(task)
      this.tasks.push(newTask)
      this.loading = false
    },
    async updateTask(task) {
      this.loading = true
      this.error = null
      await updateTask(task)
      const index = this.tasks.findIndex((t) => t.id === task.id)
      this.tasks[index] = task
      this.loading = false
    },
    async deleteTask(id) {
      this.loading = true
      this.error = null
      await deleteTask(id)
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.loading = false
    }
  }
})
