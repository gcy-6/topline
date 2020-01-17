<template>
  <div class="search-content">
    <!-- 搜索框 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchContent)"
        @cancel="onCancel"
        @focus="isResultShow=false"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :q="searchContent" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell
        icon="search"
        v-for="(item,index) in getSuggestions"
        :key="index"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isSearchShow">
          <span @click="searchHistories = []">全部删除</span>
          &nbsp;&nbsp;&nbsp;
          <span @click="isSearchShow=false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="isSearchShow=true" />
      </van-cell>
      <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="onHistoryClick(item, index)">
        <van-icon v-show="isSearchShow" name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchContent: '',
      isResultShow: false,
      getSuggestions: [],
      searchHistories: getItem('search-histories') || [],
      isSearchShow: false
    }
  },
  watch: {
    searchHistories (val) {
      setItem('search-histories', val)
    }
  },
  methods: {
    onSearch (q) {
      // console.log('onSearch')
      this.searchContent = q
      const searchHistories = this.searchHistories
      const index = searchHistories.indexOf(q)
      if (index !== -1) {
        searchHistories.splice(index)
      }
      searchHistories.unshift(q)
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }
      const { data } = await getSuggestions(searchContent)
      console.log(data)
      this.getSuggestions = data.data.options
    }, 300),
    // async onSearchInput () {
    //   const searchContent = this.searchContent
    //   if (!searchContent) {
    //     return
    //   }
    //   const { data } = await getSuggestions(searchContent)
    //   console.log(data)
    //   this.getSuggestions = data.data.options
    // },
    highlight (str) {
      const searchContent = this.searchContent
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color:#3296fa">${searchContent}</span>`)
    },
    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isSearchShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        this.onSearch(item)
      }
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
