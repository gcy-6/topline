import request from '@/utils/request'

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
