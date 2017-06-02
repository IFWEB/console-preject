<template>
  <ul>
    <li v-for='item in nodeData' v-show="item.visible" :class="[(item.children && item.children.length > 0) ? '':'leaf']">
      <i v-if="item.children && item.children.length > 0"  @click.stop='handleNodeExpand(item)' :class="[item.open? 'tree-open':'tree-close','icon']">
        </i>
      <input type="checkbox" class="check" :class="{notAllNodes:item.parentSelectNotAll}" v-if="options.showCheckbox" v-model='item.checked' :attr-for="item.id" :ddattr-for="item.checked" @click.stop="handlecheckedChange(item)" />
      <span @click="handleNode(item)" :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }">{{item.label}}</span>
      <tree-node v-if="item.children && item.children.length > 0" :options="options" @handlecheckedChange="handlecheckedChange" v-show='item.open'
        :treedata="item.children"></tree-node>
    </li>
  </ul>
</template>
<script>
export default {
    name: 'treeNode',
    props: {
        treedata: [Array],
        options: [Object],
        treeNodeId: [Array],
        checkedFlag: false
    },
    data() {
        return {
            nodeData: [],
            newParentIds: [],
            treeStorage: {}
        }
    },
    watch: {
        treeNodeId: function() {
          var self= this
          var pId = []
          this.treeStorage = this.tree.store;

          this.treeStorage.datas.forEach(function (item, index, input) {
              item.checked = self.checkAllNode(item.id);
          })
          // self.checkParentStatus();
          pId = self.checkParentStatus();
          this.tree.store = this.treeStorage;
          this.nodeData = this.treeStorage.root;
          this.newParentIds = this.treeNodeId
          for(var id in pId){
            if(this.treeNodeId.indexOf(pId[id]) === -1){
              this.newParentIds = this.newParentIds.concat(pId[id]);
            }
          }
          // this.$emit('initParentNodes', this.getSelectedNodeIds());
          this.$emit('initParentNodes', this.newParentIds);

          return this.treeNodeId
        }
    },
    created() {
        const parent = this.$parent
        if (parent.isTree) {
            this.tree = parent
        } else {
            this.tree = parent.tree
        }

        const tree = this.tree
        if (!tree) {
            console.warn('找不到树节点')
        }

        this.nodeData = (this.treedata || []).slice(0)
    },
    methods: {
        getSelectedNodeIds() {
            const allnodes = this.tree.store.datas
            let selectedNodeIds = []
            for (let [, node] of allnodes) {
                if (node.checked) {
                    selectedNodeIds.push(node.id)
                }
            }
            // console.log("9999999999999");
            return selectedNodeIds
        },
        checkAllNode: function(id) {
            if (this.treeNodeId) {
                for (var i = 0, len = this.treeNodeId.length; i < len; i++) {
                    if (this.treeNodeId[i] === id) {
                        return true;
                    }
                }
            }
            return false;
        },
        checkParentStatus: function(item) {
            var pNodesId = []
            if (this.treeNodeId) {
                for (var len = this.treeNodeId.length, i = len-1; i > 0; i--) {
                    let item = this.treeNodeId[i]
                    item && this.tree.store.initParentStatus(item, pNodesId);
                }
            }
            // console.log(pNodesId);
            return pNodesId
        },
        handleNodeExpand(node) { //控制节点的展开收起
            node.open = !node.open
        },
        handlecheckedChange(node) { //控制节点的勾选
            this.$emit('handlecheckedChange', node)
        },
        handleNode(node) {
            // if (this.tree.store.last) {
            //     if (this.tree.store.last.id === node.id) {
            //         this.tree.store.last.checked = !this.tree.store.last.checked
            //     } else {
            //         this.tree.store.last.checked = false
            //         node.checked = true
            //         this.tree.store.last = node
            //     }
            // } else {
            //     this.tree.store.last = node
            //     node.checked = true
            // }
            this.tree.$emit('node-click', node)
        }
    }
}
</script>
<style scoped>
  li:hover {
    /*cursor: pointer;*/
  }

  .icon{
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
   }

  .halo-tree {
    font-size: 14px;
    min-height: 20px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .node-selected {
    background-color:#ddd
  }

  .halo-tree li {
    margin: 0;
    padding: 8px 5px 0px 0;
    position: relative;
    list-style: none;
  }

  .halo-tree li > span,
  .halo-tree li > i,
  .halo-tree li > a {
    line-height: 20px;
    vertical-align: baseline;;
  }

  .halo-tree ul ul li:hover {
    background: rgba(0, 0, 0, .035)
  }

  .halo-tree li:after,
  .halo-tree li:before {
    content: '';
    left: -8px;
    position: absolute;
    right: auto;
    border-width: 1px
  }

  .halo-tree li:before {
    border-left: 1px dashed #999;
    bottom: 50px;
    height: 100%;
    top: -8px;
    width: 1px;
  }

  .halo-tree li:after {
    border-top: 1px dashed #999;
    height: 20px;
    top: 17px;
    width: 12px
  }

  .halo-tree li span {
    display: inline-block;
    padding: 3px 3px;
    text-decoration: none;
    border-radius: 3px;
  }

  .halo-tree li:last-child::before {
    height: 26px
  }

  .halo-tree > ul {
    padding-left: 0
  }

  .halo-tree ul ul {
    padding-left: 15px;
  }

  .halo-tree li.leaf {
    padding-left: 19px;
  }

  .halo-tree li.leaf:after {
    content: '';
    left: -8px;
    position: absolute;
    right: auto;
    border-width: 1px;
    border-top: 1px dashed #999;
    height: 20px;
    top: 20px;
    width: 24px;
  }

  .check {
    display: inline-block;
    position: relative;
    top: 1px;
  }
  .halo-tree .icon {
    margin-right: 0;
  }

  .tree-close{
    width:14px;
    height:14px;
    background-image: url("../../assets/img/tree/treeOpen-1.png");
  }

  .tree-open{
    width:14px;
    height:14px;
    background-image: url("../../assets/img/tree/treeClose-2.png");
  }
  .search{
    width:14px;
    height:14px;
    background-image: url("../../assets/img/tree/search.png");
  }
  .check.notAllNodes{
      -webkit-appearance: none;
      width: 13px;
      font-size: 14px;
  }
  .check.notAllNodes:before{
    content: "\f14a";
    display: inline-block;
    position: relative;
    top: -1px;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }
</style>