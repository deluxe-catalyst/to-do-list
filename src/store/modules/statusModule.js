import axios from 'axios';
import store from '..';
import instance from '@/utils/axios.config';


const statusModule = {
    namespaced: true,
    state:{
        statusBoard: [],
        boardId: '',

        columnIdDragOver: '',
    },
    getters: {
        statusBoard: (state) => state.statusBoard,
    },
    mutations: {
        setStatusBoard(state, statusBoard){
            state.statusBoard = statusBoard;
        },
        setBoardId(state, boardId){
            state.boardId = boardId;
        },
        setColumnDragOver(state, columnIdDragOver){
          state.columnIdDragOver = columnIdDragOver;
        }
    },
    actions:{
        async openStatusBoard({commit}, {boardId}){
            await instance.get(`boards/${boardId}/tasks`,)
            .then(response => {
              commit('setStatusBoard', response.data);
              commit('setBoardId', boardId);
            })
        },
          getColumnDragOver({commit}, {columnIdDragOver}){
            commit('setColumnDragOver', columnIdDragOver);
          },
          async axiosResponceDragTasks({commit, dispatch, state}, {currentTaskId}){
            const currentBoardId = state.boardId;
            try{
              await instance.patch(`boards/${currentBoardId}/tasks/${currentTaskId}`, {
                formData:{
                  statusId: state.columnIdDragOver
                },
              })
              dispatch('openStatusBoard', {boardId: state.boardId});
            }
            catch{
              console.log('Dragging Error');
            }
          },
          async axiosDeleteStatus({dispatch}, {boardId, statusId}){
            await instance.delete(`boards/${boardId}/statuses/${statusId}`)
            .then(() =>{
              dispatch('openStatusBoard', {boardId});
            })
          },
          async axiosDeleteTask({state, dispatch}, {taskIdForDelete}){
            const currentBoardId = state.boardId;
            await instance.delete(`boards/${currentBoardId}/tasks/${taskIdForDelete}`)
            .then(() => dispatch('openStatusBoard', {boardId: currentBoardId}));

          },
    }
}

export default statusModule