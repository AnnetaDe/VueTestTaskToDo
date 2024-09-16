import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { addTask, updateTask, deleteTask, getTasks } from '../api/taskApi'
import { tasksApi } from '@/api/config'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    /** @type {{ name: string, description:string, id: number, isFinished:boolean, isLiked:boolean }[]} */
    tasks: ref([]),
    //**@type {{'all' | 'done' | 'favorite'}} */
    filter: ref('all'),
    singleTask: ref({}),
    error: null,
    loading: false,
    sortAsc: ref('asc')
  }),
  getters: {
    filteredTasks(state) {
      if (state.filter === 'all') {
        return state.tasks
      }
      if (state.filter === 'done') {
        return state.tasks.filter((task) => task.isDone)
      }
      if (state.filter === 'favorite') {
        return state.tasks.filter((task) => task.isLiked)
      }
      return state.tasks
    },
    sortedTasks(state) {
      if (state.sortAsc === 'asc') {
        return this.filteredTasks.sort((a, b) => {
          if (a.deadLine === null) {
            return 1
          }
          if (b.deadLine === null) {
            return -1
          }
          return new Date(a.deadLine).getTime() - new Date(b.deadLine).getTime()
        })
      }
      if (state.sortAsc === 'desc') {
        return this.filteredTasks.sort((a, b) => {
          if (a.deadLine === null) {
            return 1
          }
          if (b.deadLine === null) {
            return -1
          }

          return new Date(b.deadLine).getTime() - new Date(a.deadLine).getTime()
        })
      }
    }
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        this.tasks = await getTasks()
        return this.tasks
      } catch (error) {
        this.error = 'Failed to fetch tasks'
      } finally {
        this.loading = false
      }
    },
    async piniaSaveTask(taskUpdate) {
      console.log('UPDATED', taskUpdate)
      this.loading = true
      if (!taskUpdate) {
        return
      }
      const index = this.tasks.findIndex((task) => task.id === taskUpdate.id)
      if (index !== -1) {
        this.tasks[index] = { ...taskUpdate, id: taskUpdate.id }
        try {
          await updateTask(taskUpdate)
          this.tasks[index] = taskUpdate
        } catch (error) {
          this.error = 'Failed to update task'
        }
      } else {
        try {
          await addTask(taskUpdate)
          this.tasks.push(taskUpdate)
        } catch (error) {
          this.error = 'Failed to add task'
        }
      }
    },
    async piniaDeleteTask(id) {
      this.loading = true
      const taskToDel = this.tasks.find((task) => task.id === id)
      if (!taskToDel) {
        return
      }
      try {
        await deleteTask(id)
        this.tasks = this.tasks.filter((task) => task.id !== id)
      } catch (error) {
        this.error = 'Failed to delete task'
      } finally {
        this.loading = false
      }
    },
    setFilter(f) {
      this.filter = f
    },
    setSorting() {
      this.sortAsc = this.sortAsc === 'asc' ? 'desc' : 'asc'
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'taskStore',
        storage: localStorage,
        paths: ['tasks', 'filter']
      }
    ]
  }
})
