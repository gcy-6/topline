<template>
  <div class="user-container">
    <van-nav-bar :title="user.name" left-arrow icon="arrow-left" />
    <div class="user-info">
        <van-row>
            <van-col :span="6" style="margin:14px">
                <van-image width="100" height="100" :src="user.photo" round/>
            </van-col>
            <van-col :span="16">
                <van-row style="font-size:16px;margin:15px 5px;text-align:center">
                    <van-col :span="6">
                        <div>{{user.art_count}}</div>
                        <div>发布</div>
                    </van-col>
                    <van-col :span="6">
                        <div>{{user.follow_count}}</div>
                        <div>关注</div>
                    </van-col>
                    <van-col :span="6">
                        <div>{{user.fans_count}}</div>
                        <div>粉丝</div>
                    </van-col>
                    <van-col :span="6">
                        <div>{{user.like_count}}</div>
                        <div>获赞</div>
                    </van-col>
                </van-row>
                <van-row style="margin-left:20px">
                    <van-col :span="10">
                        <van-button type="primary" size="small">私信</van-button>
                    </van-col>
                    <van-col :span="8">
                        <van-button icon="plus" type="primary" size="small">关注</van-button>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row style="font-size:16px">
            <div>{{user.certi}}</div>
            <div>{{user.intro}}</div>
        </van-row>
    </div>
    <!-- 文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
export default {
  name: 'UserPage',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async loadUser () {
      const { data } = await getUserById(this.$route.params.userId)
      console.log(data)
      this.user = data.data
    }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style lang='less' scoped>
</style>
