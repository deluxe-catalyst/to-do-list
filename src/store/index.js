import {createStore} from "vuex";
import boardsModule from "@/store/modules/boardsModule.js";
import authModule from "@/store/modules/authModule.js";
import statusModule from "@/store/modules/statusModule.js"
import modalModule from "@/store/modules/modalModule.js"
import animationModule from "./modules/animationModule";
import usersManage from "@/store/modules/usersManage.js"

const store = createStore({
  modules: {
    boardsModule,
    authModule,
    statusModule,
    modalModule,
    animationModule,
    usersManage
  },
});

export default store;
