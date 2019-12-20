/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let rootUrl = ''
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  rootUrl = 'http://192.168.1.10:9090'
  baseUrl = rootUrl + '/common/pagemanage/'
} else if (process.env.NODE_ENV === 'production') {
  rootUrl = window.location.protocol + '//' + window.location.host
  baseUrl = rootUrl + '/common/pagemanage/'
}

export {
  rootUrl,
  baseUrl
}
