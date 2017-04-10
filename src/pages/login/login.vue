<template>
    <div class="login-section">
        <form class="form-horizontal">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                    <input type="text" name="user" class="form-control" id="inputEmail3" placeholder="请输入用户名">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
                <div class="col-sm-10">
                    <input type="password" name="password" class="form-control" id="inputPassword3" placeholder="请输入密码">
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button  v-on:click="hide" type="button" class="btn btn-default js-btn-login" >登陆</button>
                    <button type="button" class="btn btn-default js-btn-register">注册</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>

module.exports = {
	data: function() {
        return {
            msg: '登陆'
        };
    },
    methods: {
    	hide: function() {
    	$('.login-section').hide();
    	}
    }
}



</script>

<style>

.login-section {
	width: 500px;
	margin:100px auto;
}
</style>