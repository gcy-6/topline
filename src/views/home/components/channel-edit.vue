<template>
  <div class="channel-edit">
      <van-cell title="我的频道" :border="false">
          <van-button size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>
      <van-grid :gutter="10">
  <van-grid-item
    v-for="channel in userChannels"
    :key="channel.id"
    :text="channel.name"
  />
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
      allChannels: []
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
</style>
