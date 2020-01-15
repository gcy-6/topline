<template>
  <div class="search-content">
    <!-- 搜索框 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
    </van-cell-group>
    <!-- /联想建议 -->
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" />
        <span>全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span>完成</span>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchContent: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch () {
      console.log('onSearch')
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    }
  }
}
</script>

<style lang='less' scoped>
.search-content{
  position: relative;
  padding-top: 54px;
  .search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action{
    color: #fff
  }
}
</style>
