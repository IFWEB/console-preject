<template>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-blue navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">理财农场后台管理系统</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li v-for='item in navList' :class='checkActive(item.path,item)'><router-link :to="item.pathStr">{{item.title}}</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/login">退出登录</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
module.exports = {
  props:['rList'],
  data: function() {
    var allData=this.getPath();
    return {
      path: allData.path,
      navList:this.rList
    };
  },
  watch:{
    '$route':function (to, from) {
      var allData=this.getPath();
      this.path=allData.path;
      this.sideBar=allData.children;
    }
  },
  methods:{
    getPath:function(){
      var allPath = this.$route.path.match(/^\/([\w]*)(\/|$)/),
          _id=allPath?allPath[1]:'',
          list=this.rList,
          result=null;
      for (var i = 0,len=list.length; i < len; i++) {
        var item =list[i];
        item.pathStr='/'+(item.path||'');
        if(item.path===_id){
          result= item;
        }
      }
      /*{
          "path": "user",
          "pathStr": "/user",
          "component": "./pages/index/default/side_bar.vue",
          "children": [{
              "path": "",
              "component": "./pages/index/default/main.vue"
          }, {
              "path": "2",
              "component": "./pages/index/default/main.vue"
          }]
      }*/
      this.$emit('showSide',result.children);
      return result;
    },
    checkActive:function(id,opt){
      return {active:this.path===id};
    }
  }
}
</script>

<style>
.navbar-blue{
    background-color: #4778c7;
}
.navbar-blue li a:hover,.navbar-blue li a:hover{
    background-color: #5285d7;
}
.navbar-blue .navbar-nav{
    color:#fff;
}
.navbar-blue .navbar-nav>li>a {
    color: #fff;
}

.navbar-blue .navbar-nav>li>a:focus,.navbar-nav>li>a:hover {
    background: #5285d7
}

.navbar-blue .navbar-nav>li.active>a {
    background: #5d91e5
}
.navbar-blue .navbar-brand {
    color: #fff;
}
</style>

