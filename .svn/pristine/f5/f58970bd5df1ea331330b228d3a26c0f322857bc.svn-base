<template>
    <div class="halo-tree">
        <div class="input">
            <input type="text" v-model="search">
            <span class="icon search"></span>
        </div>
        <tree-node :treedata.sync='store.root' :treeNodeId="treeNodeId" :options="options" @handlecheckedChange="handlecheckedChange" @initParentNodes="initParentNodes"></tree-node>
    </div>
</template>

<script>
  import TreeNode from './tree-node.vue'
  import TreeStore from './tree-store'
  export default {
      name: 'tree',
      props: {
          treedata: [Array],
          options: [Object],
          treeNodeId: [Array]
      },
      data() {
        return {
            search: null
        }
      },
      created() {
          this.isTree = true
          this.store = new TreeStore({
              root: (this.treedata || []).slice(0),
              last: null
          })
      },
      watch: {
          search: function(val) {
              this.store.filterNodes(val, this.options.search)
          },
          treedata: function(data){
              this.store.root = data;
              return data
          },
          treeNodeId: function(data){
              return data
          }
      },
      methods: {
          initParentNodes(nodes){
              this.$emit('initParentNodes', nodes)
              // console.log(nodes);
          },
          handlecheckedChange(node) {
              this.store.changeCheckStatus(node)
              this.$emit('getSelectedNodeIds', this.getSelectedNodeIds())
          },
          getSelectedNodes() {
              const allnodes = this.store.datas
              let selectedNodes = []
              for (let [, node] of allnodes) {
                  if (node.checked) {
                      selectedNodes.push(node)
                  }
              }
              return selectedNodes
          },
          getSelectedNodeIds() {
              const allnodes = this.store.datas
              let selectedNodeIds = []
              for (let [, node] of allnodes) {
                  if (node.checked) {
                      selectedNodeIds.push(node.id)
                  }
              }
              return selectedNodeIds
          }
      },
      components: {
          TreeNode
      }
  }
</script>

<style scoped>
  *{
    font-size: 13px;
    font-family: '\5FAE\8F6F\96C5\9ED1'
  }
  .input{
    width:100%;
    position: relative;
  }
  .input span {
    position: absolute;
    top:10px;
    right:5px;
  }
  .input input{
    display: inline-block;
    box-sizing: border-box;
    width:100%;
    border-radius: 5px;
    height:25px;
    margin-top: 2px;
  }
  .halo-tree .input input{
    border: 1px solid #ccc;
    height: 32px;
  }
/*  .input input:focus {
      border:none;
  }*/
  .search{
  width:14px;
  height:14px;
  background-image: url("../../assets/img/tree/search.png");
}
</style>

