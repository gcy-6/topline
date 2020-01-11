<template>
  <div class="user-container">
    <van-nav-bar title="黑马头条" left-arrow icon="arrow-left" />
    <div class="user-info">
        <van-row>
            <van-col :span="6" style="margin:14px">
                <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" round/>
            </van-col>
            <van-col :span="16">
                <van-row style="font-size:16px;margin:15px 5px">
                    <van-col :span="6">
                        <div>123</div>
                        <div>发布</div>
                    </van-col>
                    <van-col :span="6">
                        <div>123</div>
                        <div>关注</div>
                    </van-col>
                    <van-col :span="6">
                        <div>256</div>
                        <div>粉丝</div>
                    </van-col>
                    <van-col :span="6">
                        <div>246</div>
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
            <div>hhh</div>
            <div>hhh</div>
        </van-row>
    </div>
    <!-- 文章列表 -->
  </div>
</template>

<script>
export default {
  name: 'UserPage'
}
</script>

<style>
</style>
