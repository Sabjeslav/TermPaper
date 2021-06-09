<template>
  <nav>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Task</span>
        <span>Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <span class="d-none d-sm-flex">Налаштування</span>
              <v-icon right>mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-expand-transition>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      @change="toggleDarkTheme"
                      v-model="switchState"
                      color="blue"
                      persistent-hint
                    ></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Темна тема</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-expand-transition>
        </v-menu>
      </div>
      <v-btn text>
        <span class="d-none d-sm-flex">Вийти</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="navBar">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Меню
          </v-list-item-title>
          <v-list-item-subtitle class="white--text" small>
            задач
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="title white--text" small>
            <span v-text="currentTime"></span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      expand: false,
      darkTheme: false,
      switchState: localStorage.getItem("dark_theme") === "true",
      menu: false,
      drawer: false,
      currentTime: null,
      links: [
        {
          title: "Активні задачі",
          icon: "mdi-view-dashboard",
          route: "/tasks",
        },
        { title: "Архів", icon: "archive", route: "/archive" },
      ],
    };
  },
  mounted() {
    this.$vuetify.theme.dark = localStorage.getItem("dark_theme") === "true";
  },
  created() {
    moment().locale("uk");
    this.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      console.log(this.switchState);
    },
    updateCurrentTime() {
      moment.locale("uk");
      this.currentTime = moment().format("LTS");
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  transition: 0.2s;
}
</style>