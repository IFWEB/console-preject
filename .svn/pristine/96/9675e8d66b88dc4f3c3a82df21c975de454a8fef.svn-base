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
</style>
<template>
    <div class="container-section col-sm-11 col-md-12" id="containerSection">
        <page-head p-title="业务管理&nbsp;&nbsp;/&nbsp;&nbsp;债权管理/&nbsp;&nbsp;真实债券管理"></page-head>
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
        <table-comp :server="tableDB" :titles="tableTitle" :filter="tableFilter" :list="tableData">
        </table-comp>
    </div>
</template>
<script>
import pageHead from '@/components/pageHead.vue';
import tableComp from '@/components/table/table.vue';
import datepicker from '@/components/datepicker/date.vue';
import Util from '@/assets/libs/util';
var that = null,
    firstComponent = 0;
export default {
    data: function() {
        that = this;
        return {
            dateFrom: '',
            dateTo: '',
            pagecur: 1,
            pageall: 10,
            tableFilter: {},
            tableDB: {
                url: '/newconsole/consoleapi/table',
                type: 'get'
            },
            tableData:[],
            tableTitle: [{
                name: "债权标识",
                id: 'total_amount'
            }, {
                name: "债权状态",
                id: 'day_dq_investors'
            }, {
                name: "借款标题",
                id: 'day_hqb_ransom_investors'
            }, {
                name: "借款人姓名",
                id: 'day_zqzr_amount'
            }, {
                name: "债权人姓名",
                id: 'day_dq_amount'
            }, {
                name: "债权人账号",
                id: 'day_hqb_investors'
            }, {
                name: "起息日期",
                id: 'total_investors'
            }, {
                name: "到期日期",
                id: 'day_hqb_amount'
            }, {
                name: "债权年利率",
                id: 'day_zqzr_investors'
            }, {
                name: "债权本金",
                id: 'day_amount'
            }, {
                name: "还款方式",
                id: 'day_investors'
            }, {
                name: "关联理财产品",
                id: 'total_registraters'
            }, {
                name: "生成时间",
                id: 'day_hqb_ransom_amount'
            }]
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
            Util.ajax(
                this.tableDB.url, {
                    pageNo: pageNo,
                    pageSize: pageSize
                },
                this.tableDB.type,
                function(res) {
                    if (res.code === 0) {
                        var data=res.data||{};
                        // if (data.pages > 1) {
                            that.tableData=data.realTimesData.h5;
                            addcomponent && require(['@/components/table/table.vue'], resolve);
                        // }
                    } else {
                        alert(res.message);
                    }
                }
            );
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
        pagination: function(resolve) {
            //异步组件写法
            if (firstComponent === 0) {
                firstComponent++;
            }
        }
    },
}
</script>
