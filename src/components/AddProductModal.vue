<template>
    <!-- Si el modal está visible, muestra el overlay y el modal -->
    <div class="modal-overlay" v-if="isVisible">
        <div class="modal">
            <div class="modal-header">
                <!-- Título del modal que cambia según si se está editando o agregando un producto -->
                <h3>{{ isEditing ? 'Editar Producto' : 'Agregar Producto' }}</h3>
                <button class="close-button" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="handleSubmit">
                    <!-- Campo de ID del producto, solo visible si se está editando -->
                    <div class="form-group" v-if="isEditing">
                        <label for="productId">ID del producto</label>
                        <!-- Campo de texto deshabilitado para mostrar el ID del producto -->
                        <input type="text" name="productId" id="productId" v-model="productId" disabled>
                    </div>
                    <div class="form-group">
                        <label for="productName">Nombre del producto</label>
                        <input type="text" name="productName" id="productName" v-model="productName" required>
                    </div>
                    <div class="form-group">
                        <label for="productStock">Stock</label>
                        <input type="number" name="productStock" id="productStock" v-model="productStock" required>
                    </div>
                    <div class="form-group">
                        <label for="productPrice">Precio</label>
                        <input type="number" name="productPrice" id="productPrice" v-model="productPrice" required>
                    </div>
                    <!-- Botón para enviar el formulario, cambia según si se está editando o agregando -->
                    <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Agregar' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // Propiedad booleana que indica si el modal es visible
        isVisible: {
            type: Boolean,
            required: true
        },
        // Propiedad objeto que contiene los datos del producto para editar, o null si se va a agregar un nuevo producto
        product: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            // Inicializa las variables de datos con los valores del producto si existe, de lo contrario, con valores vacíos
            productId: this.product ? this.product.id : null,
            productName: this.product ? this.product.nombre : '',
            productStock: this.product ? this.product.stock : '',
            productPrice: this.product ? this.product.precio : ''
        };
    },
    computed: {
        // Computed property que devuelve true si hay un producto para editar, false si se está agregando un nuevo producto
        isEditing() {
            return !!this.product;
        }
    },
    methods: {
        // Método para cerrar el modal, emite un evento 'close' al componente padre
        closeModal() {
            this.$emit('close');
        },

        // Método para manejar el envío del formulario
        handleSubmit() {
            // Validación básica para asegurar que todos los campos estén llenos
            if (!this.productName || !this.productStock || !this.productPrice) {
                alert('Todos los campos son obligatorios');
                return;
            }

            const productData = {
                // Si se edita un producto, utiliza el ID del producto, de lo contrario, utiliza el tamaño de la lista de productos + 1
                id: this.isEditing ? this.productId : this.$store.state.productos.length + 1,
                nombre: this.productName,
                stock: this.productStock,
                precio: this.productPrice
            };
            // Si se está editando un producto, despacha la acción de actualizar producto, de lo contrario, despacha la acción de agregar nuevo producto
            if (this.isEditing) {
                this.$store.dispatch('updateProduct', productData);
            } else {
                this.$store.dispatch('addProduct', productData);
            }
            // Resetea el formulario y cierra el modal
            this.resetForm();
            this.closeModal();
        },
        resetForm() {
            this.productId = null;
            this.productName = '';
            this.productStock = '';
            this.productPrice = '';
        }
    },
     // Observador que actualiza los campos del formulario cuando cambia la propiedad 'product'
    watch: {
        product(newProduct) {
            if (newProduct) {
                this.productId = newProduct.id;
                this.productName = newProduct.nombre;
                this.productStock = newProduct.stock;
                this.productPrice = newProduct.precio;
            } else {  // Si no hay un producto nuevo (null), resetea el formulario
                this.resetForm();
            }
        }
    }

}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: rgb(83, 81, 81);
    padding: 1rem;
    border-radius: 10px;
    width: 400px;
    max-width: 100%;
}

.modal-header,
.modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
}
</style>