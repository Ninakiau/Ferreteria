import { createStore } from 'vuex';
import router from '../router'
import  usuarios  from '../db/usuarios.json'
import  productos  from '../db/productos.json'


export default createStore({

  //Definimos los estados iniciales de la aplicación
  state: {
    usuarios, //Lista de ususarios extraida de db/usuarios.json
    isAuthenticated: false, //Estado de autentificación del usuario
    authError: null, //Error de autentificación 
    productos, //Lista de productos extraida de db/productos.json
  },
  getters: {
    //Definimos los getters para poder acceder a los estados 
    isAuthenticated: state => state.isAuthenticated, //Obtenemos el estado de autentificación true or false
    authError: state => state.authError, //Obtenemos el error de autentificación
    productos: state => state.productos, //Obtenemos el estado de la lista de productos
  },
  mutations: {
    //Mutaciones que nos permiten modificar los el estado 
    //Seteamos el estado de autentificación, pasamos el state y el nuevo estado
    SET_AUTH(state, status){
      state.isAuthenticated= status //Establecemos el estado de autentificación
    },

    //Seteamos el error de autentificación, pasando el state y el nuevo error
    SET_AUTH_ERROR(state, error){ 
      state.authError = error //Establecemos el error de autentificación
    },

    //Seteamos un el nuevo estado de la lista productos, pasamos el state y la nueva lista de productos
    SET_PRODUCTS(state, updatedProducts){
      state.productos = updatedProducts //Establecemos la nueva lista de productos ya actualizada
  },
    //Seteamos un nuevo producto
    ADD_PRODUCT(state, newProduct){
    state.productos.push(newProduct) //Agregamos el nuevo producto a la lista de productos
  },
  //Seteamos un producto modificado
  UPDATE_PRODUCT(state, updatedProduct){
    //Buscamos el indice del producto que queremos modificar de la lista de productos
    const index = state.productos.findIndex(product=>product.id === updatedProduct.id);
    if(index!==-1){
      //Modificamos el proyecto, con splice.
      //Splice sirve para modificar un arreglo, se le pasa como parametros la posicion del elemento que queremos modificar, la cantidad de elementos que queremos eliminar y el nuevo elemento
      state.productos.splice(index, 1, updatedProduct);
    }
  }
},
  //Acciones para ejecutar lógica asíncrona y llamar mutaciones
  actions: {

    //Login de usuario, le pasamos el state y los datos del usuario
    login({commit, state}, {email, password}){
      
      //Buscamos el usuario en la lista de usuarios y comparamos las credenciales
      const user= state.usuarios.find(user=> user.correo===email && user.contrasena === password);

      //Si el usuario existe, seteamos el estado de autentificación
      if (user) {
        commit('SET_AUTH', true); //Establecemos el estado de autentificación
        commit('SET_AUTH_ERROR', null); //Establecemos el error de autentificación en null
        router.push('/products') //Redirigimos a la ruta /products
      } else {
        commit('SET_AUTH_ERROR', 'Usuario o contraseña incorrectos'); //Establecemos el error de autentificación
        commit('SET_AUTH', false); //Establecemos el estado de autentificación  en falso
        
      }
    },

    //Logout de usuario, simplemente seteamos el estado de autentificación en falso
    logout({commit}){
    commit('SET_AUTH', false) //Establecemos el estado de autentificación en falso, desautorizando al usuario
    },

    //Acciones para eliminar uno de los productos de la lista de productos
    deleteProduct({commit, state}, id){

      //Buscamos el indice del producto que queremos eliminar de la lista de proyectos
      const updatedProducts = state.productos.filter(product => product.id !== id); 

      //Actualizamos la lista de porductos
      commit('SET_PRODUCTS', updatedProducts);
      
    },


    //Acciones para agregar  un producto
    addProduct({commit}, newProduct){
      commit('ADD_PRODUCT', newProduct) //Agregamos el nuevo producto a la lista de productos
    
    },

    //Acciones para modificar un producto
    updateProduct({commit}, updatedProduct){
      commit('UPDATE_PRODUCT', updatedProduct) //Modificamos el producto
    }

  
  },
  

  modules: {
  }
}
)
