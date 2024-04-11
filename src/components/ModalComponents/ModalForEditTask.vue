<template lang="">
    <div class='form-box'>
        <form @submit.prevent = "editTask">
            <input
            v-model="editedTaskTitle"
            type="text"
            id="title-task"
            name="title"
            placeholder="Введите заголовок задачи"
            minlength = '5'
            required
            />
            <textarea
            required
            v-model="editedTaskDescription"
            id="description-task"
            name="description"
            placeholder="Введите описание задачи"
            minlength = '10'
            ></textarea>
            <input type="date" name="date" placeholder="Выберите дату" 
            required
            v-model="editedTaskDate"
            />
            <button type="submit" class="submit-button">Отправить</button>
            <button @click="hideModal" type="button" class="cancel-button">Отмена</button>
        </form>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'modal-for-edit-task',
    data(){
        return{
            editedTaskTitle: '',
            editedTaskDescription: '',
            editedTaskDate: '',
        }
    },
    created() {
        this.editedTaskTitle = this.oldTaskTitle;
        this.editedTaskDescription = this.oldTaskDescription;
        this.editedTaskDate = this.oldTaskDate;
    },
    computed:{
        ...mapGetters({
            oldTaskTitle: 'modalModule/oldTaskTitle',
            oldTaskDescription: 'modalModule/oldTaskDescription',
            oldTaskDate: 'modalModule/oldTaskDate',
        })
    },
    methods:{
        ...mapActions({
            axiosEditTask: 'modalModule/axiosEditTask',
            closeModal: 'modalModule/closeModal',
        }),
        editTask(){
            this.axiosEditTask({title: this.editedTaskTitle, description: this.editedTaskDescription, date: this.editedTaskDate});
            this.closeModal();
        },
        hideModal(){
            this.closeModal();
        }
    }
}
</script>
<style src="../ModalComponents/_modal.css">
    
</style>