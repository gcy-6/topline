// 封装axios请求模块
import axios from 'axios'

// 所使用的后端接口的数据中包含超出JavaScript安全整数范围的数字，所以需要bigint处理
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    console.log(err)
    return {}
  }
}]

export default request
