<template lang="">
    <header>
        <nav>
            <div class="nav__container">
                <div class="nav__content-block">
                    <h2>Добро пожаловать 👋</h2>
                    <div class="nav__profile-items">
                        <img class="nav__icon svg-img" src="@/assets/SVG-images/search.svg">
                        <img class="svg-img" src="@/assets/SVG-images/notify.svg">
                        <div class="calendar">
                            <img class="svg-img" src="@/assets/SVG-images/calendar.svg">
                            <h4 class="calendar__date">{{todayDate}}</h4>
                        </div>
                        <img class="nav__profile-photo" src="@/assets/IMGs/profile-photo.jpg">
                    </div>
                </div>
                <div class="nav__menu-box">
                    <div class="nav__list" v-if='isIntoTheBoard'>
                        <div class="menu__items">
                            <div class="menu__item menu-item-1">
                                <div class="menu__item-box" @click="backToBoards">
                                    <img class="svg-img back-icon" src="@/assets/SVG-images/back-icon.svg">
                                    <h4 class='back-to-boards'>Список досок</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 class="menu-box__header" v-if='!isIntoTheBoard'>Ваши доски</h1>
                    <div class="nav__box">
                        <div class="nav__menu">
                            <div class="menu__parametrs">
                                <h4 v-if='isIntoTheBoard' class='menu__members' @click='openModalForUserList'>Участники</h4>
                                <h4 v-if='!isIntoTheBoard'>Фильтр</h4>
                                <h4 v-if='!isIntoTheBoard'>Сортировать</h4>
                                <h4 v-if='isIntoTheBoard && (currentUserPermissions.includes("delete-board-statuses"))' class="menu__add-kanban" @click="openTheModalForColumn">Добавить колонку</h4>
                                <h4 v-if='!isIntoTheBoard' class="menu__add-kanban" @click="openTheModalForBoard">Добавить доску</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: 'the-header',
    computed:{
        ...mapGetters({
            currentUserPermissions: 'usersManage/currentUserManagePermissions'
        }),
        isIntoTheBoard(){
            return this.$route.path.startsWith('/board/');
        },
        todayDate(){
            const monthList = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентебря', 'Октября', 'Ноября', 'Декабря'];
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            let textCurrentMonth = '';
            for (let index = 0; index < monthList.length; index++) {
                if(currentMonth === index){
                    textCurrentMonth = monthList[index];
                }
            }
            return `${currentDay} ${textCurrentMonth} ${currentYear}`;
        }
    },
    methods:{
        ...mapActions({
            openModalForCreateBoard: 'modalModule/openModalForCreateBoard',
            openModalForCreateColumn: 'modalModule/openModalForCreateColumn',
            kanbanAnim: 'animationModule/changeVarAnim',
            getUserList: 'usersManage/getUsersList',
            openModalForManageUsers: 'modalModule/openModalForManageUsers'
        }),
        backToBoards(){
            this.kanbanAnim({classAnim: 'hideKanban', page: 'statusPage'});
            setTimeout(() => {
                this.$router.push('/');
                // this.changeExitAnim({classAnim: ''}); //=====вставить в крейтд у листбород
            }, 300);
        },
        openModalForUserList(){
            this.getUserList();
        },
        openTheModalForBoard(){
            this.openModalForCreateBoard();
        },
        openTheModalForColumn(){
            this.openModalForCreateColumn();
        },


    },
}
</script>
<style scoped>


h1{
    margin: 0;
    white-space: nowrap;
}

h2{
    transition: .2s;
}
    header{
    background-color: white;
    position: fixed;
    z-index: 900;
    width: 100%;
}

nav{
    margin: 0 auto;
    margin-left: 300px;
}
.menu-box__header{
    animation: buttonAnim .4s;
}
.nav__container{
    width: 95%;
    margin: 0 auto;
    border-bottom: 2px solid #ededee;
}

.nav__content-block{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 20px;
}

.nav__profile-items{
    display: flex;
    align-items: center;
    gap: 22px;
}

.calendar{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.calendar__date{
    margin-left: 8px;
    color: var(--gray);
}

.nav__profile-photo{
    width: 36px;
    height: 36px;
    border-radius: 100%;
}



.nav__menu{
    width: 100%;
    display: flex;
    position: relative;
    justify-content: end;
    padding-bottom: 4px;
}

.nav__box{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.list-tumbler--active{
    position: absolute;
    width: 114px;
    height: 100%;
    background-color: var(--r-black);
    transition: .3s ease-out;
}

.list-tumbler--active-right{
    margin-left: calc(100% - 101px);
    width: 101px;
}

.list-tumbler{
    position: relative;
    height: 2px;
    width: 100%;
    background-color: var(--light-gray);
}

.menu__items{
    display: flex;
    position: relative;
}

.menu__item{
    cursor: pointer;
    padding-block: 4px;
    
}

.menu__item-box{
    padding: 8px 10px;
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

.menu__item-box:hover{
    border-radius: 10px;

}

.menu__item-box:hover .back-icon{
    transform: translateX(-4px);
}

.back-icon{
    transition: 0.2s;

    width: 16px;
}

.back-to-boards{
    margin-bottom: 2px;
    padding-right: 4px;
}

.add-icon-task, .add-icon{
    padding: 5px;
    background-color: var(--light-gray);
    border-radius: 100%;
    transition: .3s;
    cursor: pointer;
}
.add-icon-task:hover{
    background-color: var(--pre-light-gray);
}

.nav__menu-box{
    display: flex;
    justify-content: space-between;
}

.menu__parametrs{
    justify-content: end;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
}

.dots-icon, .task-dots-icon{
    position: relative;
    width: 10px;
    height: 10px;
    padding: 5px;
    border: 2px solid var(--light-gray);
    border-radius: 100%;
    cursor: pointer;
    z-index: 100;
    background-color: white;
}

.menu__members{
    background-color: var(--pre-light-gray);
    color: var(--r-black);
    padding: 10px 20px;
    border-radius: 18px;
    cursor: pointer;
    transition: .25s;
    box-sizing: border-box;
    animation: buttonAnim .4s;
    box-sizing: border-box;
}

.menu__members:hover{
    border-radius: 10px;
}

.menu__add-kanban{
    cursor: pointer;
    background-color: var(--r-black);
    color: white;
    padding: 10px 20px;
    border-radius: 200px;
    transition: .3s;
    overflow: hidden;
    width: auto;
    animation: buttonAnim .4s;
}

@keyframes buttonAnim{
    0%{
        transform: scale(90%);
        filter: blur(1.5px);
        opacity: 0;
    }
}

.menu__add-kanban:hover{
    transform: scale(110%);
    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.2);
}

@media (max-width: 992px) {
    h2{
       font-size: 16px;
    }
}
</style>