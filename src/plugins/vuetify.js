import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'md',
    theme: {
        themes: {
          light: {
            primary: '#1f9aff',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
            date: '#000',
            navBar: '#0D47A1',
          },
          dark: {
            primary: '#1E1E1E',
            secondary: '#1f9aff',
            accent: '#8c9eff',
            error: '#b71c1c',
            date: '#fff',
            navBar: '#212121',
          },
        },
      },
});