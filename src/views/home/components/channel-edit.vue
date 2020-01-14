<template>
  <div class="channel-edit">
      <van-cell title="我的频道" :border="false">
          <van-button
            size="mini"
            round
            type="danger"
            plain
            @click="isClose=!isClose"
          >{{isClose?'完成':'编辑'}}</van-button>
      </van-cell>
      <van-grid :gutter="10">
  <van-grid-item
    v-for="(channel,index) in userChannels"
    :key="channel.id"
    :text="channel.name"
    @click="onUserChannelClick(index)"
  >
    <van-icon slot="icon" name="close" v-show="isClose&&index!==0"></van-icon>
  </van-grid-item>
</van-grid>
<van-cell title="推荐频道" :border="false"></van-cell>
<van-grid :gutter="10">
  <van-grid-item
    v-for="channel in remainingChannels"
    :key="channel.id"
    :text="channel.name"
    @click="onAdd(channel)"
  />
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isClose: false
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  computed: {
    remainingChannels () {
      const { allChannels, userChannels } = this
      const channels = []
      allChannels.forEach(item => {
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  methods: {
    async onLoadChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，就会删除频道
      if (this.isClose && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        // 如果是非编辑状态，则执行切换频道操作
        this.$emit('switch', index)
      }
    }
  },
  created () {
    this.onLoadChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding:40px 0;
}
.van-grid-item{
  position: relative;
  /deep/.van-grid-item__icon-wrapper {
    position: absolute;
    top: -14px;
    right: -4px;
    .van-icon-close{
      font-size: 16px
    }
}
}

</style>
