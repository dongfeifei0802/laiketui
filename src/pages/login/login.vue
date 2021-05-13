<template>
	<view class="content">
		<view class="login">
			<view class="loginType">密码登录</view>
			<view class="login_input">
				<input class="uni-input"  autocomplete="off" v-model="userName" placeholder-class="input-placeholder"	 placeholder-style="font-size:16px"  placeholder="请输入账号/手机号" />
			</view>
			<view class="login_input">
			   <input class="uni-input"  v-model="password"  :password="showPassword"  placeholder="请输入密码" />
			    <uni-icons :type="showPassword?'eye-slash':'eye'" size="24" @click="changePassword"></uni-icons>
			</view>
			<text class="forget">忘记密码?</text>
			<view class="login_btn">
				<button type="primary" :disabled="!canClick" @click="login">登录</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	let Base64 = require('js-base64').Base64;
	import {mapMutations} from 'vuex'
	 export default {
		components: {},
		data(){
			return{
				userName:'htxmgty',
				password:'abc123',
				showPassword: true,
				canClick:true,
			}
		},
		watch:{
			userName:function(newVal, oldVal){
				if(newVal && this.password){
					this.canClick=true;
				} else{
					this.canClick=false;
				}
			},
			password:function(newVal, oldVal){
				if(newVal && this.userName) {
					this.canClick=true;
				}else{
					this.canClick=false;
				}
			}
		},
		created() {
			/* const user = uni.getStorageSync('lkt-user');//同步获取当前 storage 的相关信息。
			console.log(JSON.parse(user)); */
		},
		methods:{
			...mapMutations(['toLogin']),
			changePassword: function() {
			    this.showPassword = !this.showPassword;
			},
			login:function(){
				const params = {loginName: this.userName,password: Base64.encode(this.password)}
				
				/* tips:navigateTo, redirectTo 只能打开非 tabBar 页面。
				switchTab 只能打开 tabBar 页面。
				reLaunch 可以打开任意页面。 */
				this.$http.post('/login', params).then((data) => {
						//console.log(data);
						uni.showToast({
						    title: '登录成功',
						    duration: 2000
						});
						//Action 通过 store.dispatch 方法触发：
						//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
						let userInfo = data;
						userInfo.loginName=this.userName;
						this.toLogin(userInfo);//调用mutation 里面的方法
						//this.$store.commit('toLogin',JSON.stringify(userInfo))//或者2
						setTimeout(() => {
							uni.reLaunch({
							    url: '/pages/index/index'
							});
						}, 1000);
						//this.$store.dispatch('xxx') 分发 action (异步)
						//或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store ）
						// mutations 同步 commit(触发) mapMutations 
						
						
					
					
				}).catch(err => {
				   console.log(err);
				})
				
				
				
			}
		}
	  }
</script>

<style lang="scss" scoped>
	.content{
		
		.login{
			padding: 0 22px;
			.loginType{
				width: 100%;
				height: 126px;
				padding: 0 16px;
				font-size: 29px;
				color: #020202;
				align-items: center;
				display: flex;
			}
			.login_input{
				width: 90%;
				padding: 10px;
				margin: 25rpx auto;
				border-bottom: 1px solid #ddd;
				position: relative;
				.uni-icons{
					position: absolute;
					top: 0;
					right: 20px;
				}
				/deep/.input-placeholder{
					font-size:16px
				}
			}
			.forget{
				font-size: 12px;
				margin: 10px 22px;
				text-align: right;
				display: block;
			}
			.login_btn{
				width: 90%;
				padding: 10px;
				margin-top: 20px;
				uni-button{
					width: 100%;
				}
			}
		}
	}
</style>
