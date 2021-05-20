<template>
  <div class="Container">
    <!-- 夏琳辉 -->
    <div>
      <button @click="handleList">列表视图</button>
      <button @click="handleTable">网格视图</button>
      <input type="text"
             v-model="value">
    </div>
    <common-list :list='list'
                 :className='className'></common-list>
  </div>
</template>
<script>
import CommonList from './CommonList'
export default {
  components: {
    CommonList
  },
  data () {
    return {
      className: 'list',
      value: '',
      depList: [],
      list: [
        {
          id: 1,
          name: 'test1'
        },
        {
          id: 2,
          name: 'test2'
        },
        {
          id: 5,
          name: 'testtest5'
        },
        {
          id: 3,
          name: 'test3'
        },
        {
          id: 4,
          name: 'test4'
        },
      ]
    }
  },
  watch: {
    value: {
      handler (value) {
        let filterList = this.list.filter(item => item.name.includes(value));
        value ? (this.list = filterList.length ? filterList : this.depList) : this.list = this.depList
      },
      deep: true
    }
  },
  methods: {
    handleList () {
      this.className = 'list'
    },
    handleTable () {
      this.className = 'table'
    }
  },
  mounted () {
    this.list.sort((a, b) => a.name.match(/\d/) - b.name.match(/\d/))
    this.depList = JSON.parse(JSON.stringify(this.list))
  }


}
</script>
<style scoped>
</style>
