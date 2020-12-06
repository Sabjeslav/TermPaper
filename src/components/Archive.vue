<template>
    <div class="allTasks">
        <v-container>
            <v-row>
                <template>
                    <template v-if="tasks.length == 0">
                        <v-col cols="12" class="text-center mt-15">
                            <span class="text--secondary text-xl-h4 text-md-h4 text-sm-h5 text-xs-h1" max-width="90%" style="user-select: none;"> Ви ще не виконали жодної задачі! </span>
                        </v-col>
                    </template>
                    <template v-else>

                        <v-col cols="12">
                            <strong color="date">Виконано задач: {{tasks.length}}</strong>
                        </v-col>

                        <v-col  v-for="task in tasks" :key="task._id" cols="12" md="6" lg="4" xl="3" >
                            <v-card elevation-11 fill-height>

                                <v-card-title primary-title>
                                    {{task.title}}
                                </v-card-title>

                                    <v-divider color="doneTask"></v-divider>

                                <v-card-text >
                                    {{task.description}}
                                </v-card-text>

                                    <v-spacer></v-spacer>

                                <v-card-actions>
                                    <v-chip color="doneTask">
                                        Виконано: {{task.date}}
                                    </v-chip>

                                    <v-spacer></v-spacer>
                                
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn outlined rounded text v-on="on" @click="removeTask(task._id)">
                                                <v-icon class="rounded-circle" color="red" style="font-size: 20px">delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Видалити</span>
                                    </v-tooltip>

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
            task: {title: '', description: '', isDone: false},
            tasks: []
        }
    },
    mounted() {
        // console.log(this.$vuetify.breakpoint.name),
        this.getTasks()
    },
    methods: {
        async getTasks() {
            console.log('Request sended')
            const response = await TaskService.fetchDoneTasks();
            console.log('Responce OK')
            this.tasks = response.data.tasks
        },
        async removeTask (params) {
            await TaskService.deleteTask(params)
            this.getTasks()
        }
    }
}
</script>

<style>
    *, *::before, *::after {
        transition: 0.2s;
    }
</style>