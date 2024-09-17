import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { addTask, updateTask, deleteTask, getTasks } from '../api/taskApi'
import { tasksApi } from '@/api/config'
import { debounce } from 'lodash'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    /** @type {{ name: string, description:string, id: number, isFinished:boolean, isLiked:boolean }[]} */
    tasks: ref([]),
    //**@type {{'all' | 'done' | 'favorite'}} */
    filter: ref('all'),
    singleTask: ref({}),
    error: null,
    loading: false,
    sortAsc: ref('asc'),
    currentPage: ref(1),
    perPage: 8
  }),
  getters: {
    filteredTasks(state) {
      let filtered = state.tasks
      if (state.filter === 'done') {
        filtered = state.tasks.filter((task) => task.isdone)
      } else if (state.filter === 'favorite') {
        filtered = state.tasks.filter((task) => task.isliked)
      }
      return filtered
    },
    sortedFilteredTasks(state) {
      const sorted = [...this.filteredTasks].sort((a, b) => {
        if (!a.deadLine) return 1
        if (!b.deadLine) return -1
        const dateA = new Date(a.deadLine).getTime()
        const dateB = new Date(b.deadLine).getTime()
        return state.sortAsc === 'asc' ? dateA - dateB : dateB - dateA
      })
      return sorted
    },
    paginatedTasks(state) {
      const filteredSortedTasks = this.sortedFilteredTasks
      const start = 0
      const end = state.perPage * state.currentPage
      console.log('start', start, 'end', end)
      return filteredSortedTasks.slice(start, end)
    },
    totalPages(state) {
      const total = Math.ceil(this.sortedFilteredTasks.length / state.perPage)
      return total
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
      ;(this.filter = f), (this.currentPage = 1)
    },
    setSorting: debounce(function () {
      this.sortAsc = this.sortAsc === 'asc' ? 'desc' : 'asc'
    }, 200),
    setCurrentPage(page) {
      this.currentPage = page
    },
    loadMoreTasks() {
      if (this.currentPage < this.totalPages) {
        console.log('load more', this.totalPages, this.currentPage)
        this.currentPage += 1
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'taskStore',
        storage: localStorage,
        paths: ['tasks']
      }
    ]
  }
})
