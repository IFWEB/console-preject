<style lang="sass">
.search-items{
  label{
    margin-bottom: 0;
    line-height: 24px;
    font-size: 14px;
    font-weight: normal;
    text-align: right;
    margin-right: 10px;
  }
  .columns{
    display: inline-block;
  }
}
.column {
    display: block;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    padding-top: 5px;
    p{
        margin:0;
    }
    .control {
        position: relative;
        text-align: left;
        &.has-addons {
            display: inline-block;
        }
    }
    input,select{
        width: 150px;
        height: 24px;
    }
    label{
        width: 100px;
        margin-bottom: 0;
        line-height: 24px;
        font-size: 14px;
        font-weight: normal;
        text-align: right;
        margin-right: 10px;
    }
}
.buttons{
  display:inline-block;
  margin: 15px 0;
  .btn-search{
    margin: 0 10px 0 44px;
  }
}
.table{
  width:85%;
  overflow: auto;
  text-align: center;
  thead th{
    background: #edf4ff;
    text-align: center;
  }
  td,th{
    height: 28px;
    padding: 0 10px;
    border: 1px solid #e2e7ef;
    white-space: nowrap;
  }
}
.total-money{
  color: #f00;
}
.debt-money{
  margin-right:20px;
}
.page-bar{
  display: inline-block;
}
.fa{
  margin-right: 5px;
}
</style>

<template>
	<div class="container-section col-sm-11 col-md-12" id="containerSection">
    <page-head p-title="系统管理&nbsp;&nbsp;/&nbsp;&nbsp;角色管理/&nbsp;&nbsp;用户组管理"></page-head>
    <tabs :tabslist="tabListData" :defaultIndex="0" @tabClick="tabClick">
      <tab-pane label="参考数据" selected>
        <div class="search-items">
          <div class="columns">
            <label class="button is-info">生成时间</label>
            <datepicker @change="changeFrom"></datepicker>
            <span>至</span>
            <datepicker @change="changeTo"></datepicker>
          </div>
          <div class="buttons">
            <button class="btn btn-primary btn-search"><i class="fa fa-search"></i>搜 索</button>
            <button class="btn btn-primary "><i class="fa fa-repeat"></i>刷 新</button>
          </div>
        </div>
        <div class="table">
          <table>
            <thead>
              <th>序号</th>
              <th>债权标识</th>
              <th>债权状态</th>
              <th>借款标题</th>
              <th>债权ID</th>
              <th>借款人姓名</th>
              <th>债权人姓名</th>
              <th>债权人账号</th>
              <th>起息日期</th>
              <th>到期日期</th>
              <th>债权年利率</th>
              <th>债权本金</th>
              <th>还款方式</th>
              <th>关联理财产品</th>
              <th>生成时间</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>理财计划</td>
                <td>还款中</td>
                <td>种植贷D07050701</td>
                <td>XN00000001</td>
                <td>张三</td>
                <td>李四</td>
                <td>nfd_xxxxxx</td>
                <td>2017-05-09</td>
                <td>2017-08-09</td>
                <td>7.2%</td>
                <td>100.00</td>
                <td>每月付息，到期还本</td>
                <td>理财计划17050901</td>
                <td>2017-05-08</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="debt-footer">
          <p class="debt-tip">注：运营同事需注意观察当天的参考数据【待发债权价值】，必须处理成为“0“。</p>
          <pagination :cur.sync="pagecur" :all.sync="pageall" @btnClick="pageBtnClick"></pagination>
        </div>
      </tab-pane>
      <tab-pane label="债权详情">
        <div class="search-items">
          <div class="columns">
              <div class="column">
                  <p class="control has-addons">
                      <label class="button is-info">借款标题</label>
                      <input type="text" class="input form-input">
                  </p>
                  <p class="control has-addons">
                      <label class="button is-info">债权ID</label>
                      <input type="text" class="input form-input">
                  </p>
                  <p class="control has-addons">
                      <label class="button is-info">借款人姓名</label>
                      <input type="text" class="input form-input">
                  </p>
              </div>
              <div class="column">
                  <p class="control has-addons">
                      <label class="button is-info">借款人账号</label>
                      <input type="text" class="input form-input">
                  </p>
                  <p class="control has-addons">
                      <label class="button is-info">关联理财产品</label>
                      <input type="text" class="input form-input">
                  </p>
                  <p class="control has-addons">
                      <label class="button is-info">债权标识</label>
                      <select class="form-input">
                          <option>General enquiry</option>
                      </select>
                  </p>
              </div>
              <div class="column">
                  <p class="control has-addons">
                      <label class="button is-info">还款方式</label>
                      <select class="form-input">
                          <option>General enquiry</option>
                      </select>
                  </p>
                  <p class="control has-addons">
                      <label class="button is-info">债权状态</label>
                      <select class="form-input">
                          <option>General enquiry</option>
                      </select>
                  </p>
                  <p class="control has-addons">
                      <label class="button is-info">生成时间</label>
                      <datepicker @change="changeFrom"></datepicker>
                      <span>至</span>
                      <datepicker @change="changeTo"></datepicker>
                  </p>
              </div>
          </div>
          <div class="buttons">
            <button class="btn btn-primary btn-search"><i class="fa fa-search"></i>搜 索</button>
            <button class="btn btn-primary"><i class="fa fa-sign-out"></i>导 出</button>
          </div>
        </div>
        <div class="table">
          <table>
            <thead>
              <th>序号</th>
              <th>债权标识</th>
              <th>债权状态</th>
              <th>借款标题</th>
              <th>债权ID</th>
              <th>借款人姓名</th>
              <th>债权人姓名</th>
              <th>债权人账号</th>
              <th>起息日期</th>
              <th>到期日期</th>
              <th>债权年利率</th>
              <th>债权本金</th>
              <th>还款方式</th>
              <th>关联理财产品</th>
              <th>生成时间</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>理财计划</td>
                <td>还款中</td>
                <td>种植贷D07050701</td>
                <td>XN00000001</td>
                <td>张三</td>
                <td>李四</td>
                <td>nfd_xxxxxx</td>
                <td>2017-05-09</td>
                <td>2017-08-09</td>
                <td>7.2%</td>
                <td>100.00</td>
                <td>每月付息，到期还本</td>
                <td>理财计划17050901</td>
                <td>2017-05-08</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="debt-footer">
          <span class="debt-money">债权总金额：<i class="total-money">12346.00</i>元</span>
          <pagination :cur.sync="pagecur" :all.sync="pageall" @btnClick="pageBtnClick"></pagination>
        </div>
      </tab-pane>
    </tabs>
	</div>
</template>
<script>
  import pageHead from '@/components/pageHead';
  import tabs from '@/components/tabs/tabs';
  import tabPane from '@/components/tabs/tabpane';
  import Util from '@/assets/libs/util';
  import datepicker from '@/components/datepicker/date';
  var that = null,
      firstComponent = 0;
	export default {
    data: function(){
      that = this;
      return{
        tabListData:[{
          id: 0,
          tabname: "参考数据",
          actived: true
        },
        {
          id: 1,
          tabname: "债权详情",
          actived: false
        }],
        dateFrom:'',
        dateTo:'',
        pagecur: 1,
        pageall: 10
      }
    },
    beforeRouteEnter: function(to, from, next) {
      next(vm => {
      // 通过 `vm` 访问组件实例
          if(firstComponent > 1){
              vm.loadPaginationData(1, 10);
          }
          firstComponent++;
      })
    },
    methods: {
      loadPaginationData: function (pageNo, pageSize, resolve, addcomponent){
        Util.ajax(
          '/newconsole/consoleapi/user/roles',
          {
              pageNo: pageNo,
              pageSize: pageSize
          },
          'get',
          function(res){
            if(res.code === 0){
              var data = res.data;
              that.backupResult = that.userlist = data.data;
              that.pageall = data.pages;
              that.pagecur = data.pageNum;
              if(data.pages > 1){
                  addcomponent && require(['@/components/pagination.vue'], resolve);
              }
            }else{
              alert(res.message);
            }
          }
        );
      },
      changeFrom: function(date){
        this.dateFrom = date
      },
      changeTo: function(date){
        this.dateTo = date
      },
      pageBtnClick: function(data){
        // 翻页请求数据
        this.loadPaginationData(data, 10);
      },
      tabClick: function(id){
        return id
      }
    },
    components: {
        pageHead, tabs, tabPane, datepicker,
        pagination: function (resolve) {
            //异步组件写法
            if(firstComponent === 0){
                firstComponent ++;
                that.loadPaginationData(1, 10, resolve, true);
            }
        }
    }
  }
</script>