<style lang="sass">
.column {
    display: block;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    padding-top: 5px;
    margin-bottom: 15px;
    p {
        margin: 0;
    }
    .control {
        position: relative;
        text-align: left;
        &.has-addons {
            display: inline-block;
        }
    }
    input,
    select {
        //border-radius: 0 3px 3px 0;
        width: 150px;
        height: 24px;
    }
    label {
        width: 100px;
        margin-bottom: 0;
        line-height: 24px;
        font-size: 14px;
        font-weight: normal;
        text-align: right;
        margin-right: 10px;
    }
}
.buttons {
    margin: 15px 0;
    .btn-search {
        margin: 0 10px 0 44px;
    }
}

.total-money {
    color: #f00;
}

.debt-money {
    margin-right: 20px;
}

.page-bar {
    display: inline-block;
}

.fa {
    margin-right: 5px;
}
.bolock-diliver{
    height: 50px;
}
.main-table th:first-child{
    border:none;
}
.no-boder{
    border:none;
}
</style>
<template>
    <div class="container-section col-sm-11 col-md-12" id="containerSection">
        <page-head p-title="平台及用户分析&nbsp;&nbsp;/&nbsp;&nbsp;概况/&nbsp;&nbsp;平台总况（实时）"></page-head>

        <div class="search-items">
            <div class="column">
                <div class="control has-addons">
                    <label class="button is-info">实时数据</label>
                    <span class="button is-info">{{latestTable.realTime}}</span>
                </div>
                <div class="control has-addons">
                    <label class="button is-info">平台</label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" v-for="item in tabs" :class="{'btn-primary': latestTable.type === item.type}" @click="latestTable.type = item.type;loadPaginationData(1, 10)">{{item.name}}</button>
                    </div>
                </div>
            </div>
        </div>
        <table-comp :server="latestTable.tableDB" :titles="tableTitle" :filter="latestTable.tableFilter" :list="latestTable.tableData" :pageshide="latestTable.pageshide">
            <tr slot="customizeTh">
                <th class="no-boder"></th>
                <th ></th>
                <th colspan="5">总况</th>
                <th colspan="8">产品成交</th>
            </tr>
        </table-comp>
        
        <div class="bolock-diliver"></div>

        <div class="search-items">
            <div class="columns">
                <div class="column">
                    <div class="control has-addons">
                        <label class="button is-info">日期区间</label>
                        <datepicker @change="changeFrom"></datepicker>
                        <span>至</span>
                        <datepicker @change="changeTo"></datepicker>
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">&nbsp;&nbsp;天&nbsp;&nbsp;</button>
                            <button type="button" class="btn btn-default">小时</button>
                        </div>
                    </div>
                    <div class="control has-addons">
                        <label class="button is-info">平台</label>
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">全部</button>
                            <button type="button" class="btn btn-default">APP</button>
                            <button type="button" class="btn btn-default">H5</button>
                            <button type="button" class="btn btn-default">PC</button>
                        </div>                        
                    </div>
                    <div class="control has-addons">
                        <label class="button is-info"></label>
                        <button class="btn btn-primary"><i class="fa fa-sign-out"></i>导出CSV</button>
                    </div>
                </div>
            </div>
        </div>
        <table-comp2 :server="searchTable.tableDB" :titles="tableTitle" :filter="searchTable.tableFilter" :list="searchTable.tableData">
            <tr>
                <th></th>
                <th colspan="5">总况</th>
                <th colspan="8">产品成交</th>
            </tr>
        </table-comp2>
    </div>
</template>
<script>

import pageHead from '@/components/pageHead.vue';
import tableComp from '@/components/table/table.vue';
import tableComp2 from '@/components/table/table.vue';
import datepicker from '@/components/datepicker/date.vue';
import Util from '@/assets/libs/util';
import Ajax from 'assets/js/ajax.js';

var that = null,
    firstComponent = 0;
export default {
    data: function() {
        that = this;
        return {
            tabs:[{
                    name: '全部',
                    type: 'all'
                },
                {
                    name: 'APP',
                    type: 'app'
                },
                {
                    name: 'H5',
                    type: 'h5'
                },
                {
                    name: 'PC',
                    type: 'pc'
                },
            ],
            dateFrom: '',
            dateTo: '',
            tableTitle: [
                {
                    name: "时点",
                    id: 'latest_day'
                },{
                    name: "累计注册用户数",
                    id: 'total_registraters'
                }, {
                    name: "累计投资用户数",
                    id: 'total_investors'
                }, {
                    name: "累计成交金额",
                    id: 'total_amount'
                }, {
                    name: "当天成交用户数",
                    id: 'day_investors'
                }, {
                    name: "当天成交金额",
                    id: 'day_amount'
                }, {
                    name: "定期产品成交人数",
                    id: 'day_dq_investors'
                }, {
                    name: "定期产品成交金额",
                    id: 'day_dq_amount'
                }, {
                    name: "债权转让成交人数",
                    id: 'day_zqzr_investors'
                }, {
                    name: "债权转让成交金额",
                    id: 'day_zqzr_amount'
                }, {
                    name: "零钱包成交人数",
                    id: 'day_hqb_investors'
                }, {
                    name: "零钱包成交金额",
                    id: 'day_hqb_amount'
                }, {
                    name: "零钱包赎回人数",
                    id: 'day_hqb_ransom_investors'
                }, {
                    name: "零钱包赎回金额",
                    id: 'day_hqb_ransom_amount'
                }
            ],
            latestTable: {
                type: 'all',
                pageshide:1,
                pagecur: 1,
                pageall: 10,
                tableFilter: {                
                },
                tableDB: {
                    url: '/newconsole/consoleapi/dataplatform/realTime',
                    type: 'get'
                },
                allInfo: undefined,//所有的数据
                realTime: undefined,//实时时间
                tableData:[],
            },
            searchTable: {
                type: 'all',
                pagecur: 1,
                pageall: 10,
                tableFilter: {                
                },
                tableDB: {
                    url: '/newconsole/consoleapi/dataplatform/dataDetails',
                    type: 'get'
                },
                tableData:[]
            }           
        }
    },
    watch: {

    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            if (firstComponent > 1) {
                vm.loadPaginationData(1, 10);
            }
            firstComponent++;
        })
    },
    methods: {
        changeFrom: function(date) {
            this.dateFrom = date
        },
        changeTo: function(date) {
            this.dateTo = date
        },
        loadPaginationData: function(pageNo, pageSize, resolve, addcomponent) {
            if(!that.latestTable.allInfo){//第一次需要从远程拉取数据
                new Ajax({
                    url: this.latestTable.tableDB.url,
                    method: this.latestTable.tableDB.type,
                    dataType: 'json',
                    data:{
                        pageNo: pageNo,
                        pageSize: pageSize
                    },
                    success: function(data) {
                        var tableInfo = that.latestTable;
                        tableInfo.allInfo = data.realTimesData;
                        tableInfo.realTime = Util.dateFormat((new Date(tableInfo.allInfo.realTime)),"yyyy年MM月d日 h:m:s");
                        tableInfo.tableData = tableInfo.allInfo.all;
                        tableInfo.tableData[0].latest_day = '今日';
                        tableInfo.tableData[1].latest_day = '昨日';
                        addcomponent && require(['@/components/table/table.vue'], resolve);
                    },
                    dataError: function(code, err) {
                        if (code === 1003) {
                            location.href = 'login.html#/login';
                        }
                        alert(err);
                    },
                    error: function(code, err, url) {
                        alert(code + "\n" +
                            url + "\n" +
                            err);
                    }
                });
            }else{
                var tableInfo = that.latestTable;
                tableInfo.tableData = tableInfo.allInfo[that.latestTable.type];
                tableInfo.tableData[0].latest_day = '今日';
                tableInfo.tableData[1].latest_day = '昨日';
                addcomponent && require(['@/components/table/table.vue'], resolve);
            }
        },
        loadPaginationData2: function(pageNo, pageSize, resolve, addcomponent) {
            new Ajax({
                url: this.searchTable.tableDB.url,
                method: this.searchTable.tableDB.type,
                dataType: 'json',
                data:{
                    pageNo: pageNo,
                    pageSize: pageSize
                },
                success: function(data) {
                    that.searchTable.tableData=data.realTimesData.all;
                    that.searchTable.tableData[0].latest_day = '今日';
                    that.searchTable.tableData[1].latest_day = '昨日';
                    addcomponent && require(['@/components/table/table.vue'], resolve);
                },
                dataError: function(code, err) {
                    if (code === 1003) {
                        location.href = 'login.html#/login';
                    }
                    alert(err);
                },
                error: function(code, err, url) {
                    alert(code + "\n" +
                        url + "\n" +
                        err);
                }
            });
        },
        filterRole: function() {
            this.seachResult = [];
            this.userlist = this.backupResult;
            for (var i = 0, len = this.userlist.length; i < len; i++) {
                var item = this.userlist[i],
                    name = item.roleName;
                if (name.indexOf(this.searchRole) > -1) {
                    this.seachResult.push(item);
                }
            }
            this.userlist = this.seachResult;
        }
    },
    components: {
        pageHead,
        datepicker,
        tableComp: function(resolve) {
            that.loadPaginationData(1, 10, resolve, true);
        },
        tableComp2: function(resolve) {
            that.loadPaginationData2(1, 10, resolve, true);
        },
        pagination: function(resolve) {
            //异步组件写法
            if (firstComponent === 0) {
                firstComponent++;
            }
        }
    },
}

</script>
