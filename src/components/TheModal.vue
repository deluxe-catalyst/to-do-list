<template lang="">
  <div class="modal">
    <a href="#" class="close-modal" @click="hideModal">✖</a>
    <div class="modal__container">
      <modal-for-create-board v-if='modalType === "isCreateBoard"'/>
      <modal-for-create-status v-if='modalType === "isCreateColumn"'/>
      <modal-for-create-task v-if='modalType === "isCreateTask"'/>
      
      <modal-for-edit-board v-if='modalType === "isEditBoard"'/>
      <modal-for-edit-task v-if='modalType === "isEditTask"'/>
      <modal-for-edit-status v-if='modalType === "isEditStatus"'/>

      <modal-for-manage-users v-if='modalType === "isManageUsers"'/>
    </div>
  </div>
</template>
<script>
import ModalForManageUsers from "./ModalComponents/ModalForManageUsers.vue";
import ModalForEditStatus from "./ModalComponents/ModalForEditStatus.vue";
import ModalForEditTask from "./ModalComponents/ModalForEditTask.vue";
import ModalForCreateBoard from "./ModalComponents/ModalForCreateBoard.vue";
import ModalForCreateStatus from "./ModalComponents/ModalForCreateStatus.vue";
import ModalForEditBoard from "./ModalComponents/ModalForEditBoard.vue";
import ModalForCreateTask from "./ModalComponents/ModalForCreateTask.vue";

import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'the-modal',
    components: {
      ModalForManageUsers,
      ModalForEditStatus, 
      ModalForEditTask,
      ModalForCreateBoard,
      ModalForCreateStatus,
      ModalForEditBoard,
      ModalForCreateTask
    },

    computed:{
      ...mapGetters({
        modalType: 'modalModule/modalType'
      }),
    },
    methods: {
      ...mapActions({
        closeModal: 'modalModule/closeModal',
      }),
      
      hideModal(){
        this.closeModal();
      }
    },
}
</script>
<style scoped>
    .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.469);
    backdrop-filter: blur(15px);
    z-index: 1000;
    animation: modalBackgroundAnim 0.2s;
  }


  @keyframes modalBackgroundAnim {
    0%{
      backdrop-filter: blur(0px);
    }
  }

  @keyframes modalAnim{
    0%{
        transform: scale(80%);
        filter: blur(3px);
        opacity: 0;
    }
    40%{
        transform: scale(103%);
        filter: blur(.5px);

    }
}

  .modal__container {
    display: flex;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    min-width: 430px;
    animation: modalAnim 0.35s;
    justify-content: space-evenly;
  }

  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    color: black;
    font-size: 24px;
  }
  
  
</style>