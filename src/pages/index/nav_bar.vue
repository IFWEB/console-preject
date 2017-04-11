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
            <li :class='checkActive("default")'><router-link to="/home/default">首页</router-link></li>
            <li :class='checkActive("user")'><router-link to="/home/user">用户管理</router-link></li>
            <li :class='checkActive("business")'><router-link to="/home/business">业务管理</router-link></li>
            <li :class='checkActive("advertise")'><router-link to="/home/advertise">宣传管理</router-link></li>
            <li :class='checkActive("system")'><router-link to="/home/system">系统管理</router-link></li>
            <li :class='checkActive("finance")'><router-link to="/home/finance">财务管理</router-link></li>
            <li :class='checkActive("statistics")'><router-link to="/home/statistics">统计管理</router-link></li>
            <li :class='checkActive("promote")'><router-link to="/home/promote">推广管理</router-link></li>
            <li :class='checkActive("baseInfo")'><router-link to="/home/baseInfo">基础信息管理</router-link></li>
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
  data: function() {
    return {
      id: this.$route.params.id
    }
  },
  methods:{
    focusOn:function(){
    },
    checkActive:function(id){
      return {active:this.$route.params.id===id};
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

