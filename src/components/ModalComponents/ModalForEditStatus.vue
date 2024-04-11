<template lang="">
    <div class='form-box'>
        <form @submit.prevent = "editStatus">
            <input
            v-model="editedStatus"
            type="text"
            id="title-task"
            name="title"
            placeholder="Измените название статуса"
            minlength = '5'
            required
            />
            <button type="submit" class="submit-button">Отправить</button>
            <button @click="closeModal" type="button" class="cancel-button">Отмена</button>
        </form>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'modal-for-edit-status',
    data(){
        return{
            editedStatus: ''
        }
    },
    computed:{
        ...mapGetters({
            oldEditedStatus: 'modalModule/editedStatus',
        })
    },
    methods:{
        ...mapActions({
            closeModal: 'modalModule/closeModal',
            axiosEditStatus: 'modalModule/axiosEditStatus'

        }),
        editStatus(){
            this.axiosEditStatus({boardId: this.$route.params.id, newEditedStatus: this.editedStatus});
            this.closeModal();
        }
    },
    created(){
        this.editedStatus = this.oldEditedStatus;
    }
}
</script>
<style src="../ModalComponents/_modal.css">
</style>