<template>
    <div class="container-fluid side-bar-cont">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li v-for="(item,no) in sideList" :class="checkActive(item.path)">
            <router-link :to="makePath(item.path)" v-if="item.path!==undefined">{{item.title}}</router-link>
            <a v-else>{{item.title}}</a>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
module.exports = {
  props:['sideList'],
  data: function() {
    return {path:this.getNowPath()};
  },
  watch:{
    '$route':function (to, from) {
      this.path=this.getNowPath();
    }
  },
  methods:{
    getNowPath:function(){
      var allPath = this.$route.path.match(/^\/([\w]*)\/([\w]*)(\/|$)/),
          result='';
      if (allPath&&allPath.length>0) {
        if (allPath.length>1) {
          return allPath[2];
        }
      }
      return result;
    },
    makePath:function(_path){
      var allPath = this.$route.path.split('/'),
          result='/';
      if (allPath&&allPath.length>0&&allPath[1]) {
        result+=allPath[1]+'/';
      }
      result+=_path;
      return result;
    },
    checkActive:function(id){
      return {active:(this.path===id&&typeof this.path!=='undefined')};
    }
  }
}
</script>

<style>
</style>

