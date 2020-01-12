<template>
  <div class="article-list">
    <!-- <h2>{{channel.name}}</h2> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list"
      :key="index"
      :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getChannelArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 列表数据
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1、请求获取数据
      const { data } = await getChannelArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   console.log(data)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
      // 2、把请求获取到的数据添加到数组列表中
      // 3、加载状态结束
      // 4、数据全部加载完成
    }
  }
}
</script>

<style>
</style>
