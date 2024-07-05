import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index'; //Importamos store pata acceder a isAuthenticated (Estado de autentificación)

//Importamos todos los componentes de la app
import Welcome from "../components/Welcome.vue";
import Login from "../components/Login.vue";
import Products from "../components/Products.vue";
import AddProductModal from "../components/AddProductModal.vue";


//Definimos las rutas de la aplicación
const routes = [
  { path: "/", name: "welcome", component: Welcome },
  { path: "/login", name: "login", component: Login },
  { path: "/products", name: "products", component: Products, meta:{ requiresAuth: true} },
  //La ruta: /products requiere autenticación
  { path: "/product-modal", name: "product-modal",component: AddProductModal },
];

// Crea una instancia del router utilizando el modo de historial web
const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  // Verifica si la ruta a la que se está navegando requiere autenticación
  if (to.meta.requiresAuth) {
    // Verifica si el usuario está autenticado usando Vuex store
    if (!store.getters.isAuthenticated) {
      // Si no está autenticado, redirige al login
      next({ name: 'login' });
    } else {
      // Si está autenticado, permite la navegación
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permite la navegación
    next();
  }
});
export default router;
