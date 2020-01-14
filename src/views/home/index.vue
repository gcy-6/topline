<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- 标签栏 -->
    <van-tabs v-model="active">
      <van-icon
    class="wap-nav"
    slot="nav-right"
    name="wap-nav"
    @click="isChannelEditShow = true"
  />
      <van-tab
      v-for="(channels,index) in userChannels"
      :key="index"
      :title="channels.name">
      <!-- {{channel.name}} -->
       <article-list :channel="channels" />
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
    </van-tabs>

    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <channel-edit :user-channels="userChannels" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'homePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelEditShow: true
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

<style lang="less" scoped>
.home-container{
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
  position:fixed;
  top:46px;
  left: 0;
  right: 0;
  z-index: 2
}
}
.wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
}

</style>
