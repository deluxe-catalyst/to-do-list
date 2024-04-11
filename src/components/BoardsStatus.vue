<template lang="">
<div :class='"main-page " + mainPageAnim'>
    <the-header/>
    <aside-menu/>
    <div class="right-side-content">
        <main :class='animClass'>
                <div class="boards-box__list ">
                            <the-board 
                                v-for="board in boardsGetter"
                                :boardId = 'board.id'
                                :name = 'board.name'
                                :description = 'board.description'
                                :owner = 'board.owner.name'
                                :ownerId = 'board.owner.id'
                            > 
                            </the-board>
                </div>
        </main>
    </div>
    <the-modal v-if='this.modalForBoardVisible'/>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
import {RouterLink} from 'vue-router';
import router from '@/router';

export default {
    name: 'boards-status',
    components:{
        'router-link': RouterLink
    },
    computed:{
        ...mapGetters({
            hideBoardsAnim: 'boardsModule/hideBoardsAnim',
            boardsGetter: 'boardsModule/boards',
            modalForBoardVisible: 'modalModule/modalVisible',

            animClass: 'animationModule/boardsAnim',
            mainPageAnim: 'animationModule/mainPageAnim',

        })
    },
    created(){
        const USER_TOKEN = localStorage.getItem('token');
        if (!USER_TOKEN) {
            this.$router.push('/auth');
        }

    }
}
</script>
<style scoped>

.site-is-hide{
    opacity: 0;
    transform: scale(90%);
    filter: blur(3px);
}

.main-page{
    transition: 0.3s;
    height: 100%;
}

.hide-boards{
    transform: scale(120%);
    opacity: 0;
    filter: blur(2px);
}
    .boards-box{
        gap:10px;
        display: flex;
        justify-content: space-between;
        overflow-x: scroll;
        width: 100%;
        flex-wrap: wrap;
    }
.boards-box__list::-webkit-scrollbar{
    height: 12px;
    width: 12px;
    background-color: var(--scroll-track);
    border-radius: 100px;
}

.boards-box__list::-webkit-scrollbar-thumb{
    border-radius: 100000px;
    background-color: var(--scroll-thumb);
    border: 4px solid var(--scroll-track);
}


.right-side-content{
    margin-left: 300px;
    position: relative;
    height: 100%;
    overflow: hidden;

    
}
.boards-box__list{
    overflow-x: hidden;
    transition: .2s ease-in-out;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: scroll;
    height: 100%;
}
main{
    transition: .2s ease-in-out;
    position: relative;
    margin: 0 auto;
    padding-top: 140px;
    width: 95%;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    
}



@media (max-width: 992px) {
    .boards-box{
        flex-direction: column;
        overflow-x: scroll;
    }
}
</style>