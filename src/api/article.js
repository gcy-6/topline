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

// 根据id获取指定的文章
export const getArticlesById = articleId => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollect = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deleteCollect = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${target}`
  })
}
