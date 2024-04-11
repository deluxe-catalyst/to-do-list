<template lang="">
    <div class='form-box'>
        <form @submit.prevent = "createTask">
            <input
            v-model="title"
            type="text"
            id="title-task"
            name="title"
            placeholder="Введите заголовок задачи"
            minlength = '5'
            required
            />
            <textarea
            required
            v-model="description"
            id="description-task"
            name="description"
            placeholder="Введите описание задачи"
            minlength = '10'
            ></textarea>
            <input type="date" name="date" placeholder="Выберите дату" 
            required
            v-model="date"
            />
            <button type="submit" class="submit-button">Отправить</button>
            <button @click="hideModal" type="button" class="cancel-button">Отмена</button>
        </form>
    </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
    name:'modal-for-create-task',
    data(){
        return{
            title: '',
            description: '',
            date: '',
        }
    },
    methods: {
       ...mapActions({
            axiosAddTask: 'modalModule/axiosAddTask',
            closeModal: 'modalModule/closeModal',
       }),
       createTask(){
            this.axiosAddTask({title: this.title, description: this.description, date: this.date});
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