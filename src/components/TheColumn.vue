<template>
    <section :class="'kanban__column kanban__column--' + id" @dragover="dragOver">
      <div class="task-group__head">
        <h5 class="color-gray">{{title}}</h5>
        <div class='head__buttons'>
          <div class="head__btn delete-btn" @click="deleteStatus" v-if='(currentUserPermissions.includes("delete-board-statuses"))'>
            <img class="svg-img" src="@/assets/SVG-images/column-trash.svg">
          </div>
          <div class="head__btn" @click="editStatus" v-if='(currentUserPermissions.includes("manage-board-statuses"))'>
            <img class="svg-img" src="@/assets/SVG-images/column-edit.svg">
          </div>
          <div class="head__btn" @click="createTask" >
            <img class="svg-img" src="@/assets/SVG-images/column-plus.svg">
          </div>
        </div>
      </div>
      <div class="kanban__list">
            <p class ="kanban__list--empty" v-if='tasklist.length === 0'>Перетащите или добавьте задачу</p>
            <the-task v-for="task in tasklist"
                :key = 'task.id'
                :id = "task.id"
                :title="task.name"
                :taskColumnId = 'task.statusId'
                :dueDate="formatDate(task.plannedCompletionAt)"
                :description="task.description"
            />
      </div>
    </section>
  </template>
<script>
import TheTask from './TheTask.vue';
import {format} from 'date-fns';
import { mapActions, mapGetters} from 'vuex';
  export default {
    components: { 
      TheTask
    },
    name: 'TheColumn',
    props: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      tasklist: {
        type: Array,
        required: true
      },
      columnId:{
        type: String,
        required: true
      },
      boardId:{
        type: String,
        required: true
      }
    },
    computed:{
      ...mapGetters({
        currentUserPermissions: 'usersManage/currentUserManagePermissions'
      })
    },
    methods:{
      ...mapActions({
        getColumnDragOver: 'statusModule/getColumnDragOver',
        openModalForCreateTask: 'modalModule/openModalForCreateTask',
        openModalForEditStatus: 'modalModule/openModalForEditStatus',
        axiosDeleteStatus: 'statusModule/axiosDeleteStatus',
      }),
      deleteStatus(){
        this.axiosDeleteStatus({boardId: this.boardId, statusId: this.columnId});
      },
      editStatus(){
        this.openModalForEditStatus({oldStatus: this.title, editedStatusId: this.columnId});
      },
      createTask(){
        this.openModalForCreateTask({columnIdForCreateTask: this.columnId});
      },
      formatDate(dateString) {
        return dateString.split('T')[0];
      },
      dragOver(){
        const columnIdDragOver = this.columnId;
        this.getColumnDragOver({columnIdDragOver})
      },
    }
  };
  </script>

<style scoped>
    .kanban__column{

    flex: 1 0 calc(33.333% - 20px);
    border: 2px dashed var(--light-gray);
    border-radius: 12px;
    height: min-content;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

}

.kanban__list--empty{
  text-align: center;
  color: var(--gray);
  border: 2px dashed var(--light-gray);
  border-radius: 12px;
  margin-inline: 4%;
  margin-bottom: 4%;
  padding: 60px 20px;
  
}
.task-group__head{
    display: flex;
    justify-content: space-between;
    margin-inline: 4%;
    margin-top: 22px;
    margin-bottom: 16px;
    align-items: center;
}

.head__buttons{
  display: flex;
  gap: 2px;
}


.svg-img{
    display: block;
    padding: 5px;
    background-color: var(--light-gray);
    border-radius: 100%;
    transition: .3s;
    width: 100%;
}

.head__btn{
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: .3s;
  padding: 4px;
  border-radius: 100px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid white;
  width: 32px;
  animation: buttonsAnim .5s;
}

@keyframes buttonsAnim {
    0%{
        opacity: 0;
        transform: scale(50%);
        filter: blur(2px);
    }
}

.head__btn:hover{
  background-color: var(--very-light-gray);
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.head__btn:active{
  transform: scale(105%);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

}

.kanban__list{
    display: flex;
    flex-direction: column;

    justify-content: center;
}




.delete-btn .svg-img{
    background-color: rgba(230, 169, 169, 1);
}
</style>