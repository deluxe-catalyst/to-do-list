import axios from 'axios';
import store from '..';
import instance from '@/utils/axios.config';

const boardsModule = {
    namespaced: true,
    state:{
        boards: [],
        boardIdForEdit: '',
        modalForBoardVisible: false,
        modalType: '',
    },
    getters:{
        boards: (state) => state.boards,
        boardIdForEdit: (state) => state.boardIdForEdit,
    },
    mutations:{
        setBoards(state, boards){
            state.boards = boards;
        },
        setBoardIdForEdit(state, boardIdForEdit){
            state.boardIdForEdit = boardIdForEdit;
        },
    },
    actions:{
        async axiosBoards({commit}){
          const USER_ID = localStorage.getItem('userId');
          await instance.get(`user/${USER_ID}/boards`)
          .then(response => {
                commit('setBoards', response.data);
            })
      
          },
        async axiosDeleteBoard({dispatch}, {boardIdForDelete}){
            const USER_ID = localStorage.getItem('userId');

            await instance.delete(`user/${USER_ID}/boards/${boardIdForDelete}`)
            .then(() =>{
                dispatch('axiosBoards');
              })
        },
        getBoardIdForEdit({commit}, {boardIdForEdit}){
            commit('setBoardIdForEdit', boardIdForEdit);
        },
        async axiosEditBoard({dispatch}, {newBoardName, newBoardDescription}){
            const USER_ID = localStorage.getItem('userId');
            const boardIdForEdit = store.state.boardsModule.boardIdForEdit;

            await instance.put(`user/${USER_ID}/boards/${boardIdForEdit}`,{
              formData:{
                name: newBoardName,
                description: newBoardDescription
              }
            })
            .then(()=>{dispatch('axiosBoards')});
        },
        
    }
}

export default boardsModule