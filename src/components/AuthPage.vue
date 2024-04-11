<template lang="">
    <main :class='animClass'>
        <div class="main-block">
            <div class="main-block__head">
                <h1>Добро пожаловать  👋</h1>
                <h2>
                    Сегодня новый день. Это твой день. 
                    Ты его формируешь. Войди, чтобы начать 
                    управлять своими проектами.
                </h2>
                <form v-if='isSignIn' class="main-block__auth-form" @submit.prevent = "">
                    <div class="auth-form__login">
                        <label for="email">Почта
                            <span class='label-error' v-if='logLoginErrorVisible'>{{loginError}}</span>

                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Example@email.com" 
                            required
                            v-model = "getLogin"
                            >
                    </div>
                    <div class="auth-form__password">
                        <label for="password">Пароль
                            <span class='label-error' v-if='logPasswordErrorVisible'>{{passwordError}}</span>
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            minlength="5" 
                            placeholder="Пароль должен содержать 5 символов" 
                            required
                            v-model = "getPassword"
                            >
                    </div>
                    <span class="auth-error" v-if="authErrorLogVisible">{{authErrorTextLog}}</span>
                    <button @click = "signIn" type="submit" class="login-button" to='/'>Войти</button>
                </form>

                <form v-if='isSignUp' class="main-block__auth-form" @submit.prevent = "">
                    <div class="auth-form__login">
                        <label for="name">Ваше имя
                            <span class='label-error' v-if='regNameErrorVisible'>{{regNameError}}</span>
                        </label>
                        <input 
                            type="name" 
                            id="name" 
                            name="name" 
                            placeholder="Имя" 
                            required
                            v-model = "getNewName"
                            >
                    </div>
                    <div class="auth-form__login">
                        <label for="email">Почта
                            <span class='label-error' v-if='regLoginErrorVisible'>{{loginError}}</span>
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Example@email.com" 
                            required
                            v-model = "getNewLogin"
                            >
                    </div>
                    <div class="auth-form__password">
                        <label for="password">Пароль
                            <span class='label-error' v-if='regPasswordErrorVisible'>{{passwordError}}</span>
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            minlength="5" 
                            placeholder="Пароль должен содержать 5 символов" 
                            required
                            v-model = "getNewPassword"
                            >
                    </div>
                    <div class="auth-form__password">
                        <label for="confirm-password">Подтвердите пароль
                            <span class='label-error' v-if='regConfirmPasswordErrorVisible'>{{regConfirmPasswordError}}</span>
                        </label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            name="confirm-password" 
                            minlength="5" 
                            placeholder="Пароли должны совпадать" 
                            required
                            v-model = "getConfirmPassword"
                            >
                    </div>
                    <span class="auth-error" v-if="authErrorRegVisible">{{authErrorTextReg}}</span>
                    <button @click = "signUp" type="submit" class="login-button">Регистрация</button>
                </form>

                <div class="auth-form__sign-up">
                    <span v-if='isSignIn'>У меня нет аккаунта!</span>
                    <span v-if='isSignUp'>У меня уже есть аккаунт!</span>
                
                    <a @click = "showSignUp" v-if='isSignIn'>Зарегистрироваться</a>
                    <a @click = "showSignIn" v-if='isSignUp'>Войти</a>
                </div>
            </div>
            <div class="main-block__img">
                <img class="login-img" src="@/assets/IMGs/Login Art.png" alt="Login Art">
            </div>
        </div>
    </main>
</template>
<script>
import { mapActions, mapGetters} from 'vuex';
export default {
    name: 'AuthPage',
    data(){
        return{
            getLogin: '',
            getPassword: '',

            getNewName: '',
            getNewLogin: '',
            getNewPassword: '',
            getConfirmPassword: '',

            isSignUp: false,
            isSignIn: true,

            authErrorTextLog: '',
            authErrorTextReg: '',

            authErrorLogVisible: false,
            authErrorRegVisible: false,


            loginError: 'Почта должна быть почтой',
            passwordError: 'Пароль должен содержать не менее 5 символов',

            regNameError: 'Обязательно к заполнению',
            regConfirmPasswordError: 'Пароли должны совпадать',

            regNameErrorVisible: false,
            regLoginErrorVisible: false,
            regPasswordErrorVisible: false,
            regConfirmPasswordErrorVisible: false,

            logLoginErrorVisible: false,
            logPasswordErrorVisible: false,

            validateEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            
        }
    },
    watch:{
        authErrorRegFromServer(newValue){
            if(newValue !== ''){
                this.authErrorTextReg = newValue;
                this.authErrorRegVisible = true;
            }
        },
        authErrorLogFromServer(newValue){
            if(newValue !== ''){
                this.authErrorTextLog = newValue;
                this.authErrorLogVisible = true;
            }
        },
    },
    computed:{
        ...mapGetters({
            authErrorLogFromServer: 'authModule/authErrorLog',
            authErrorRegFromServer: 'authModule/authErrorReg',
            animClass: 'animationModule/authAnim',
        })
    },
    methods:{
        ...mapActions({
            axiosLogin: 'authModule/axiosLogin',
            axiosReg: 'authModule/axiosReg',
            changeAnimClass: 'animationModule/changeVarAnim'
        }),
        showSignIn(){
            this.isSignUp = false;
            this.isSignIn = true;
        },
        showSignUp(){
            this.isSignIn = false;
            this.isSignUp = true;
        },

        signIn(){
            if(this.validateEmail.test(this.getLogin) && this.getPassword.length > 4){
                this.axiosLogin({userLogin: this.getLogin, userPassword: this.getPassword});
            }
            if(this.getPassword.length < 5){
                this.logPasswordErrorVisible = true;
            }
            if(!this.validateEmail.test(this.getLogin)){
                this.logLoginErrorVisible = true;
            }
        },
        signUp(){
            if(this.getNewPassword === this.getConfirmPassword && this.getNewName && this.validateEmail.test(this.getNewLogin) && this.getNewPassword.length > 4){
                this.axiosReg({newName: this.getNewName, newLogin: this.getNewLogin, newPassword: this.getNewPassword});
            }
            if(!this.getNewName){
                this.regNameErrorVisible = true;
            }
            if(!this.validateEmail.test(this.getNewLogin)){
                this.regLoginErrorVisible = true;
            }
            if(this.getNewPassword.length < 5){
                this.regPasswordErrorVisible = true;
            }
            if(this.getNewPassword !== this.getConfirmPassword){
                this.regConfirmPasswordErrorVisible = true;
            }
            
        }
    }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

@keyframes kanbanAnim{
    0%{
        transform: scale(90%);
        filter: blur(3px);
        opacity: 0;
    }
}

.hide-auth{
    transform: scale(50%);
    opacity: 0;
    filter: blur(10px);
}

.label-error{
    color: red;
}

html{
    height: 100%;
    display: none;
}

body{
    display: flex;
    height: 100%;
    align-items: center;
}

main{
    animation: kanbanAnim .5s;
    transition: .2s;
    width: 86%;
    margin: 0 auto;
    display: flex;
    align-items: center;
}

button{
    background-color: var(--button-bg) !important;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 12px !important;
    cursor: pointer;
    transition: .3s;
}

button:hover{
    transform: scale(95%);
}
button:active{
    transform: scale(90%);
}

.login-button{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

h1{
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 600;
    color: var(--head-text);
    font-size: 34px;
}

h2{
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    color: var(--head-text);
    font-size: 18px;
    width: 70%;
}


p, label, span{
    color: var(--main-text);
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

label{
    margin-bottom: 4px;
}

input{
    padding: 10px;
    border: 1px solid rgba(212, 215, 227, 1);
    background-color: var(--input-bg);
    border-radius: 12px;
    box-sizing: border-box;
    transition: .2s;
}

input:focus{
    outline: none;
}

input::placeholder{
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

a{
    text-decoration: none;
    color: var(--link);
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    cursor: pointer;
}

.main-block{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-img{
    display: block;
    width: 100%;
}

.main-block__head{
    display: flex;
    flex-direction: column;
}

.main-block__auth-form{
    width:70%;
}

.main-block__auth-form{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
}

.auth-form__login, .auth-form__password{
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
}

.auth-form__forgot-password{
    text-align: right;
}

.auth-form__sign-up{
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin-top: 10px;
}

.auth-error{
    color: red;
    margin: 0 auto;
}


    
</style>