<style>
.main-section {
    color: green;
}
</style>
<template>
    <div class="container-section col-sm-9 col-md-10" id="containerSection">
        <page-head p-title="系统管理&nbsp;&nbsp;/&nbsp;&nbsp;角色管理"></page-head>
        <button @click="show('pc')">pc</button>
        <button @click="show('h5')">h5</button>
        <button @click="show('xt')">xt</button>
        <table>
            <tr v-for="(item,index) in items">
                <td></td>
            </tr>
        </table>
    </div>
</template>
<script>
var Ajax=require('assets/js/ajax.js');
import pageHead from '@/components/pageHead';
import datepicker from '@/components/datepicker/date.vue';
module.exports = {
    data: function() {
        return {
            msg: '',
            date: [''],
            items: [{
                a: 1,
                b: 1
            }, {
                a: 2,
                b: 2
            }]
        }
    },
    methods: {
        show: function(type) {
            new Ajax({url:'',method:'GET'});
            var a = {
                'pc': [{
                    a: 1,
                    b: 2
                }, {
                    a: 1,
                    b: 2
                }],
                'h5': [{
                    a: 1,
                    b: 2
                }, {
                    a: 1,
                    b: 2
                }],
                'xt': [{
                    a: 1,
                    b: 2
                }, {
                    a: 1,
                    b: 2
                }]
            }
            this.items=a[type];
            return false;
        },
        change: function(date) {
            this.date = date
        }
    },
    components: {
        pageHead,
        datepicker
    }
}
</script>
