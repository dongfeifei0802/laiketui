import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const userInfo_key = 'lkt-userInfo'

//console.log(localData.userInfo)
const store = new Vuex.Store({
	state:{
		hasLogin:uni.getStorageSync(userInfo_key)?true:false,
		userInfo:uni.getStorageSync(userInfo_key)? 
		JSON.parse(uni.getStorageSync(userInfo_key)):{}
	},
	getters:{
		getUserinfo:(state)=>{
			return state.userInfo;
		}
		
	},
	mutations:{
		toLogin(state,provider){
			console.log("存储用户登录数据")
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorageSync(userInfo_key,JSON.stringify(provider));//同步
		},
		toLogout(state){
			state.hasLogin = false;
			state.userInfo={};
			uni.removeStorage({
				key:userInfo_key
			})
		}
	}
})
export default store