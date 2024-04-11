<template lang="">
    <the-header/>
    <aside-menu/>
    <div class="right-side-content">
        <main>
            <div :class='"kanban " + hideKanbanClassAnim'>
                <h1 class="kanban--empty" v-if='statusGetter.length === 0'>Список колонок пуст!</h1>
                <the-column
                    v-for="column in statusGetter"
                        :title="column.status.name"
                        :columnId = 'column.status.id'
                        :tasklist = "column.tasks"
                        :boardId = 'column.status.boardId'
                />
            </div>
        </main>
    </div>
    <the-modal v-if='this.modalForBoardVisible'/>
</template>

<script>
import TheColumn from './TheColumn.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  components: {
    TheColumn
  },
  name: 'kanban-board',
  computed:{
    ...mapGetters({
        statusGetter: 'statusModule/statusBoard',
        modalForBoardVisible: 'modalModule/modalVisible',
        
        hideKanbanClassAnim: 'animationModule/statusAnim',
    })
  },
  methods:{
    ...mapActions({
        changeAnimClass: 'animationModule/changeVarAnim',
        setAdminUser: 'usersManage/getAdminOfBoard',
        axiosGetAllPermissions: 'usersManage/axiosGetAllPermissions'

    }),
    unhideBoards(){
        this.axiosGetAllPermissions({boardId: this.$route.params.id});

        this.changeAnimClass({classAnim: '', page: 'boardsPage'});
        this.changeAnimClass({classAnim: '', page: 'authPage'});
    }
  },
  created(){
    this.unhideBoards();
    this.setAdminUser({boardId: this.$route.params.id});
  }
}
</script>
<style scoped>



.hideKanban{
    transform: scale(90%);
    opacity: 0;
    filter: blur(3px);
}
.kanban{
    transition: 0.2s;
    gap:10px;
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
    width: 100%;
    animation: kanbanAnim .7s;
}

.kanban--empty{
    flex: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray);
}

.right-side-content{
    margin-left: 300px;
    position: relative;
    height: 100%;
    overflow-y: hidden;
}
main{
    justify-content: space-between;
    display: flex;
    margin: 0 auto;
    padding-top: 140px;
    width: 95%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
}

.kanban::-webkit-scrollbar{
    height: 12px;
    width: 12px;
    background-color: var(--scroll-track);
    border-radius: 100px;
}

.kanban::-webkit-scrollbar-thumb{
    border-radius: 100px;
    background-color: var(--scroll-thumb);
    border: 4px solid var(--scroll-track);
}

@media (max-width: 992px) {
    .kanban{
        flex-direction: column;
    }
}

@keyframes kanbanAnim{
    0%{
        transform: scale(90%) translateY(100%);
        filter: blur(5px);
        opacity: 0.8;
    }
    40%{
        transform: scale(90%) translateY(0);
        filter: blur(.5px);

    }
}
</style>