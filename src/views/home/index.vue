<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"/>
    <!-- 标签栏 -->
    <van-tabs v-model="active">
      <van-tab
      v-for="(channel,index) in userChannels"
      :key="index"
      :title="channel.name">
      <!-- {{channel.name}} -->
       <article-list :channel="channel" />
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'

export default {
  name: 'homePage',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      userChannels: []
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getUserChannels()
      console.log(data)
      this.userChannels = data.data.channels
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style>

</style>
