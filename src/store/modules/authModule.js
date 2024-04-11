import axios from "axios";
import router from "@/router";
import instance from "@/utils/axios.config";

const authModule = {
    namespaced: true,
    state: {
        token: '',
        userId: '',
        authErrorLog: '',
        authErrorReg: ''
    },
    getters: {
        token: (state) => state.token,
        userId: (state) => state.userId,
        authErrorLog: (state) => state.authErrorLog,
        authErrorReg: (state) => state.authErrorReg
    },
    mutations:{
        setInfo(state, userInfo){
            state.userId = userInfo.userId;
            state.token = userInfo.token;
        },
        setAuthErrorLog(state, error){
            state.authErrorLog = error;
        },
        setAuthErrorReg(state, error){
            state.authErrorReg = error;
        }
    },
    actions:{
        async axiosLogin({commit, dispatch}, {userLogin, userPassword}){

            await instance.post(`auth/signin`, {
                formData: {
                    email: userLogin,
                    password: userPassword
                  }
            }).then(response => {
                const token = response.data.token;
                const userId = response.data.userId;
                
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                
                commit('setInfo', {userId, token})
                dispatch('boardsModule/axiosBoards', {userId, token},  { root: true });
                dispatch('animationModule/changeVarAnim', {classAnim: 'hide-auth', page: 'authPage'}, {root: true});
                dispatch('animationModule/changeVarAnim', {classAnim: '', page: 'mainPage'}, {root: true});
                setTimeout(() => {
                    router.replace('/');
                }, 300);
                
              }).catch(error => {
                commit('setAuthErrorLog', error.response.data.cause);
              })
        },
        async axiosReg({commit, dispatch}, {newName, newLogin, newPassword}){
            await instance.put(`auth/signup`,{
                formData:{
                    name: newName,
                    email: newLogin,
                    password: newPassword
                }
            }).then(() => {
                dispatch('axiosLogin', { userLogin: newLogin, userPassword: newPassword })
            }).catch(error => {
                commit('setAuthErrorReg', error.response.data.cause);
            })
        },
        addInfoFromLocalStorage({commit}, {userId, token}){
            commit('setInfo', {userId, token});
        },
        exitFromSystem({commit, dispatch}, {userId, token}){
            localStorage.clear();
            commit('setInfo', {userId, token});
            dispatch('animationModule/changeVarAnim', {classAnim: '', page: 'authPage'}, {root: true});
            router.replace('/auth'); 
        }
    }
}

export default authModule