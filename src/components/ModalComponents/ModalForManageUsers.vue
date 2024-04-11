<template lang="">
    <div class='manage-menu'>
        <div class='manage-menu__box'>
            <h1>Список пользователей</h1>
            <div class='manage-menu__description'>
                <h2>Имя пользователя</h2>
            </div>
            <div class='manage-menu__user-list' >
                <div class='user-list__item' v-for='user in userList'>
                    <div v-if='user.id != currentUserId' class='item__label'>
                        <h3>{{user.name}}</h3>
                        <h4>{{user.email}}</h4>
                    </div>
                    <div v-if = "userList.length === 1" class='item__label--empty'>
                        <h2>Пусто</h2>
                    </div>
                    <div class='item-manage' v-if='(user.id != currentUserId && user.id != boardAdminId) && (currentUserPermissions && currentUserPermissions.includes("manage-board-users"))'>
                        <div class='item-manage__menu' @click='showManagePermissions(user.id), handleUserEmail=user.email'>
                            <img class="settings-icon" src="@/assets/SVG-images/settings-icon.svg">
                        </div>
                        <button @click="deleteUserFromBoard(user.id)" class="board__delete-button">
                            <div></div>
                            <img src='@/assets/SVG-images/vector-trash.svg'>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if='(currentUserPermissions && currentUserPermissions.includes("manage-board-users"))' class='manage-menu__users-manage'>
        <transition name='boxanim' mode='out-in'>
            <div class='manage-menu__box' v-if='!isManagePermissions'>
                <input 
                v-model = 'enteredEmail'
                placeholder="Поиск пользователей"
                />
                <div class='search-box'>
                        <h4 class='search-box__item' v-for="user in searchUserList" @click='addUserToBoard(user.id)'>
                            {{user.email}}
                        </h4>
                    <h2 v-if='searchUserList.length === 0'>
                        Пусто
                    </h2>
                </div>
            </div>
            <div :class="'manage-menu__box ' + userManageAnimClass" v-else>
                <div class='manage-menu__header'>
                    <div class="manage-menu__prev-button" @click="hideUserManageAnim">
                        <img class="svg-img back-icon" src="@/assets/SVG-images/back-icon.svg">
                        <h4 class='back-to-search'>Назад</h4>
                    </div>
                    <h2 class='manage-menu__email-label'>{{handleUserEmail}}</h2>
                </div>

                <div class='manage-menu__permissions-list'>
                    <div class='permissions-list__item' v-for='permission in allPermissionsList'>
                        <h4>{{permissionsLabels[permission]}}</h4>
                        <label class=checkbox-container>
                            <input type='checkbox' class='checkbox'
                            :checked = 'userPermissions.includes(permission)'
                            :value = permission
                            @change='changePermission($event.target.checked, permission)'
                            />
                            <span class='checkbox-label'>
                                <img class='checkbox-img' src='@/assets/SVG-images/check-icon.svg'/>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </transition>

        </div>
    </div>
</template>
<script>

import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'modal-for-manage-users',
    data(){ 
        return{
            userManageAnimClass: '',

            enteredEmail: '',
            handleUserEmail: '',

            permissionsLabels: {
                'delete-board': 'Удаление досок',
                'delete-board-statuses': 'Удаление статусов доски',
                'manage-board': 'Управление доской',
                'manage-board-statuses': 'Управление статусами доски',
                'manage-board-users': 'Управление пользователями доски',
            }
        }
    },
    watch:{
        enteredEmail(newValue){
            if(newValue.length > 4){
                this.axiosSearchUser({email: this.enteredEmail});
            }
        }
    },
    computed: {
        ...mapGetters({
            userList: 'usersManage/userList',
            searchUserList: 'usersManage/searchUserList',
            currentUserId: 'authModule/userId',
            allPermissionsList: 'usersManage/allPermissionsList',
            userPermissions: 'usersManage/userPermissions',
            isManagePermissions: 'usersManage/permissionsVisible',
            boardAdminId: 'usersManage/adminId',

            currentUserPermissions: 'usersManage/currentUserManagePermissions'
        })
    },
    methods:{
        ...mapActions({
            axiosSearchUser: 'usersManage/axiosSearchUsers',
            axiosAddUserToBoard: 'usersManage/axiosAddUserToBoard',
            axiosDeleteUserFromBoard: 'usersManage/axiosDeleteUserFromBoard',
            axiosGetUserPermissions: 'usersManage/axiosGetUserPermissions',
            hideUserManage: 'usersManage/hidePermissions',

            axiosGetAllPermissions: 'usersManage/axiosGetAllPermissions',

            axiosAddPermission: 'usersManage/axiosAddPermission',
            axiosDeletePermission: 'usersManage/axiosDeletePermission',
        }),
        changePermission(checked, permission){
            if(checked === true){
                this.axiosAddPermission({boardId: this.$route.params.id, permission});
                return;
            }
            this.axiosDeletePermission({boardId: this.$route.params.id, permission});
        },
        addUserToBoard(userId){
            this.axiosAddUserToBoard({userId});
        },
        deleteUserFromBoard(userId){
            this.hideUserManage();
            this.axiosDeleteUserFromBoard({userId});
        },
        showManagePermissions(userId){
            this.axiosGetUserPermissions({userId})
        },
        hideUserManageAnim(){
            this.userManageAnimClass = '--hide';
                this.hideUserManage();
                this.userManageAnimClass = '';

        }
    },
    created(){
        this.axiosGetAllPermissions({boardId: this.$route.params.id});
    }
}
</script>
<style scoped>

.boxanim-enter-active, .boxanim-leave-active{
    transition: .5s;
}

.boxanim-enter-from{
    transform: scale(70%) rotateX(-90deg) translateY(-120px);
    filter: blur(2px);
    opacity: 0;
}

.boxanim-leave-to{
    filter: blur(2px);
    transform: scale(70%) translateY(120px) rotateX(90deg);
    opacity: 0;
}




button{
    overflow: hidden;
    position: relative;
    border: none;
    padding: 10px 10px;
    background-color: var(--r-black);
    cursor: pointer;
    border-radius: 8px;
    
}

button:hover div{
    transform: none;
    filter: none;
    z-index: 1;
}

button div{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 0px;
    z-index: 1000;
    background-color: rgb(230, 0, 0);
    border-radius: 6px;
    transform: translateY(-110%);
    transition: .3s;
    z-index: 1;
    filter: blur(1px);
    z-index: 1;
}


img{
    display: block;
    width: 18px;
    height: 18px;
    position: relative;
    z-index: 10;
}



input{
    border: none;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
}

.manage-menu{
    padding: 10px;
    display: flex;
    width: min-content;
    gap: 30px;
    justify-content: space-between;
    overflow: hidden;
    height: 400px;
}

h1{
    margin: 0;
    margin-bottom: 20px;
    width: max-content;
}


.manage-menu__description{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.manage-menu__users-manage{
    width: 380px;
}

.user-manage-menu{
    display: flex;
    justify-content: space-between;
}

.manage-menu__user-list{
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: scroll;
    height: 80%;
}

.manage-menu__user-list::-webkit-scrollbar{
    height: 12px;
    width: 12px;
    background-color: var(--scroll-track);
    border-radius: 100px;
}

.manage-menu__user-list::-webkit-scrollbar-thumb{
    border-radius: 100px;
    background-color: var(--scroll-thumb);
    border: 4px solid var(--scroll-track);
}

.user-list__item{
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    gap: 4px;

}

.search-container{
    width: 100%;
    animation: searchBoxAnim .4s;
}

@keyframes searchBoxAnim {
    0%{
        opacity: 0;
        filter: blur(2px);
        transform: scale(110%);
    }
}

.item-manage{
    display: flex;
    align-items: center;
    gap: 4px;
}

.manage-menu__settings--hide{
    transform: translateY(120px) scale(90%) rotateX(90deg);
    filter: blur(4px);
    opacity: 0;
    transition: .6s;
}

.manage-menu__settings{
    animation: settingsAnim .6s;
}

@keyframes settingsAnim {
    0%{
        filter: blur(4px);
        transform: translateY(120px) scale(90%) rotateX(90deg);
        opacity: 0;
    }
}

.item-manage__menu{
    padding: 11px 11px;
    border-radius: 18px;
    box-sizing: border-box;
    background-color: var(--light-gray);
    transition: .2s;
}

.item-manage__menu:hover{
    border-radius: 8px;
}

.item-manage__menu img{
    width: 16px;
    height: 16px;
}

.item__label{
    border-radius: 8px;
    background-color: var(--light-gray); 
    display: flex;
    width: 100%;
    padding: 10px 12px;
    justify-content: space-between;
}

.item__label--empty{
    background-color: var(--light-gray); 
    border-radius: 8px;
    display: flex;
    width: 100%;
    padding: 10px 12px;
    justify-content: center;
    cursor: default;
}

.search-box{
    display: flex;
    margin-top: 10px;
    gap: 4px;
    flex-wrap: wrap;
    box-sizing: border-box;
}



.search-box h2{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: var(--gray);
}

.search-box__item{
    cursor: pointer;
    padding: 4px 8px;
    background-color: var(--very-light-gray);
    border-radius: 4px;
    font-weight: 400;
    animation: searchItemAnim .2s;
    height: min-content;
    transition: .2s;
}

.search-box__item:hover{
    background-color: var(--light-gray);
}

.manage-menu__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.manage-menu__prev-button{
    padding: 8px 16px 8px 10px;
    width: min-content;
    line-height: .8;
    border-radius: 18px;
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    background-color: var(--light-gray);
    cursor: pointer;
    animation: buttonAnim .4s;
    transition: .2s;
}

.manage-menu__prev-button:hover{
    border-radius: 8px;
}

.manage-menu__prev-button:hover .back-icon{
    transform: translateX(-4px);
}

.back-icon{
    transition: 0.2s;
    width: 16px;
}

.manage-menu__permissions-list{
    margin-top: 10px;
}

.permissions-list__item input{
    width: auto;
    margin: 0;
}

.permissions-list__item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
    padding-block: 4px;
}

.permissions-list__item h4{
    font-weight: 400;
    font-size: 16px;
}

.checkbox{
    display: none;
}

.checkbox-container{
    background-color: rgb(184, 184, 184);
    width: 26px;
    height: 26px;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
}

.checkbox-label{
    display: block;
    width: 26px;
    height: 26px;
    background-color: rgb(6, 153, 6);
    z-index: 10;
    border-radius: 100px;
    transition: .3s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkbox:checked + .checkbox-label{
    animation: checkedAnim .3s;
}   
.checkbox:not(:checked) + .checkbox-label{
    transform: translateY(-40px);
}

@keyframes checkedAnim {
    0%{
        transform: translateY(40px);
    }
}

@keyframes searchItemAnim {
    0%{
        filter: blur(1px);
        transform: scale(80%) translateX(-20px);
        opacity: 0;
    }
}
</style>