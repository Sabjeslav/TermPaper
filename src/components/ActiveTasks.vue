<template>
    <div class="allTasks">
        <v-container>
            <v-row>
                <template>
                    <v-row>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" block dark v-bind="attrs" v-on="on" x-large>
                                Додати задачу
                            </v-btn>
                        </template>
                        <v-card style="user-select: none;">
                            <v-card-title>
                                <span class="headline">Нова задача</span>
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
                            <small>*показує обов'язкові поля</small>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Закрити
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="dialog = false; addTask()">
                                Зберегти
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-row>
                    <template v-if="tasks.length == 0">
                        <v-col cols="12" class="text-center mt-15">
                            <span class="text--secondary text-xl-h4 text-md-h4 text-sm-h5 text-xs-h1" max-width="90%" style="user-select: none;"> Ви ще не додали жодної задачі </span>
                        </v-col>
                    </template>
                    <template v-else>
                        <!-- <v-col cols="12">
                            <strong color="date">Виконано задач: {{completedTasks.length}} / {{tasks.length}}</strong>
                        </v-col> -->
                        <v-col  v-for="task in tasks" :key="task.title" cols="12" md="6" lg="4" xl="3" >
                            <v-card elevation-11 fill-height>
                                <v-card-title primary-title>
                                    {{task.title}}
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text >
                                    {{task.description}}
                                </v-card-text>
                                <v-spacer></v-spacer>
                                <v-card-actions>

                                    <v-btn outlined rounded text>
                                        <span class="text-caption">Виконано</span>
                                        <v-icon right color="green">done_all</v-icon>
                                    </v-btn>

                                    <v-btn outlined rounded text>
                                        <span class="text-caption">Редагувати</span>
                                        <v-icon right color="orange">edit</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn outlined rounded text>
                                        <v-icon class="rounded-circle" color="red" style="font-size: 20px">delete</v-icon>
                                    </v-btn>

                                </v-card-actions>   
                            </v-card>
                    </v-col>
                        
                    </template>
                    
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TaskService from '../services/TaskService'
export default {
    data() {
        return {
            dialog: false,
            task: {title: '', description: ''},
            tasks: [
                    // {title: 'Зробити курсову', description: 'Курсова на тему додаток для керування часом', isDone: false},
                    // {title: 'Зробити ММО', description: 'Виправити проміжну атестацію', isDone: false},
                    // {title: 'Практичні роботи1', description: 'З предмета Мережі', isDone: false},
                    // {title: 'Практичні роботи2', description: 'З предмета якогось', isDone: false},
                    // {title: 'Практичні роботи3', description: 'З предмета Мережі', isDone: false},
            ]
        }
    },
    computed: {
        completedTasks () {
            return this.tasks.filter(task => task.isDone).length
        },
        progress () {
            return this.completedTasks / this.tasks.length * 100
        },
    },
    mounted() {
        console.log(this.$vuetify.breakpoint.name)
        this.getTasks()
    },
    methods: {
        async getTasks() {
            const response = await TaskService.fetchTasks();
            this.tasks = response.data.tasks
        },
        async addTask () {
        if (this.task.title !== '' && this.task.description !== '') {
          await TaskService.addNewTask({
            title: this.task.title,
            description: this.task.description
          })
        //   this.$router.push({ name: 'Posts' })
        } else {
          alert('Empty fields!')
        }
      },
    }
}
</script>