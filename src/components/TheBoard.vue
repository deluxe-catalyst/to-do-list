<template lang="">
    <div @click='openBoard' :class='"board " + currentAnim'>
        <div>
            <h1>{{name}}</h1>
            <h2>{{description}}</h2>
        </div>
        <div class="board__footer">
            <h3>Владелец: {{owner}}</h3>
            <div class="board__buttons">
                <button @click.stop.prevent = 'editBoard' v-if='boardPermission.includes("manage-board")'>
                    <img src='@/assets/SVG-images/vector-edit.svg'>
                    <div></div>
                </button>
                <button @click.stop.prevent="deleteBoard" 
                v-if='boardPermission.includes("delete-board")' 
                class="board__delete-button">
                    <img src='@/assets/SVG-images/vector-trash.svg'>
                    <div></div>
                </button>
            </div>
        </div>

    </div>
</template>
<script>
import { mapActions, mapGetters} from 'vuex';
import instance from '@/utils/axios.config';
export default {
    name: "the-board",
    data(){
        return{
            currentAnim: '',
            currentUser: '',
            boardPermission: ''
        }
    },
    props: {
        boardId:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        owner:{
            type: String,
            required: true
        },
        ownerId:{
            type: String,
            required: true
        }
    },
    computed:{
            ...mapGetters({
                boardsGetter: 'boardsModule/boards',
                modalForBoardVisible: 'modalModule/modalVisible',
                
                isAdmin: 'usersManage/currentUserIsAdmin',
                currentUserPermissions: 'usersManage/currentUserManagePermissions'
            }),

        },
    methods: {
        async axiosGetBoardPermission(boardId){
            const CURRENT_USER_ID = localStorage.getItem('userId');
            await instance.get(`boards/${boardId}/users/${CURRENT_USER_ID}/permissions`)
            .then(response => {
                this.boardPermission = response.data;
            })
        },
        ...mapActions({
            deleteBoardAction: 'boardsModule/axiosDeleteBoard',
            openStatusBoard: 'statusModule/openStatusBoard',
            openModalForEditBoard: 'modalModule/openModalForEditBoard',

            changeAnimClass: 'animationModule/changeVarAnim',
        }),
        openBoard(){
            this.currentAnim = 'hide-current-board'
            this.openStatusBoard({boardId: this.boardId});
            this.changeAnimClass({classAnim: 'hide-boards', page: 'boardsPage'});
            setTimeout(() => {
                this.$router.push('/board/' + this.boardId);
            }, 200);
        },
        editBoard(){
            this.openModalForEditBoard({oldBoardName: this.name, oldBoardDescription: this.description, boardIdForEdit: this.boardId});
        },
        deleteBoard(){
            this.deleteBoardAction({boardIdForDelete: this.boardId});
        },
    },
    created(){
        this.currentUser = localStorage.getItem('userId');
        this.axiosGetBoardPermission(this.boardId);
        this.changeAnimClass({classAnim: '', page: 'statusPage'});
    },
}
</script>
<style scoped>

.hide-current-board{
    z-index: 10;
    animation: animHideBoard 0.2s !important;
}

@keyframes animHideBoard {
    100%{
        transform: scale(150%);
    }
}

h1{
    font-size: 26px;
    margin: 0;
    transition: .2s;
    margin-bottom: 10px;
}
h2{
    font-size: 14px;
    color: var(--gray)
}
h3{
    font-size: 12px;
}

@keyframes kanbanAnim{
    0%{
        transform: scale(40%);
        filter: blur(10px);
        opacity: 0;
        padding: 30px;
        padding-bottom: 60px;
        margin-bottom: 30px;
    }
    40%{
        transform: scale(103%);
        filter: blur(1px);
        padding-top: 24px;
        padding-bottom: 12px;
    }
}
.board{

    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;
    padding: 20px;
    margin: 10px;
    flex: 1 1 30%;
    background-color: rgb(246, 246, 246);
    border-radius: 10px;
    transition: 0.2s;
    animation: kanbanAnim .8s;
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    box-sizing: border-box;

    border: 1.5px solid rgba(0, 0, 0, 0);
}


.board:hover{
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
    border: 1.5px solid rgba(255, 255, 255, 1);
}

.board:hover h1{
    transform: scale(110%) translateX(4%);
}

.board__footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.board__buttons{
    display: flex;
    gap: 4px;

}

@keyframes buttonsAnim {
    0%{
        opacity: 0;
        transform: scale(50%);
        filter: blur(2px);
    }
}

button{
    animation: buttonsAnim .5s;
    position: relative;
    border: none;
    padding: 8px 8px;
    background-color: var(--r-black);
    cursor: pointer;
    transition: .2s;
    border-radius: 6px;
    display: flex;
    overflow: hidden;
}



button:hover{
    transform: scale(110%);
}
img{
    position: relative;
    width: 14px;
    z-index: 10;

}

button div{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: '';
    border-radius: 0px;
    z-index: 1000;
    background-color: rgb(0, 69, 230);
    border-radius: 6px;
    transform: translateY(-110%);
    transition: .3s;
    z-index: 1;
    filter: blur(1px);
}

button:last-child div{
    background-color: rgb(230, 0, 0);
}

button:hover div{
    transform: translateY(0);
    filter: blur(0px);
}

@media (max-width: 992px) {
    .board{
        flex: 1 1 40%;

    }
}

@media (max-width: 767px) {
    .board{
        flex: 1 1 100%;

    }
}

</style>