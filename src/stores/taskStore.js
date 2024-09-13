import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addTask, updateTask, deleteTask } from '../api/taskApi'
import { tasksApi } from '@/api/config'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: []
  }),
  // getters: {
  //   doneTasks: (state) => state.tasks.filter((task) => task.done),
  //   favoriteTasks: (state) => state.tasks.filter((task) => task.favorite),
  //   filteredTasks: (state) => (filter) => {
  //     if (filter === 'all') {
  //       return state.tasks
  //     }
  //     if (filter === 'done') {
  //       return state.tasks.filter((task) => task.done)
  //     }
  //     if (filter === 'favorite') {
  //       return state.tasks.filter((task) => task.favorite)
  //     }
  //     return state.tasks
  //   }
  // },
  actions: {
    async fetchTasks() {
      try {
        this.tasks = await tasksApi.get('/todo')
        return this.tasks
      } catch (error) {
        this.error = 'Failed to fetch tasks'
      }
    }

    // async addNewTask(task) {
    //   this.loading = true
    //   try {
    //     const newTask = await addTask(task)
    //     this.tasks.push(newTask)
    //   } catch (error) {
    //     this.error = 'Failed to add task'
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async updateTask(task) {
    //   try {
    //     const updatedTask = await updateTask(task)
    //     const index = this.tasks.findIndex((t) => t.id === task.id)
    //     if (index !== -1) {
    //       this.tasks[index] = updatedTask
    //     }
    //   } catch (error) {
    //     this.error = 'Failed to update task'
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async deleteTask(id) {
    //   try {
    //     await deleteTask(id)
    //     const index = this.tasks.findIndex((task) => task.id === id)
    //     if (index !== -1) {
    //       this.tasks.splice(index, 1)
    //     }
    //     this.tasks = this.tasks.filter((task) => task.id !== id)
    //   } catch (error) {
    //     this.error = 'Failed to delete task'
    //   } finally {
    //     this.loading = false
    //   }
    // }
  }
})
