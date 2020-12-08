<template>
    <div class="allTasks">
        <v-container>
            <v-row>
                <template>
                    <v-row>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" block v-on="on" x-large>
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
                                        <v-textarea label="Назва*" color="desc" auto-grow outlined rows="1" v-model.trim="task.title"></v-textarea>
                                        <v-textarea color="desc" outlined label="Опис" v-model.trim="task.description"></v-textarea>
                                    </v-col>
                                    </v-row>
                                </v-container>
                            <small>*обов'язкові поля</small>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeHandler">
                                Закрити
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="addHandler">
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
                        
                        <v-col cols="12" class="mt-5"> 
                            <v-text-field
                                v-model="keyword"
                                label="Пошук за назвою"
                                flat
                                solo-inverted
                                hide-details
                            ></v-text-field>
                        </v-col>
                        
                        <v-col  v-for="task in taskFilteredList" :key="task._id" cols="12" md="6" lg="4" xl="3" >
                            
                            <v-card elevation-11 fill-height>

                                <v-card-title primary-title>
                                    {{task.title}}
                                </v-card-title>

                                    <v-divider></v-divider>

                                <template v-if="task.description.length>50">
                                    <v-expansion-panels accordion flat class="tooltipMargin">
                                        <v-expansion-panel>
                                            <v-expansion-panel-header>
                                                Опис
                                            </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                                    {{task.description}}
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </template>

                                <template v-else>
                                    <v-card-text>
                                        {{task.description}}
                                    </v-card-text>
                                </template>

                                    <v-spacer></v-spacer>

                                <v-card-actions>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn outlined rounded text v-on="on" @click="editTask(task._id)">
                                                <v-icon color="green" >done_all</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Виконано</span>
                                    </v-tooltip>

                                    <router-link :to="{name: 'EditTask', params: {id: task._id}}" style="text-decoration: none;">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                            <v-btn class="ml-2" outlined rounded text v-on="on">
                                                <v-icon color="orange" style="font-size: 20px">edit</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Редагувати</span>
                                        </v-tooltip>
                                    </router-link>

                                
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="ml-2" outlined rounded text v-on="on" @click="removeTask(task._id)">
                                                <v-icon class="rounded-circle" color="red" style="font-size: 20px">delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Видалити</span>
                                    </v-tooltip>
                                    
                                    <v-spacer></v-spacer>
                                     
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-chip color="accent" class="date--text" v-on="on">
                                                {{task.date}}
                                            </v-chip>
                                        </template>
                                        <span>Дата додавання</span>
                                    </v-tooltip>
                                </v-card-actions>   
                            </v-card>
                            
                        </v-col>                          
                    </template> 
                </template>
                <v-snackbar v-model="snackbar" :timeout="timeout">
                    Задача успішно додана
                    <template v-slot:action="{ attrs }">
                        <v-btn color="success" text v-bind="attrs" @click="snackbar = !snackbar">
                            Закрити
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TaskService from '../services/TaskService'
export default {
    data() {
        return {
            snackbar: false,
            dialog: false,
            timeout: 3000,
            keyword: '',
            task: {title: '', description: '', isDone: false, date: ''},
            tasks: []
        }
    },
    mounted() {
        this.getTasks(),
        this.datePicker()
    },
    computed: {
        taskFilteredList: function() {
            let searchTask = this.keyword.toLowerCase();
            return this.tasks.filter(function(elem) {
                if (searchTask === "") return true;
                else return elem.title.toLowerCase().indexOf(searchTask) > -1;
            })  
        }
    },
    methods: {
        addHandler () {
            this.addTask();
            this.dialog = !this.dialog;
            this.task.title = this.task.description = '';
            
        },
        closeHandler () {
            this.dialog = !this.dialog;
            this.task.title = this.task.description = '';
        },
        async getTasks() {
            const response = await TaskService.fetchTasks();
            this.tasks = response.data.tasks
        },
        async getTaskById () {
            const response = await TaskService.getTasks({ id: this.$route.params.id })
            this.task.title = response.data.title
            this.task.description = response.data.description
        },
        datePicker() {
            var date = new Date();
            this.task.date = date.toLocaleDateString();
        },
        async addTask () {
            if (this.task.title !== '') {
                console.log("Adding new task...")
                await TaskService.addNewTask({
                    title: this.task.title,
                    description: this.task.description,
                    isDone: false,
                    date: this.task.date
                })
                this.snackbar = !this.snackbar;
                this.getTasks();
                this.task.title = this.task.description = '';
            } else {
                alert('Введіть назву!')
            }
        },
        async removeTask (params) {
            await TaskService.deleteTask(params)
            this.getTasks()
        },
        async editTask (taskId) {            
            await TaskService.updateTask({
                id: taskId,
                isDone: true,
                date: this.task.date
            })
          this.getTasks();
        },
      }
    }
</script>

<style>
    *{
        transition: 0.2s;
    }
    .tooltipMargin {
        margin-bottom: 5.5px;
    }
</style>