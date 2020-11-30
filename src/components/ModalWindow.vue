<template>
    <v-dialog :retain-focus="false" v-model="editDialog" persistent max-width="600px">
        <v-card style="user-select: none;">
            <v-card-title>
                <span class="headline">Редагувати</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Назва*" required color="secondary" v-model.trim="task.title"> </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Опис" color="secondary" v-model.trim="task.description"> </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*обов'язкові поля</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="back()">
                    Закрити
                </v-btn>
                <v-btn color="blue darken-1" text @click="editTask()">
                    Зберегти
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import TaskService from '../services/TaskService'
export default {
    data() {
        return {
            editDialog: true,
            task: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
      async getTask () {
        const response = await TaskService.getTask({ id: this.$route.params.id })
        this.task.title = response.data.title
        this.task.description = response.data.description
      },
      async editTask () {
        if (this.task.title !== '') {
          await TaskService.updateTask({
            id: this.$route.params.id,
            title: this.task.title,
            description: this.task.description
          })
          this.$router.push({path: '/tasks'})
        }
      },
      async back() {
        this.$router.push({path: '/tasks'})
      }
    },
    mounted () {
      this.getTask()
    }
}
</script>

<style>
    *, *::before, *::after {
        transition: 0.2s;
    }
</style>