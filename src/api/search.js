import request from '@/utils/request'

export const getSuggestions = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}