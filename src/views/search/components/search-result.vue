<template>
  <div class="search-result">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
        />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 请求获取数据
      const { data } = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // console.log(data)
      // 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 设置加载状态结束
      this.loading = false
      // 判断数据是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
