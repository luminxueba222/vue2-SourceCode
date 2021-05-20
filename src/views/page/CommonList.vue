<template>
  <div>
    <ul :class="className==='list'?'list':'table'">
      <template v-for="item in list">
        <li :key='item.id'>{{item.name}}</li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => { [] }
    },
    className: {
      type: String,
      default: 'table'
    }
  },

}
</script>
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.list {
  display: flex;
  flex-direction: column;
}
.list li {
  border: 1px solid yellowgreen;
  width: 280px;
  margin: 5px;
  padding: 5px;
}
.table {
  display: flex;
  flex-direction: row;
}
.table li {
  border: 1px solid yellowgreen;
  width: 180px;
  height: 180px;
  margin: 5px;
  padding: 5px;
}
</style>
