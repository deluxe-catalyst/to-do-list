import axios from "axios";
import router from "@/router";
import store from '..';
import instance from "@/utils/axios.config";

const modalModule = {
    namespaced: true,
    state:{
        typeModal: '',
        modalVisible: false,

        oldBoardName: '',
        oldBoardDescription: '',
        boardIdForEdit: '',

        columnIdForCreateTask: '',

        oldTaskTitle: '',
        oldTaskDescription: '',
        oldTaskDate: '',
        
        editedTaskId: '',
        editedTaskColumnId: '',

        editedStatus: '',
        editedStatusId: ''
    },
    getters:{
        modalVisible: (state) => state.modalVisible,
        modalType: (state) => state.modalType,

        oldBoardName: (state) => state.oldBoardName,
        oldBoardDescription: (state) => state.oldBoardDescription,
        boardIdForEdit: (state) => state.boardIdForEdit,

        columnIdForCreateTask: (state) => state.columnIdForCreateTask,

        oldTaskTitle: (state) => state.oldTaskTitle,
        oldTaskDescription: (state) => state.oldTaskDescription,
        oldTaskDate: (state) => state.oldTaskDate,
        editedTaskId: (state) => state.editedTaskId,
        editedTaskColumnId: (state) => state.editedTaskColumnId,

        editedStatus: (state) => state.editedStatus,
        editedStatusId: (state) => state.editedStatusId
    },
    mutations:{
        setModalForCreateBoard(state){
            state.modalVisible = true;
            state.modalType = 'isCreateBoard';
        },
        setModalForEditBoard(state, {oldBoardName, oldBoardDescription, boardIdForEdit}){
            state.modalVisible = true;
            state.modalType = 'isEditBoard';

            state.oldBoardName = oldBoardName;
            state.oldBoardDescription = oldBoardDescription;
            state.boardIdForEdit = boardIdForEdit;
        },
        setModalForCreateColumn(state){
            state.modalVisible = true;
            state.modalType = 'isCreateColumn';
        },
        setModalForCreateTask(state, {columnIdForCreateTask}){
            state.modalVisible = true;
            state.modalType = 'isCreateTask';
            state.columnIdForCreateTask = columnIdForCreateTask;
        },
        setModalForEditTask(state, {oldTitle, oldDescription, oldDate, taskId, taskColumnId}){
          state.modalVisible = true;
          state.modalType = 'isEditTask';

          state.editedTaskId = taskId;
          state.editedTaskColumnId = taskColumnId;

          state.oldTaskTitle = oldTitle;
          state.oldTaskDescription = oldDescription;
          state.oldTaskDate = oldDate;
        },
        setModalHide(state){
            state.modalVisible = false;
            state.modalType = '';
        },
        setModalForManageUsers(state){
          state.modalVisible = true;
          state.modalType = 'isManageUsers';
        },
        setModalForEditStatus(state, {oldStatus, editedStatusId}){
          state.modalVisible = true;
          state.modalType = 'isEditStatus';
          state.editedStatus = oldStatus;
          state.editedStatusId = editedStatusId;
        },
    },
    actions:{
        openModalForEditStatus({commit},{oldStatus, editedStatusId}){
          commit('setModalForEditStatus', {oldStatus, editedStatusId});
        },
        openModalForManageUsers({commit}){
          commit('setModalForManageUsers');
        },
        openModalForCreateBoard({commit}){
            commit('setModalForCreateBoard');
        },
        openModalForEditBoard({commit}, {oldBoardName, oldBoardDescription, boardIdForEdit}){
            commit('setModalForEditBoard', {oldBoardName, oldBoardDescription, boardIdForEdit})
        },
        openModalForCreateColumn({commit}){
            commit('setModalForCreateColumn');
        },
        openModalForCreateTask({commit}, {columnIdForCreateTask}){
            commit('setModalForCreateTask', {columnIdForCreateTask});
        },
        openModalForEditTask({commit}, {oldTitle, oldDescription, oldDate, taskId, taskColumnId}){
            commit('setModalForEditTask', {oldTitle, oldDescription, oldDate, taskId, taskColumnId})
        },
        closeModal({commit, dispatch}){
            commit('setModalHide');
            dispatch('usersManage/hidePermissions', null, {root: true});
        },
        async axiosAddBoard({dispatch}, {boardName, boardDescription}){
            const USER_ID= localStorage.getItem('userId');
            await instance.post(`user/${USER_ID}/boards`, {
              formData:{
                name: boardName,
                description: boardDescription
              }
            })
            .then(() => {dispatch('boardsModule/axiosBoards', null, {root: true})})
        },
        async axiosEditBoard({dispatch, state}, {newBoardName, newBoardDescription}){
            const USER_ID= localStorage.getItem('userId');
            await instance.put(`user/${USER_ID}/boards/${state.boardIdForEdit}`, {
              formData:{
                name: newBoardName,
                description: newBoardDescription
              }
            }).then(()=>{dispatch('boardsModule/axiosBoards', null, {root: true})});
        },
        async axiosAddColumn({dispatch},{columnName}){
            const boardId = store.state.statusModule.boardId;

            await instance.post(`boards/${boardId}/statuses`, {
              formData:{
                name: columnName
              }
            }).then(()=>{dispatch('statusModule/openStatusBoard', {boardId}, {root: true})});
          },
          //====================================
          async axiosEditStatus({dispatch, state}, {boardId, newEditedStatus}){
            await instance.put(`boards/${boardId}/statuses/${state.editedStatusId}`,{
              formData:{name: newEditedStatus}
            })
            .then(() => {
              dispatch('statusModule/openStatusBoard', {boardId}, {root: true})
            })
          },
          async axiosAddTask({state, dispatch}, {title, description, date}){
            const boardId = store.state.statusModule.boardId;

            await instance.post(`boards/${boardId}/tasks`, {
              formData:{
                statusId: state.columnIdForCreateTask,
                name: title,
                description: description,
                plannedCompletionAt: date
              }
            }).then(()=>{dispatch('statusModule/openStatusBoard', {boardId}, {root: true})});
          },
          async axiosEditTask({state, dispatch},{title, description, date}){
            const boardId = store.state.statusModule.boardId;

            await instance.put(`boards/${boardId}/tasks/${state.editedTaskId}`, {
              formData:{
                statusId: state.editedTaskColumnId,
                name: title,
                description: description,
                plannedCompletionAt: date
              }
            }).then(()=>{dispatch('statusModule/openStatusBoard', {boardId}, {root: true})});
          },
        
    }
}

export default modalModule