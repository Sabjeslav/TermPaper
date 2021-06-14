<template>
  <div class="allTasks">
    <v-container>
      <v-row>
        <template>
          <v-row class="addBtn">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" block v-on="on" x-large>
                  {{ activeTasks.addTask }}
                </v-btn>
              </template>
              <v-card style="user-select: none">
                <v-card-title>
                  <span class="headline">{{ activeTasks.newTask }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-bind:label=activeTasks.modalName
                          color="desc"
                          auto-grow
                          outlined
                          rows="1"
                          v-model.trim="task.title"
                        ></v-textarea>
                        <v-textarea
                          color="desc"
                          outlined
                          v-bind:label=activeTasks.description
                          v-model.trim="task.description"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>{{ activeTasks.required }}</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeHandler">
                    {{ activeTasks.close }}
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="addHandler">
                    {{ activeTasks.save }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <template v-if="tasks.length == 0">
            <v-col cols="12" class="text-center mt-15">
              <span
                class="
                  text--secondary text-xl-h4 text-md-h4 text-sm-h5 text-xs-h1
                "
                max-width="90%"
                style="user-select: none"
              >
                {{ activeTasks.emptyMsg }}
              </span>
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12" class="mt-5">
              <v-text-field
                v-model="keyword"
                v-bind:label=activeTasks.searchLabel
                flat
                solo-inverted
                hide-details
              ></v-text-field>
            </v-col>

            <v-col
              v-for="task in taskFilteredList"
              :key="task._id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card elevation-11 fill-height>
                <v-card-title primary-title>
                  {{ task.title }}
                </v-card-title>

                <v-divider></v-divider>

                <v-tabs color="date" grow>
                  <v-tab> {{ activeTasks.description }} </v-tab>
                  <v-tab> {{ activeTasks.subtasks }} </v-tab>
                  <v-tab-item>
                    <template v-if="task.description.length > 50">
                      <v-expansion-panels accordion flat class="tooltipMargin">
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            {{ activeTasks.description }}
                          </v-expansion-panel-header>

                          <v-expansion-panel-content class="cardDescription">
                            {{ task.description }}
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </template>

                    <template v-else>
                      <v-card-text class="cardDescription">
                        {{ task.description }}
                      </v-card-text>
                    </template>
                  </v-tab-item>
                  <v-tab-item>
                    <template v-for="(subtask, i) in task.subtasks">
                      <v-divider
                        v-if="i !== 0"
                        :key="`${i}-divider`"
                      ></v-divider>

                      <v-list-item :key="`${i}-${subtask.text}`">
                        <v-list-item-action>
                          <v-checkbox
                            v-model="subtask.isDone"
                            :color="(subtask.isDone && 'grey') || 'date'"
                            @change="subtaskHandler(task._id, i)"
                          >
                            <template v-slot:label>
                              <div
                                :class="
                                  (subtask.isDone && 'grey--text') ||
                                  'date--text'
                                "
                                class="ml-4"
                                v-text="subtask.text"
                              ></div>
                            </template>
                          </v-checkbox>
                        </v-list-item-action>

                        <v-spacer></v-spacer>

                        <v-scroll-x-transition>
                          <v-icon v-if="subtask.isDone" color="success">
                            mdi-check
                          </v-icon>
                        </v-scroll-x-transition>
                        <v-menu bottom right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list dense>
                            <v-list-item
                              link
                              @click="deleteSubTaskHandler(task._id, i)"
                            >
                              <v-list-item-title>
                                {{ activeTasks.delete }}
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-list-item>
                    </template>
                    <v-list-item>
                      <v-text-field
                        class="mt-5"
                        v-model="task.innerSubTask"
                        v-bind:label=activeTasks.label
                        solo
                        @keydown.enter="addSubtask(task._id, task.innerSubTask)"
                      >
                        <template v-slot:append>
                          <v-fade-transition>
                            <v-icon
                              v-if="task.innerSubTask"
                              @click="addSubtask(task._id, task.innerSubTask)"
                            >
                              add_circle
                            </v-icon>
                          </v-fade-transition>
                        </template>
                      </v-text-field>
                    </v-list-item>
                  </v-tab-item>
                </v-tabs>

                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        outlined
                        rounded
                        text
                        v-on="on"
                        @click="editTask(task._id)"
                      >
                        <v-icon color="green">done_all</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ activeTasks.done }}</span>
                  </v-tooltip>

                  <router-link
                    :to="{ name: 'EditTask', params: { id: task._id } }"
                    style="text-decoration: none"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn class="ml-2" outlined rounded text v-on="on">
                          <v-icon color="orange" style="font-size: 20px"
                            >edit</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>{{ activeTasks.edit }}</span>
                    </v-tooltip>
                  </router-link>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="ml-2"
                        outlined
                        rounded
                        text
                        v-on="on"
                        @click="removeTask(task._id)"
                      >
                        <v-icon
                          class="rounded-circle"
                          color="red"
                          style="font-size: 20px"
                          >delete</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>{{ activeTasks.delete }}</span>
                  </v-tooltip>

                  <v-spacer></v-spacer>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip color="accent" class="date--text" v-on="on">
                        {{ task.date }}
                      </v-chip>
                    </template>
                    <span>{{ activeTasks.creationDate }}</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </template>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ activeTasks.successMsg }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="success"
              text
              v-bind="attrs"
              @click="snackbar = !snackbar"
            >
              {{activeTasks.close}}
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TaskService from "../services/TaskService";
import lang from "../lang/lang";

const { activeTasks } = lang;

export default {
  data() {
    return {
      snackbar: false,
      dialog: false,
      timeout: 3000,
      keyword: "",
      task: {
        title: "",
        description: "",
        isDone: false,
        date: "",
        subtasks: [],
        innerSubTask: "",
      },
      activeTasks: activeTasks,
      newSubtask: "",
      tasks: [],
    };
  },
  mounted() {
    this.getTasks(), this.datePicker();
  },
  computed: {
    taskFilteredList: function () {
      let searchTask = this.keyword.toLowerCase().trim();
      return this.tasks.filter(function (elem) {
        if (searchTask === "") return true;
        return elem.title.toLowerCase().indexOf(searchTask) > -1;
      });
    },
  },
  methods: {
    testFunc() {
      console.log("It's a test function message!");
    },
    addHandler() {
      this.addTask();
      this.dialog = !this.dialog;
      this.resetInputs();
    },
    closeHandler() {
      this.dialog = !this.dialog;
      this.resetInputs();
    },
    resetInputs() {
      this.task.title = this.task.description = "";
    },
    async subtaskHandler(taskId, subtaskIndex) {
      const { subtasks } = await this.getTaskById(taskId);
      let status = subtasks.find((subtask, index) => index === subtaskIndex);
      status.isDone = !status.isDone;
      subtasks.find((subtask, index) => {
        if (index === subtaskIndex) {
          subtask = status;
        }
      });
      await TaskService.updateTask({
        id: taskId,
        subtasks: subtasks,
      });
    },
    async deleteSubTaskHandler(taskId, subtaskIndex) {
      const { subtasks } = await this.getTaskById(taskId);
      const index = subtasks.findIndex(
        (subtask, index) => index === subtaskIndex
      );
      subtasks.splice(index, 1);
      await TaskService.updateTask({
        id: taskId,
        subtasks: subtasks,
      });
      this.getTasks();
    },
    async getTasks() {
      const response = await TaskService.fetchTasks();
      this.tasks = response.data.tasks;
    },
    async getTaskById(id) {
      const response = await TaskService.getTask({ id: id });
      return response.data;
    },
    datePicker() {
      const date = new Date();
      this.task.date = date.toLocaleDateString();
    },
    async addTask() {
      if (this.task.title !== "") {
        console.log("Adding new task...");
        await TaskService.addNewTask({
          title: this.task.title,
          description: this.task.description,
          isDone: false,
          date: this.task.date,
        });
        this.snackbar = !this.snackbar;
        this.getTasks();
        this.resetInputs();
      } else {
        alert("Введіть назву!");
      }
    },
    async removeTask(params) {
      await TaskService.deleteTask(params);
      this.getTasks();
    },
    async editTask(taskId) {
      await TaskService.updateTask({
        id: taskId,
        isDone: true,
        date: this.task.date,
      });
      this.getTasks();
    },
    async addSubtask(taskId, text) {
      this.newSubtask = text;
      if (!this.newSubtask) return;
      const { subtasks } = await this.getTaskById(taskId);
      subtasks.push({
        isDone: false,
        text: this.newSubtask,
      });
      await TaskService.updateTask({
        id: taskId,
        subtasks: subtasks,
      });
      this.newSubtask = "";
      this.getTasks();
    },
  },
};
</script>

<style>
* {
  transition: 0.2s;
}
.tooltipMargin {
  margin-bottom: 5.5px;
}
.cardDescription {
  font-size: 20px !important;
}
.addBtn {
  max-width: 98.5% !important;
  margin: 0 auto !important;
}
</style>