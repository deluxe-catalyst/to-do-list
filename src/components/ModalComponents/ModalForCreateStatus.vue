<template lang="">
    <div class='form-box'>
        <form @submit.prevent = "createColumn">
            <input
            v-model="newColumnName"
            type="text"
            id="title-task"
            name="title"
            placeholder="Введите название колонки"
            minlength = '5'
            required
            />
            <button type="submit" class="submit-button">Отправить</button>
            <button @click="hideModal" type="button" class="cancel-button">Отмена</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name: 'modal-for-create-status',
    data(){
        return{
            newColumnName: '',
        }
    },
    methods: {
        ...mapActions({
            axiosAddColumn: 'modalModule/axiosAddColumn',
            closeModal: 'modalModule/closeModal', 
        }),
        createColumn(){
            this.axiosAddColumn({columnName: this.newColumnName});
            this.closeModal();
        },
        hideModal(){
            this.closeModal();
        }
    },

}
</script>
<style src="../ModalComponents/_modal.css">
    
</style>