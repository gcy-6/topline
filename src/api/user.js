import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 获取验证码
export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get'
  })
}

// 获取当前登录用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}

// 获取指定用户信息
export const getUserById = userId => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${userId}`
  })
}
