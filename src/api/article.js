import request from '@/utils/request'

// 获取指定用户文章列表
export const getArticlesByUser = (userId, params) => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}

// 获取频道的文章列表
export const getChannelArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
