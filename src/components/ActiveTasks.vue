<template>
    <div class="allTasks">
        <v-container>
            <v-row>
                <template>
                    <v-text-field v-model="newTask" label="Додати нову задачу" solo>
                        <template v-slot:append>
                            <v-fade-transition>
                                <v-icon v-if="newTask" @click="create">add_circle</v-icon>
                            </v-fade-transition>
                        </template>
                    </v-text-field>
                    <v-col cols="12">
                        <strong color="date">Виконано задач: {{completedTasks.length}} / {{tasks.length}}</strong>
                    </v-col> 
                    <template v-if="tasks.length == 0">
                        <div>
                            <span h1> NO TASKS ADDED YET </span>
                        </div>
                    </template>
                    <template v-else>
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
export default {
    data() {
        return {
            newTask: null,
            tasks: [
                 {title: 'Зробити курсову', description: 'Курсова на тему додаток для керування часом', isDone: false},
                 {title: 'Зробити ММО', description: 'Виправити проміжну атестацію', isDone: false},
                 {title: 'Практичні роботи1', description: 'З предмета Мережі', isDone: false},
                 {title: 'Практичні роботи2', description: 'З предмета якогось', isDone: false},
                 {title: 'Практичні роботи3', description: 'З предмета Мережі', isDone: false},
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
    methods: {
        create () {
            this.tasks.push({
                done: false,
                text: this.newTask,
            })
            this.newTask = null
        },
    }
}
</script>