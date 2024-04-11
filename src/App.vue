<script>
import {RouterView} from 'vue-router';
import {mapActions, mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters({
      boardsGetter: 'boardsModule/boards',
      tokenGetter: 'authModule/token',
      userIdGetter: 'authModule/userId',
    })
  },
  methods:{
    ...mapActions({
      axiosBoards: 'boardsModule/axiosBoards',
      setAuth: 'authModule/addInfoFromLocalStorage',
    }),
  },
  async created (){
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId');
    if(this.token){
      this.axiosBoards({userId: this.userId, token: this.token});
      this.setAuth({userId: this.userId, token: this.token});
      return;
    }
    this.$router.replace('/auth');
  }
}
</script>

<template>
    <RouterView>
    </RouterView>
</template>

<style scoped>

</style>