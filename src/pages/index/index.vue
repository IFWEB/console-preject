<template>
    <div>
        <nav-bar :r-list="routeList" @show-side="refreshSide"></nav-bar>
        <router-view :side-list="sideList"></router-view>
    </div>
</template>
<script>

var NavBar = require('./nav_bar.vue');

module.exports = {
    props:['appList'],
    data:function(){
        var item = this.getPath();
        // console.log(item)
        return {routeList:this.appList,sideList:item.children};
    },
    components: {
        NavBar
    },
    watch:{
        '$route':function (to, from) {
            var item = this.getPath();
            this.sideList=item.children;
        }
    },
    methods:{
        getPath:function(){
          var allPath = this.$route.path.match(/^\/([\w]*)(\/|$)/),
              _id=allPath?allPath[1]:'',
              list=this.appList,
              result=null;
        // console.log(list)
          for (var i = 0,len=list.length; i < len; i++) {
            var item =list[i];
            item.pathStr='/'+(item.path||'');
            if(item.path===_id){
              result= item;
            }
          }
          return result;
        },
        refreshSide:function (list) {
            this.sideList=list;
        }
    }
}

</script>
<style>
.nav {
    color: red;
}
</style>
