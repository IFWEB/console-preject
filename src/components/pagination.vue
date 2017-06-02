<template>
    <div class="page-bar">
        <ul class="pagination">
            <li :class="setButtonClass(0)"><a v-on:click="prvePage(cur)">&laquo;</a></li>
            <li v-for="index in indexs"  v-bind:class="{ active: currNum == index }">
                <a v-on:click="btnClick(index)">{{ index < 1 ? "..." : index }}</a>
            </li>
            <li :class="setButtonClass(1)"><a v-on:click="nextPage(cur)">&raquo;</a></li>
            <li>第<i class="total-pages" v-text="currNum"></i>页/共<i class="total-pages" v-text="all"></i>页</li>
        </ul>
    </div>
</template>
<script>
    export default{
        data: function(){
            return {
                currNum: this.cur
            }
        },
        props: ['cur', 'all'],
        computed: {
            indexs: function () {
                var left = 1
                var right = this.all
                var ar = []
                if (this.all >= 8) {
                    if (this.currNum > 3 && this.currNum < this.all-3) {
                        console.log("111");
                        left = this.currNum - 3
                        right = this.currNum + 3
                    } else {
                        if (this.currNum <= 3) {
                            left = 1
                            right = 7
                        } else {
                            right = this.all
                            left = this.all - 6
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                if (ar[0] > 1) {
                    ar[0] = 1;
                    ar[1] = -1;
                }
                if (ar[ar.length - 1] < this.all) {
                    ar[ar.length - 1] = this.all;
                    ar[ar.length - 2] = 0;
                }
                return ar
            }
        },
        methods: {
            btnClick: function (data) {
                if (data < 1) return;
                if (data != this.currNum) {
                    this.currNum = data
                    this.$emit('btnClick', data)
                }
            },
            nextPage: function (data) {
                if (this.currNum >= this.all) return;
                this.btnClick(this.currNum + 1);
            },
            prvePage: function (data) {
                if (this.currNum <= 1) return;
                this.btnClick(this.currNum - 1);
            },
            setButtonClass: function (isNextButton) {
                if (isNextButton) {
                    return this.currNum >= this.all ? "disabled" : ""
                }
                else {
                    return this.currNum <= 1 ? "disabled" : ""
                }
            }
        }
    }

</script>

<style>
    .pagination li a{
        cursor: pointer;
    }
    .pagination li:nth-last-child(2) a{
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: 1px solid #ddd;;
    }
    .pagination li:last-child a{
        margin-left: 2px;
        border: none;
    }
    .pagination li.active a,.pagination li.active a:focus,.pagination li.active a:hover,.pagination li a:focus{
        background-color: #cde0ff;
        border-color: #cde0ff;
        color: #51535b;
    }
    .pagination li:last-child{
        padding-left: 10px;
        line-height: 33px;
        cursor:auto;
    }
    .pagination li:last-child a:hover{
        z-index: 3;
        color: #337ab7;
        background-color: #fff;
        border-color: #fff
    }
    .total-pages{
        padding: 0 5px;
    }
</style>