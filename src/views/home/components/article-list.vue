<template>
  <div class="article-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- <h2>{{channel.name}}</h2> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list"
      :key="index"
      :title="item.title"
      @click="$router.push('/article/'+item.art_id)"
    />
    </van-list>
      </van-pull-refresh>
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
      timestamp: null,
      isLoading: false
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
      // 2、把请求获取到的数据添加到数组列表中
      const { results } = data.data
      //   console.log(results)
      this.list.unshift(...results)
      // 3、加载状态结束
      this.loading = false
      // 4、数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getChannelArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.list.unshift(...results)
      this.isLoading = false
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}
</script>

<style>
</style>
