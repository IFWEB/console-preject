<template>
  <div class="component-tab">
  	<div class="tabs is-layout-top">
			<ul class="tab-list is-flex">
				<li v-for="(item,index) in tabslist" :attr="item.tabname" class="is-flex" @click="tabClick(item)" :class="{'is-active':isActived(item.id)}">
					<a class="is-unselectable">
						<span v-text="item.tabname"></span>
					</a>
				</li>
			</ul>
      <div class="tab-content is-flex">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
	export default {
    props:
    {
      tabslist: Array,
      defaultIndex: {
        type: Number,
        default: 0
      },
      animation: {
        type: String,
        default: 'fade'
      },
      onlyFade: {
        type: Boolean,
        default: true
      }
    },
    data: function(){
      return{
        tabClickIndex: this.defaultIndex,
        tabPanes: []
      }
    },
    methods: {
      tabClick: function(item){
        this.$emit("tabClick", item.id);
        this.tabClickIndex = item.id;
      },
      isActived: function(id) {
        return id === this.tabClickIndex
      }
    }
  }
</script>
<style lang='sass'>
.tabs{
  &.is-layout-top {
    flex-direction: column;
  }
  .tab-list {
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-pack: start;
    justify-content: flex-start;
    a {
      -ms-flex-align: center;
      align-items: center;
      border-bottom: 1px solid #dbdbdb;
      color: #4a4a4a;
      font-size: 15px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      margin-bottom: -1px;
      padding: 5px 12px;
      width: 100px;
      vertical-align: top;
      border: 1px solid transparent;
      border-radius: 3px 3px 0 0;
    }
    a:hover {
      background-color: #f5f5f5;
      border-bottom-color: #dbdbdb;
    }
    li.is-active a {
      background-color: #fff;
      border-color: #dbdbdb;
      border-bottom-color: transparent!important;
    }
    li{
      display: block;
      cursor: pointer;
    }
    li.is-active a {
      border-bottom-color: #00d1b2;
      color: #5d91e5;
    }
  }
  .tab-content {
    flex-direction: column;
    overflow: hidden;
    position: relative;
    margin: 10px;
    flex: 1 1;
  }

  .tabpane {
    width: 100%;
    flex: 1 1;

    &.is-active {
      transform: translateZ(0);
    }

    &[class*="Out"] {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(0);
      transform: translateY(0);
    }
  }
}

.is-flex {
    display: -ms-flexbox;
    display: flex;
}
ul {
    list-style: none;
}
.is-flex {
    display: -ms-flexbox;
    display: flex;
}
.is-unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>