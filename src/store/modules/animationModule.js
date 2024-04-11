import authModule from "./authModule";

const animationModule = {
    namespaced: true,
    state:{
        statusAnim: '',
        boardsAnim: '',
        authAnim: '',
        mainPageAnim: '',
    },
    getters:{
        statusAnim: (state) => state.statusAnim,
        boardsAnim: (state) => state.boardsAnim,
        authAnim: (state) => state.authAnim,
        mainPageAnim: (state) => state.mainPageAnim
    },
    mutations:{
        setAnim(state, {classAnim, page}){
            if(page === 'statusPage'){
                state.statusAnim = classAnim;
            }
            if(page === 'boardsPage'){
                state.boardsAnim = classAnim; 
            }
            if(page === 'authPage'){
                state.authAnim = classAnim;
            }
            if(page === 'mainPage'){
                state.mainPageAnim = classAnim;
            }
        }
    },
    actions:{
        changeVarAnim({commit}, {classAnim, page}){
            commit('setAnim', {classAnim, page});
        }
    }
}

export default animationModule