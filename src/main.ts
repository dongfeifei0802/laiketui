import Vue from 'vue'
import App from './App.vue'
import store from './store'
import cfg from './common/config'
import Request from 'luch-request' // 使用npm

//所以，如果你想发送formData 类型数据，请将header['content-type'] 设置为 application/x-www-form-urlencoded。
const http = new Request({
	baseURL:cfg.baseUrl,
	header: {
	  'content-type': 'application/x-www-form-urlencoded',
	}
});
Vue.prototype.$http= http;
Vue.prototype.$store= store
//http.config.baseURL = config.baseUrl //接口前缀地址
	
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	const userInfo = uni.getStorageSync('lkt-userInfo')?
	JSON.parse(uni.getStorageSync('lkt-userInfo')):{}
	//需要在里面获取token
	if(userInfo.token){
		Object.assign(config.params,{authToken:userInfo.token,validParam:userInfo.loginName});
	}
	
    return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})
// ajax 响应拦截器
http.interceptors.response.use(({ data: originData, config }) => {
	
  if (originData === 401) {
    // 登录已失效，全局接口拦截器
    const loginOutTimeMsg = '登录已过期，请重新登录'
   /* uni.showModal({
      title: '提示',
      content: loginOutTimeMsg,
      showCancel: false,
      success (res) {
        if (res.confirm) {
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    }) */
    return Promise.reject(loginOutTimeMsg)
  }
  const { data, msg, status} = originData
  //console.log(data, msg, status)
  config.custom.showLoading && uni.hideLoading()
  if (status === 200) {
    return originData
  } else {
    //toast(msg)
    return Promise.reject(msg)
  }
}, ({ config, errMsg, statusCode }) => {
  config.custom.showLoading && uni.hideLoading()
  return Promise.reject(errMsg + `(${statusCode})`)
})



Vue.config.productionTip = false

const app = new App({
	store,
	...App
})
app.$mount()
