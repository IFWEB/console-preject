<script>
import myDatepicker from './vuedatepicker'

export default {
  data () {
  return {
      startTime: {
        time: ''
      },
      endtime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六', '日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD',
        color: {
          checked: '#F50057',
          header: '#6495ED',
          headerText: '#fff'
        },
        placeholder: '',
        inputStyle: {},
        buttons: {
          // ok: 'Ok',
          // cancel: 'Cancel'
        },
        overlayOpacity: 0.2, // 0.5 as default
        dismissible: true // as true as default
      }
      // ,
      // timeoption: {
      //   type: 'min',
      //   week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      //   month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      //   format: 'YYYY-MM-DD HH:mm'
      // },
      // multiOption: {
      //   type: 'multi-day',
      //   week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      //   month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      //   format:"YYYY-MM-DD HH:mm"
      // },
      // limit: [{
      //   type: 'weekday',
      //   available: [1, 2, 3, 4, 5]
      // },{
      //   type: 'fromto',
      //   from: '2016-02-01',
      //   to: '2016-02-20'
      // }]
    }
  },
  components: {
    'date-picker': myDatepicker
  },
  methods: {
    "change": function(date){
      console.log(date);
      this.$emit('change', date);
    }
  }
}

</script>

<template>
  <div class="card">
      <date-picker :date="endtime" :option="option" @change="change"></date-picker>
  </div>
<!--
  <div class="card">
    <div class="row">
      <date-picker :time.sync="starttime" :option="option" :limit="limit"></date-picker>禁止选择日期
    </div>
    <div class="row">
      <date-picker :time.sync="endtime" :option="option"></date-picker>返回日期
    </div>
    <div class="row">
      <date-picker :time.sync="testTime" :option="timeOption"></date-picker>返回日期加时间
    </div>
    <div class="row">
      <date-picker :time.sync="testTime" :option="multiOption"></date-picker>返回多个日期
    </div>
  </div> -->
</template>
<style>
  .card{
    position: relative;
    display: inline;
  }
</style>