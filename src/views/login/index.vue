<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <ValidationObserver ref="form">
        <!-- <van-cell-group> -->
        <ValidationProvider name="手机号" rules="required|mobile" immediate>
            <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" left-icon="phone-o"/>
            <!-- <span>{{errors[0]}}</span> -->
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|code" immediate>
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
import { validate } from 'vee-validate'

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
      const user = this.user
      // 表单验证
      const success = await this.$refs.form.validate()
      if (!success) {
        // console.log('表单验证失败')
        // console.log(this.$refs.form.errors)
        // 在进行js验证的时候要马上获取到错误信息，必须给每一个ValidationProvider配置immediate
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          // console.log(item, key)
          if (item[0]) {
            // 找到第一个错误信息，给出提示，停止遍历
            this.$toast(item[0])
            return
          }
        }
        return
      }
      // 登录加载轻提示
      this.$toast.loading({
        duration: 0,
        message: '登陆中...',
        forbidClick: true
      })
      // 登陆成功与失败轻提示
      try {
        const res = await login(user)
        console.log(res)
        const { data } = res
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败,手机号或验证码错误')
      }
    },
    // 发送验证码
    async onSendSmsCode () {
      // 验证手机号是否有效
      try {
        const { mobile } = this.user
        // 参数1：要验证的数据
        // 参数2：验证规则
        // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
        // 返回值：{ valid, errors, ... }
        //          valid: 验证是否成功，成功 true，失败 false
        //          errors：一个数组，错误提示消息
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        // 验证失败，提示错误信息，停止发送验证码
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        // 请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)
        // 显示倒计时
        this.isCountAndDown = true
      } catch (err) {
        console.log(err)
        this.isCountAndDown = false
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
