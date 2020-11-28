import api from './api'

export default {
    fetchTasks () {
      return api().get('tasks')
    },
    fetchDoneTasks () {
      return api().get('archive')
    },
    addNewTask (params) {
      return api().post('tasks', params)
    },
    getTask (params) {
      return api().get(`tasks/${params.id}`)
    },
    updateTask (params) {
      return api().put(`tasks/${params.id}`, params)
    },
    deleteTask (id) {
      return api().delete(`tasks/${id}`)
    }
}