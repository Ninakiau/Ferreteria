<script>
import { mapGetters, mapActions } from 'vuex';
export default {

  //Mapeamos los getters de vuex, para acceder a los estados 
  computed: {
    ...mapGetters(['isAuthenticated',])
  },

  //Mapeamos los actions de vuex, para acceder a los metodos
  methods: {
    ...mapActions(['logout'])
  }
}

</script>

<template>
  <!-- Creamos el navbar -->
  <nav id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/products">Productos</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
#nav {
  margin: 2rem;
}
</style>
