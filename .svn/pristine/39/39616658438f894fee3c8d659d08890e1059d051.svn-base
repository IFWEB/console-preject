<template>
    <div class="search-items">
        <div class="columns">
            <div v-for="row in rowsCount" class="column">
                <div v-for="item in computSearch[row]" class="control has-addons">
                    <label class="is-info">{{item.name}}</label>
                    <input v-if="item.type==='text'" type="text" class="input form-input">
                    <select v-if="item.type==='select'" class="form-input">
                        <option>General enquiry</option>
                    </select>
                    <div v-if="item.type==='times'" style="display: inline-block">
                        <datepicker @change="changeFrom"></datepicker>
                        <span>至</span>
                        <datepicker @change="changeTo"></datepicker>
                    </div>
                    <datepicker v-if="item.type==='time'" @change="changeFrom"></datepicker>
                </div>
            </div>
        </div>
        <div class="buttons">
            <button v-for="item in buttons" class="btn btn-primary" :class="[item.icon!==''?'btn-'+item.icon: '']">
                <i v-if="item.icon !== ''" class="fa" :class="showIcon?'fa-'+item.icon:''"></i>
                {{item.name}}
            </button>
        </div>
    </div>
</template>
<script>
import datepicker from '@/components/datepicker/date';

export default {
    props: {
        itemOptions: {
            type: Object,
            default: function() {
                return {
                    colCount: 3,
                    searchItems: [],
                    buttons: []
                }
            }
        }
    },
    data: function(){
        return {
            showIcon: true,
            dateFrom:'',
            dateTo:'',
            colCount: this.itemOptions.colCount,
            searchItems: this.itemOptions.searchItems,
            buttons: this.itemOptions.buttons
        }
    },
    computed: {
        rowsCount: function(){
            let rest = this.searchItems.length % 3,
                count = this.searchItems.length / 3;

            if(rest > 0){
                count = count + 1
            }
            console.log(count);
            return count
        },
        computSearch: function(){
            let search = {},
                num = 1
            search[num] = []
            for(let i = 0, len = this.searchItems.length; i < len; i++){
                if(i > 0 && i % this.colCount === 0){
                    num ++
                    search[num] = []
                }
                search[num].push(this.searchItems[i]);
            }
            return search
        }
    },
    methods: {
        changeFrom: function(date){
            this.dateFrom = date
        },
        changeTo: function(date){
            this.dateTo = date
        }
    },
    components: {
        datepicker
    }
}
</script>
<style lang="sass">
.search-items{
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
            //border-radius: 0 3px 3px 0;
            width: 150px;
            height: 24px;
        }
        label.is-info{
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
        margin: 15px 0;
        .btn-search{
            margin: 0 10px 0 44px;
        }
    }
}
</style>