<template>
  <div class="user-container">
    <van-nav-bar :title="user.name" left-arrow @click-left="$router.back()"/>
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
                        <van-button icon="plus" type="info" size="small">关注</van-button>
                    </van-col>
                    <!-- <van-col :span="10">
                        <van-button icon="plus" type="default" size="small">编辑资料</van-button>
                    </van-col> -->
                </van-row>
            </van-col>
        </van-row>
        <van-row style="font-size:16px;padding-left:20px">
            <div>自媒体认证:{{user.certi}}</div>
            <div>简介:{{user.intro}}</div>
        </van-row>
    </div>
    <!-- 文章列表 -->
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
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/article'

export default {
  name: 'UserPage',
  data () {
    return {
      user: {},
      list: [], // 列表数据
      loading: false, // 控制上拉加载更多的 loading
      finished: false, // 控制是否加载结束了
      page: 1 // 获取下一页数据的页码
    }
  },
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        console.log(data)
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast('获取用户数据失败')
      }
    },
    // async onLoad () {
    //   const { data } = await getArticlesByUser(this.$route.params.userId, {
    //     page: this.page,
    //     per_page: 20
    //   })
    //   const { results } = data.data
    //   this.list.push(...results)
    //   this.loading = false
    //   if (results.length) {
    //     this.page++
    //   } else {
    //     this.finished = true
    //   }
    // }
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticlesByUser(this.$route.params.userId, {
        page: this.page, // 可选的，默认是第 1 页
        per_page: 20 // 可选的，默认每页 10 条
      })

      // 2. 把数据添加到列表中
      // list []
      // data.data.results []
      // ...[1, 2, 3] 会把数组给展开，所谓的展开就是一个一个的拿出来
      const { results } = data.data
      this.list.push(...results)

      // 3. 加载状态结束
      this.loading = false

      // 4. 判断数据是否全部加载完毕
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，不需要加载更多了
      }
    }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style lang='less' scoped>
</style>
