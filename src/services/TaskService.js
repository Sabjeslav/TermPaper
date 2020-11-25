import api from '@/services/api'

export default {
    fetchTasks () {
      return api().get('posts')
    },
    addNewTask (params) {
      return api().post('posts', params)
    }
}
  