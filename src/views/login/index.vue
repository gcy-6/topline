<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <ValidationObserver>
        <!-- <van-cell-group> -->
        <ValidationProvider name="手机号" rules="required" v-slot="{errors}">
            <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" left-icon="phone-o"/>
            <span>{{errors[0]}}</span>
        </ValidationProvider>
        <ValidationProvider>
            <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" left-icon="closed-eye">
                <van-count-down v-if="isCountAndDown" @finish="isCountAndDown=false" slot="button" :time="1000*60" format="ss s"/>
                <van-button v-else slot="button" size="small" type="primary" round @click="onSendSmsCode">发送验证码</van-button>
            </van-field>
        </ValidationProvider>
        <!-- </van-cell-group> -->
    </ValidationObserver>
    <div class="btn">
        <van-button type="info" @click="userLogin">登录</van-button>
    </div>

  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountAndDown: false
    }
  },
  methods: {
    // 用户登录
    async userLogin () {
      this.$toast.loading({
        duration: 0,
        message: '登陆中...',
        forbidClick: true
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
    },
    // 发送验证码
    async onSendSmsCode () {
      // 验证手机号是否有效
      try {
        const { mobile } = this.user
        // 请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)
        // 显示倒计时
        this.isCountAndDown = true
      } catch (err) {
        console.log(err)
        this.$toast('请勿频繁操作')
      }
    }

  }
}
</script>

<style lang="less" scoped>
.btn {
    margin: 27px 16px;
    .van-button--info {
        width: 100%
    }
}
.van-button--primary {
    background-color: #3196fa
}
</style>
