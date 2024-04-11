<template lang="">
    <div class='form-box'>
        <form @submit.prevent = "editBoard">
            <input
            v-model="editedBoardName"
            type="text"
            id="title-task"
            name="title"
            placeholder="Введите название доски"
            minlength = '5'
            required
            />
            <textarea
            required
            v-model="editedBoardDescription"
            id="description-task"
            name="description"
            placeholder="Введите описание доски"
            minlength = '5'
            ></textarea>
            <button type="submit" class="submit-button">Отправить</button>
            <button @click="hideModal" type="button" class="cancel-button">Отмена</button>
        </form>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'modal-for-edit-board',
    data(){
        return{
            editedBoardName: '',
            editedBoardDescription: '',
        }
    },
    created() {
        this.editedBoardName = this.oldBoardName;
        this.editedBoardDescription = this.oldBoardDescription;
    },
    computed:{
        ...mapGetters({
            oldBoardName: 'modalModule/oldBoardName',
            oldBoardDescription: 'modalModule/oldBoardDescription',
        })
    },
    methods: {
        ...mapActions({
            axiosEditBoard: 'modalModule/axiosEditBoard',
            closeModal: 'modalModule/closeModal',
        }),
        editBoard(){
            this.axiosEditBoard({newBoardName: this.editedBoardName, newBoardDescription: this.editedBoardDescription});
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