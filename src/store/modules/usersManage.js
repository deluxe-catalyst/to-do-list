import instance from "@/utils/axios.config";
import store from "..";
import router from "@/router";

const usersManage = {
    namespaced: true,
    state:{
        currentUserManagePermissions: '',
        currentUserManageId: '',

        usersList: '',
        searchUserList: '',

        allPermissionsList: '',
        userPermissions: '',
        permissionsVisible: false,
        adminId: '',
    },
    getters:{
        userList: (state) => state.userList,
        searchUserList: (state) => state.searchUserList,
        allPermissionsList: (state) => state.allPermissionsList,
        userPermissions: (state) => state.userPermissions,
        permissionsVisible: (state) => state.permissionsVisible,
        allPermissionList: (state) => state.allPermissionList,
        adminId: (state) => state.adminId,

        currentUserManagePermissions: (state) => state.currentUserManagePermissions,
    },
    mutations:{
        setUserList(state, {userList}){
            state.userList = userList;
        },
        setSearchUserList(state, {searchUserList}){
            state.searchUserList = searchUserList;
        },
        setUserPermissions(state, {userPermissions, userId}){
            state.userPermissions = userPermissions;
            state.currentUserManageId = userId;
        },
        setAllPermissions(state, {allPermissionsList}){
            state.allPermissionsList = allPermissionsList;
        },
        setPermissionsVisible(state, {permissionsVisible}){
            state.permissionsVisible = permissionsVisible;
        },
        setBoardAdmin(state, {adminId}){
            state.adminId = adminId;
        },
        setCurrentUserPermissions(state, {currentUserPermissions}){
            state.currentUserManagePermissions = currentUserPermissions; 
             //===== права моего пользователя
        }
    },
    actions:{
        async getAdminOfBoard({commit}, {boardId}){
            const USER_ID = store.state.authModule.userId;
            await instance.get(`user/${USER_ID}/boards/${boardId}`)
            .then(reponse => {
                commit('setBoardAdmin', {adminId: reponse.data.owner.id});
            })
        },
        async getUsersList({commit, dispatch}){
            const BOARD_ID = store.state.statusModule.boardId;

            await instance.get(`boards/${BOARD_ID}/users`)
            .then(response => {
                commit('setUserList', {userList: response.data});
                dispatch('modalModule/openModalForManageUsers', null,{root: true});
            })
        },
        async axiosSearchUsers({commit}, {email}){
            await instance.get(`users/match/?email=${email}`)
            .then(response =>{
                commit('setSearchUserList', {searchUserList: response.data.items});
            })
        },
        async axiosAddUserToBoard({dispatch},{userId}){
            const BOARD_ID = store.state.statusModule.boardId;

            await instance.post(`boards/${BOARD_ID}/users`, {formData: {ids: [userId]}})
            .then(() => dispatch('getUsersList'));
        },
        async axiosDeleteUserFromBoard({dispatch}, {userId}){
            const BOARD_ID = store.state.statusModule.boardId;
            await instance.delete(`/boards/${BOARD_ID}/users/${userId}`)
            .then(() => dispatch('getUsersList'));
        },


        async axiosGetPermissionsForBoards({commit}, {boardId, ownerId}){
            const CURRENT_USER_ID = localStorage.getItem('userId');
            
            if (ownerId == CURRENT_USER_ID){
                await instance.get(`boards/${boardId}/permissions`)
                .then(response => {
                    commit('setAllPermissions', {allPermissionsList: response.data});
                    commit('setCurrentUserPermissions', {currentUserPermissions: reponse.data});
                })
            }
        },
//==============================================================================================
        async axiosGetAllPermissions({commit, state}, {boardId}){
            const CURRENT_USER_ID = localStorage.getItem('userId');

            await instance.get(`boards/${boardId}/users/${CURRENT_USER_ID}/permissions`)
            .then(response => {
                commit('setCurrentUserPermissions', {currentUserPermissions: response.data, isAdmin: false});
            })
            if(state.currentUserManagePermissions.includes('manage-board-users')){
                await instance.get(`boards/${boardId}/permissions`)
                .then(response => {
                    commit('setAllPermissions', {allPermissionsList: response.data});
                })
            }
        },
        async axiosGetUserPermissions({commit},{userId}){
            const BOARD_ID = store.state.statusModule.boardId;
            await instance.get(`boards/${BOARD_ID}/users/${userId}/permissions`)
            .then(response => {
                commit('setUserPermissions', {userPermissions: response.data, userId});
                commit('setPermissionsVisible', {permissionsVisible: true});
            })
        },
        hidePermissions({commit}){
            commit('setPermissionsVisible', {permissionsVisible: false});
        },

        //============================удаление и добавление разрешений

        async axiosDeletePermission({dispatch, state},{boardId, permission}){
            await instance.delete(`boards/${boardId}/users/${state.currentUserManageId}/permissions/${permission}`)
            .then(() => {
                dispatch('axiosGetUserPermissions', {userId: state.currentUserManageId});
            });
        },
        async axiosAddPermission({dispatch, state}, {boardId, permission}){
            await instance.put(`boards/${boardId}/users/${state.currentUserManageId}/permissions/${permission}`)
            .then(()=>{
                dispatch('axiosGetUserPermissions', {userId: state.currentUserManageId});
            })
        }
    }
}

export default usersManage;