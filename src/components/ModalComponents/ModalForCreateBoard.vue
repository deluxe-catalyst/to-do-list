<template lang="">
    <div class='form-box'>
        <form @submit.prevent = "createBoard">
            <input
            v-model="newBoardName"
            type="text"
            id="title-task"
            name="title"
            placeholder="Введите название доски"
            minlength = '5'
            required
            />
            <textarea
            required
            v-model="newBoardDescription"
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
import {mapActions} from 'vuex';

export default {
    name: 'modal-for-create-board',
    data(){
        return{
            newBoardName: '',
            newBoardDescription: '',
        }
    },
    methods: {
        ...mapActions({
            axiosAddBoard: 'modalModule/axiosAddBoard',
            closeModal: 'modalModule/closeModal',
      }),
      createBoard(){
          this.axiosAddBoard({boardName: this.newBoardName, boardDescription: this.newBoardDescription});
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