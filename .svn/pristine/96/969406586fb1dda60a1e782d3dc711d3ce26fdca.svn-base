<style lang='sass'>
.main-table {
    width: 85%;
    overflow: auto;
    text-align: center;
    thead th {
        background: #edf4ff;
        text-align: center;
    }
    td,
    th {
        height: 28px;
        padding: 0 10px;
        border: 1px solid #e2e7ef;
        white-space: nowrap;
    }
}
</style>
<template>
    <div>
        <div class="main-table">
            <table class="tabel table-striped">
                <thead>
                    <th v-for='title in titles'>{{title.name}}</th>
                </thead>
                <tbody>
                    <tr v-for='item in list'>
                        <td v-for='ti in titles'>{{item[ti.id]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="debt-footer">
            <!-- <span class="debt-money">债权总金额：<i class="total-money">12346.00</i>元</span> -->
            <pagination :cur.sync="pageInfo.pageNo" :all.sync="pageInfo.pageCount" @btnClick="pageBtnClick"></pagination>
        </div>
    </div>
</template>
<script>
import Util from '@/assets/libs/util';
import pagination from '@/components/pagination.vue';
// import Ajax from '@/assets/js/ajax.js';

var that = null,
    firstComponent = 0;
export default {
    props: {
        server: {
            type: Object,
            default: function() {
                return {
                    url: '',
                    type: ''
                }
            }
        },
        page: {
            type: Object,
            default: function() {
                return {
                    pageNo: 1,
                    pageSize: 20
                }
            }
        },
        titles: {
            type: Array,
            default: function() {
                return []
            }
        },
        list: {
            type: Array,
            default: function() {
                return []
            }
        },
        filter: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data: function() {
        that = this;
        console.log(this.list);
        return {
            pageInfo: {
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                pageCount:1
            },
            servers: {
                url: '',
                type: ''
            }
        }
    },
    methods: {
        loadPaginationData: function(pageNo, pageSize, resolve, addcomponent) {
            var server = this.servers,
                page = this.page;
            Util.ajax(
                server.url, {
                    pageNo: page.pageNo,
                    pageSize: page.pageSize
                },
                server.type,
                function(res) {
                    if (res.code === 0) {
                        var data = res.data;
                        that.pageInfo.pageCount = data.pages;
                        that.pageInfo.pageNo = data.pageNum;
                        // if (data.pages > 1) {
                        //     addcomponent && require(['@/components/pagination.vue'], resolve);
                        // }
                    } else {
                        alert(res.message);
                    }
                }
            );
        },
        pageBtnClick: function(pageNo) {
            this.loadPaginationData(pageNo, this.page.pageSize)
        },
        getValueByType:function(item,type){
          console.log(item,type)
        }
    },
    components: {
        pagination
    }
}
</script>
