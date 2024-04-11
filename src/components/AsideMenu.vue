<template lang="">
    <div class="left-side-content left-side-shadow">
        <aside>
            <div class="main-aside-menu">
                <div class="main-aside-menu__container">
                    <img class="main-aside-menu__pages-list" src="@/assets/SVG-images/pages-counter.svg" alt="">
                    <div class="main-aside-menu__logo">
                        <img src="@/assets/SVG-images/logo.svg" alt="">
                    </div>
                    <div class="main-aside-menu__menu-box">
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-squares.svg" alt="">
                        </div>
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-profile.svg" alt="">
                        </div>
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-calendar.svg" alt="">
                        </div>
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-analytics.svg" alt="">
                        </div>
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-drive.svg" alt="">
                        </div>
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-map.svg" alt="">
                        </div>
                        <div class="menu-box__item">
                            <img src="@/assets/SVG-images/menu-settings.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="exit-button">
                    <router-link to="/auth" @click='exitFromSystem'>
                        <div class='exit-button__label'>
                        </div>

                        <img class="exit-button__icon" src="@/assets/SVG-images/aside-exit.svg" alt="">
                    </router-link>
                </div>
            </div>
        </aside>
        <aside class="projects-menu">
            <div class="projects-header">
                <h1>Проекты</h1>
                <img class="projects-header__add-icon add-icon svg-img" src="@/assets/SVG-images/add-icon.svg">
            </div>
            <div class="aside-menu">
                <div class="aside-menu__item">
                    <div class="item-head">
                        <h3>Team</h3>
                        <img class="svg-img" src="@/assets/SVG-images/right-arrow.svg">
                    </div>
                </div>
                <div class="aside-menu__item">
                    <div class="item-head">
                        <h3 class="item-head__active">Projects</h3>
                        <img class="svg-img" src="@/assets/SVG-images/down-arrow.svg">
                    </div>
                    <div class="item-list-box">
                        <div class="items-line"></div>
                        <div class="item-list">
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4>All projects (3)</h4>
                            </div>
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4 class="aside-active-point">Design System</h4>
                            </div>
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4>User Flow</h4>
                            </div>
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4>Ux research</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aside-menu__item">
                    <div class="item-head">
                        <h3 class="item-head__active">Tasks</h3>
                        <img class="svg-img" src="@/assets/SVG-images/down-arrow.svg">
                    </div>
                    <div class="item-list-box">
                        <div class="items-line"></div>
                        <div class="item-list">
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4>All talks (11)</h4>
                            </div>
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4>To do (4)</h4>
                            </div>
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4 class="aside-active-point">User Flow (4)</h4>
                            </div>
                            <div class="item-list-point">
                                <div class="point-line"></div>
                                <h4>Done (3)</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aside-menu__item">
                    <div class="item-head">
                        <h3>Reminders</h3>
                        <img class="svg-img" src="@/assets/SVG-images/right-arrow.svg">
                    </div>
                </div>
                <div class="aside-menu__item">
                    <div class="item-head">
                        <h3>Messengers</h3>
                        <img src="@/assets/SVG-images/right-arrow.svg">
                    </div>
                </div>
            </div>
            <!-- <div class="theme-thumbler-box">
                <label class="label-checkbox" for="checkbox">
                    <input id="checkbox" class="theme-checkbox" type="checkbox">
                    <span class="checkbox-slider"></span>
                    <div class="theme-info">
                        <p class="theme-info__text">Light</p>
                        <p class="theme-info__text">Dark</p>
                    </div>
                </label>
            </div> -->
        </aside>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    name: 'asideMenu',
    methods:{
        ...mapActions({
            exit: 'authModule/exitFromSystem',
            changeAnimClass: 'animationModule/changeVarAnim'
        }),
        exitFromSystem(){
            this.changeAnimClass({classAnim: 'site-is-hide', page: 'mainPage'});
            setTimeout(() => {
                this.exit({userId: '', token: ''});   
            }, 500);
        }
    }
}
</script>
<style scoped>
:root{
    --thumbler-white-bg:rgba(97, 97, 98, 0.2);
}

.theme-thumbler-box{
    display: flex;
    justify-content: center;
    padding-block: 10px;
    position: relative;
    height: 30px;
}

.label-checkbox{
    width: 80%;
    position: relative;
}

.theme-checkbox{
    border: none;
    height: 0;
    width: 0;
    opacity: 0;
}

.checkbox-slider{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--thumbler-white-bg);
    border-radius: 100px;
    overflow: hidden;
}

.checkbox-slider::before{
    content: '';
    position: absolute;
    width: 50%;
    height: 80%;
    top: 50%;
    transform:translateY(-50%) translateX(3px);
    background-color: rgb(255, 255, 255);
    border-radius: 100px;
    transition: .3s;
    
}

.exit-button{
    cursor: pointer;
    position: relative;
    z-index: 10;
    margin-bottom: 4px;
}

.exit-button__icon{
    position: relative;
    z-index: 10;
    display: block;
}

.exit-button__label::before{
    position: absolute;
    left: 40px;
    content: 'Выход';
    font-family: 'Exo 2', sans-serif;
    color: rgb(153, 154, 155);
    font-weight: 600;
    transition: .2s;
    transform: translateX(40px);
    filter: blur(2px);
    transition: .3s;
}

.exit-button__label{
    overflow: hidden;
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 8px;
    top: 50%;
    left: -10px;
    transform: translate(0, -50%);
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(5px);
    filter: blur(6px);
    z-index: 1;
    border-radius: 20px;
    transition: .35s;
    border: 1.2px solid rgb(64, 64, 64);
}

.exit-button:hover .exit-button__label{
    width: 440%;
    background-color: rgba(28, 29, 34, 0.8);
    filter: blur(0);

}

.exit-button:hover .exit-button__label::before{
    transform: translateX(0px);
    filter: blur(0);
}

.theme-checkbox:checked + .checkbox-slider::before{
    transform: translateX(calc(100% - 3px)) translateY(-50%);
    background-color: rgb(255, 255, 255, .04);
}

.theme-info{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-around;
    cursor: pointer;

}


.left-side-content{
    height: 100%;
    position: fixed;
    display: flex;
    background-color: #fff;
    z-index: 1000;
}

.add-icon-task, .add-icon{
    padding: 5px;
    background-color: var(--light-gray);
    border-radius: 100%;
    transition: .3s;
    cursor: pointer;
}

.projects-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 20px 0px 20px;
    margin-top: 24px;
    font-size: 22px;
    
}

img.projects-header__add-icon.add-icon-task {
    width: 10px;
    padding: 8px;
    margin-top: 6px;
}

.projects-menu{
    display: flex;
    flex-direction: column;
}

.aside-menu
{
    margin: 0 0 0px 20px;
    margin-top: 28px;
    position: relative;
}

.item-head
{
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
}

.aside-menu__item{
    margin-bottom: 20px;
}

.item-list-box{
    display: flex;
    height: fit-content;
    position: relative;
}

.item-list-point
{
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 8px;
}

.item-list-point h4:hover{
    background-color: rgba(0, 0, 0, 0.05);
}

.item-list-point h4{
    padding: 8px 16px;
    border-radius: 100px;
    transition: .1s;
}

.item-list-point:last-child{
    margin: 0;
}

.item-head h3{
    color: var(--gray);
}

.item-head--active{
    color: var(--r-black) !important;
}

.item-list-point h4{
    color: var(--gray);
}

.aside-active-point{
    background-color: var(--very-light-gray);
    color: var(--r-black) !important;
}

.items-line{
    height: unset;
    width: 2px;
    background-color: var(--pre-light-gray);
}

.point-line{
    height: 2px;
    width: 20px;
    background-color: var(--pre-light-gray);

}

    .left-side-content{
    height: 100%;
    position: fixed;
    display: flex;
    background-color: #fff;
    z-index: 1000;
}

.left-side-shadow{
    box-shadow: 40px 180px 80px 0 var(--light-gray);
}

.main-aside-menu{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;
}

.left-side-content aside:first-child{
    background-color: var(--main-aside-bg);
    margin: 0;
    padding: 12px;
}

/* .left-side-content aside:last-child{ */
.aside-menu{
    padding-inline: 16px;
    overflow-y: scroll;
}

.aside-menu::-webkit-scrollbar{
    width: 16px;
    background-color: var(--scroll-track);
    border-radius: 100px;
}

.aside-menu::-webkit-scrollbar-thumb{
    border-radius: 100px;
    background-color: var(--scroll-thumb);
    border: 6px solid var(--scroll-track);
}

.main-aside-menu__menu-box{
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.menu-box__item img{
    display: block;
}

.menu-box__item{
    padding: 10px;
    border-radius: 100px;
    cursor: pointer;
    position: relative;
    z-index: 1;
}

.menu-box__item::after{
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: 0%;
    height: 0%;
    transform: translate(-50%, -50%);
    transition: .2s;
    content: '';
    background-color: rgba(255, 255, 255, .1);
    z-index: -1;
}

.menu-box__item:hover::after{
    width: 100%;
    height: 100%;
}

.menu-box__item:active::after{
    width: 80%;
    height: 80%;
    background-color: rgba(255, 255, 255, .05);
}


.main-aside-menu__container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
}

.main-aside-menu__pages-list{
    width: 70%;
    padding-top: 10px;
    display: block;
}
</style>