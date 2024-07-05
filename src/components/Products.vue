<template>
    <div id="products">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in $store.state.productos" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.nombre }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.precio }}</td>
                    <td class="botones">
                        <!-- Boton que sirve para abrir el modal se pasa el objeto de producto que vamos a modificar-->
                        <button class="btn" @click="openModal(product)">Editar</button>
                        <!-- Boton que sirve para borrar el producto-->
                        <button class="btn danger" @click="deleteProduct(product.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Boton que sirve para abrir el modal se pasa un objeto null -->
        <button class="btn" @click="openModal(null)">Agregar producto</button>
        <!-- Modal -->
        <!-- El componente AddProductModal se muestra cuando isModalVisible es verdadero.
            El modal recibe selectedProduct como prop, que es el producto a editar o null si se está agregando un nuevo producto.
            El evento close del modal llama al método closeModal. -->
        <AddProductModal :isVisible="isModalVisible" :product="selectedProduct" @close="closeModal" />
    </div>

</template>
<script>
import { mapState, mapActions } from 'vuex';
import AddProductModal from './AddProductModal.vue';

export default {
    components: { AddProductModal },
    data() {
        return {
            // Variable para controlar el estado del modal
            isModalVisible: false,
            // Variable para controlar el objeto de producto seleccionado
            selectedProduct: null
        };
    },
    computed: {
        ...mapState(['productos'])
    },
    methods: {
        ...mapActions(['deleteProduct']),
        openModal(product) {
            // Establece el producto seleccionado y muestra el modal.
            this.selectedProduct = product;
            this.isModalVisible = true;
        },
        closeModal() {
            // Oculta el modal y resetea el producto seleccionado.
            this.isModalVisible = false;
            this.selectedProduct = null;
        }
    }
}
</script>
<style>
#products {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

.table {
    width: 100%;
}

table {
    border-style: double;
    border-width: 4px;
}

td {
    border-style: solid;
    border-width: 1px;
    padding: 0.5rem;
    gap: 0.5rem;
}

.btn {
    border-color: aliceblue;
    padding: 0.3rem;
}

.danger {
    background-color: red;
}

.botones {
    display: flex;
    gap: 0.5rem;
}
</style>