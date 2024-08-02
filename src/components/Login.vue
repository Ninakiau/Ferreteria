<template>
    <div>
        <h1>Iniciar Sesión</h1>
    </div>
    <div class="container">
        <form @submit.prevent="submitLogin" class="form">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" v-model="password" required>
            </div>
            <button type="submit" class="login-button" >Ingresar</button>
        </form>
        <div v-if="authError" class="error">{{ authError }}</div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import router from '../router'; 

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    computed: {
        //Mapear getter de vuez al componente
        ...mapGetters(['authError']),
    },

    methods: {
        //Mapear acciones de vuex al componente
        ...mapActions(['login']),
        async submitLogin() {
      try {
        // Llamar a la accion de inicio de sesión de vuex
        await this.login({ email: this.email, password: this.password });
        // Redirigir después de iniciar sesión
        this.$router.push('/products');
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        // this.$router.push('/login');
      }
    }
    }
}



</script>
<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: end;
    justify-content: center;
}

.form-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
}

.login-button {
    width: 100%;
}

.error {
    color: red;
}
</style>