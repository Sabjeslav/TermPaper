<template>
  <v-app>
    <v-main color="primary">
        <NavBar/>
        <router-view class="pa-lg-12 pa-md-10 pa-sm-6 pa-xs-2"></router-view>
    </v-main> 
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components:{
    NavBar
  },
  data() {
    return {
      
    }
  },
}

</script>
