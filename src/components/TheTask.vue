<template lang="">
    <div :class='"task-item" + taskAnimClass' draggable='true' @dragstart = 'dragStart($event)' @dragend = 'dragEnd($event)'>
        <div class="task-card__content">
      <div class="content__task-head">
          <div class="task-head__info">
              <h3>{{title}}</h3>
              <h6 class="color-gray">{{description}}</h6>
          </div>
          <div class="dots-task-menu">
              <img class="dots-icon task-dots-icon" src="@/assets/SVG-images/butter-task.svg">
              <div class="task-menu">
                <button :class='"edit-task-button " + showButtonClass ' @click="editTask">Изменить</button>
                <button :class='"edit-task-button " + showButtonClass ' @click="deleteTask">Удалить</button>

              </div>
          </div>
      </div>
      <div class="content__progress-bar">
          <div class="progress-bar__text">
              <div class="text__info">
                  <img class="svg-img" src="@/assets/SVG-images/burger.svg">
                  <p class="info__progress">Прогресс</p>
              </div>
              <h5 class="progress-counter">0/10</h5>
          </div>
          <div class="progress-bar__line">
              <div class="line__progress progress-0"></div>
          </div>
      </div>
      <div class="content__deadline-bookmarks">
          <h5 :class="'color-b-gray ' + changeComplexity">{{dueDate}}</h5>
          <div class="bookmarks-list">
              <div class="bookmarks-item">
                  <img class="svg-img" src="@/assets/SVG-images/msg.svg" alt="">
                  <p class="color-gray">0</p>
              </div>
              <div class="bookmarks-item">
                  <img class="svg-img" src="@/assets/SVG-images/pin.svg" alt="">
                  <p class="color-gray">0</p>
              </div>
          </div>
      </div>
  </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name: 'the-task',
    data(){
        return{
            showMenu: false,
            showMenuClass: '',
            showButtonClass: '',
            
            taskAnimClass: ''
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        dueDate: {
            type: String,
            required: true
        },
        taskColumnId: {
            type: String,
            required: true
        },
    },
    methods:{
        ...mapActions({
            axiosResponceDragTasks: 'statusModule/axiosResponceDragTasks',
            axiosDeleteTask: 'statusModule/axiosDeleteTask',
            openModalForEditTask: 'modalModule/openModalForEditTask'
        }),

        deleteTask(){
            this.axiosDeleteTask({taskIdForDelete: this.id})
        },
        editTask(){
            this.openModalForEditTask({oldTitle: this.title, oldDescription: this.description, 
                oldDate: this.dueDate, taskId: this.id, taskColumnId: this.taskColumnId});
        },
        dragStart(event){
            if(event.target.classList.contains('task-item')){
                event.target.classList.add('dragging');
            }
        },
        dragEnd(event){
            this.axiosResponceDragTasks({currentTaskId: this.id})
            event.target.classList.remove('dragging');
        }
    },
    computed: {
        changeComplexity(){
            const currentDate = new Date();
            const dueDateComplexity = new Date(this.dueDate);
            const timeDiff = dueDateComplexity.getTime() - currentDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (daysDiff < 7){
                return 'deadline-kill';
            }
            else if (daysDiff <= 14){
                return 'deadline-pre-kill';
            }
            else{
                return 'deadline';
            }
        }
    }
}
</script>
<style scoped>
    .task-item{
    margin-inline: 4%;
    margin-bottom: 4%;
    padding: 16px;
    border: 2px solid var(--light-gray);
    border-radius: 12px;
    transition: .2s;
    cursor: pointer;
}


.dragging{
    transform: translateY(-8px);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
}

.content__task-head{
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.content__progress-bar{
    margin-top: 20px;
    color: var(--gray);
}

.progress-bar__text{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text__info{
    display: flex;
    gap: 4px;
    align-items: center;
}

.progress-bar__line{
    height: 4px;
    width: 100%;
    background-color: var(--light-gray);
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-sizing: border-box;
}

.line__progress{
    height: 100%;
    border-radius: 10px;
}
.content__deadline-bookmarks{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.deadline{
    background-color: var(--light-gray);
    padding: 6px 14px;
    border-radius: 100px;
}

.bookmarks-list{
    display: flex;
    align-items: center;
    gap: 10px;
}

.photos-list{
    display: flex;
    align-items: center;
    position: relative;
}

.bookmarks-item{
    display: flex;
    align-items: center;
    gap: 2px;
}
.dots-task-menu{
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dots-task-menu:hover .task-menu{
    height: auto;
    padding: 10px;
    border: 2px solid var(--light-gray);

    box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.2);
}


.task-menu{
    box-sizing: border-box;
    border: 2px solid var(--light-gray);
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    background-color: white;
    border-radius: 12px;
    top: 0;
    right: 0;
    box-sizing: border-box;
    transition: .5s;
    z-index: 1;
}

.edit-task-button{
    width: 100%;
    opacity: 0;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    font-family: "Exo 2", sans-serif;
    font-weight: 400;
    font-size: 0px;
    padding: 0px 0px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    background-color: rgba(75, 105, 255, 0);
    filter: blur(10px);
    border: none;
    transition: font-size .3s, filter 0.2s, opacity .4s, background-color .2s, padding .6s;

}
.dots-task-menu:hover .edit-task-button{
    background-color: rgb(39, 46, 49);
    opacity: 1;
    filter: none;
    padding: 10px 20px;
    font-size: 14px;
}



.dots-task-menu:hover .edit-task-button:hover{
    background-color: rgb(0, 69, 230);
}

.dots-task-menu:hover .edit-task-button:last-child:hover{
    background-color: rgb(230, 0, 0);

}


.dots-icon, .task-dots-icon{
    position: relative;
    width: 10px;
    height: 10px;
    padding: 5px;
    border-radius: 100%;
    z-index: 100;
    transition: .3s;
}

.task-dots-icon{
width: 10px;
height: 10px;
border-radius: 0;
}

.dots-task-menu:hover .task-dots-icon{
    opacity: 0;
    z-index: 1;
    filter: blur(2px);
    width: 80px;
    height: 80px;
    transform: translate(-38px, 30px);
    z-index: 1;
}

.deadline{
    background-color: var(--light-gray);
    padding: 6px 14px;
    border-radius: 100px;
}

.deadline-pre-kill{
    color: var(--deadline-orange-text) !important;
    background-color: var(--deadline-orange-body) !important;
    padding: 6px 14px;
    border-radius: 100px;


}

.deadline-kill{
    border-radius: 100px;
    padding: 6px 14px;
    color: var(--deadline-red-text) !important;
    background-color: var(--deadline-red-body) !important;
}
</style>