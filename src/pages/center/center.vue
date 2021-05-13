<template>
	<view class="center">
		<view class="head" :class="{'panpel':hasLogin}">
			<view class="left" v-if="!hasLogin">
				<uni-icons type="contact-filled" class="myImg"></uni-icons>
				<text>Hi~等你很久了</text>
			</view>
			<!--已登录-->
			<view class="left core_two" v-if="hasLogin">
				<image src="/static/app-icon.png"  @click="layout"></image>
				<view class="user-msg">
					<view>
						{{userInfo.name}} 
						<text class="vip-text">黑金会员</text>
					</view>
					<view class="user-msg-div">
						<text class="ren-ree-time">2024-09-28 到期</text>
						<text class="xf_button" :hover-start-time="20" :hover-stay-time="70" @click="showDrawer">立即续费</text>
					</view>
				</view>
			</view>
			<view v-if="!hasLogin" class="loginBtn" @click="goLogin">
				<text>登录/注册</text>
			</view>
			<view v-if="hasLogin" class="loginBtn two" >
				<text>会员中心</text>
			</view>
		</view>
		<view class="order">
			<view class="order_one">
				<p>我的订单</p>
				<view class="seeAll">查看全部<uni-icons type="arrowright" size="16"></uni-icons></view>
			</view>
			<ul class="order_two">
				<li>
					<image src="/static/order/dfk.png"></image>
					<p>待付款</p>
				</li>
				<li>
					<image src="/static/order/dfh.png"></image>
					<p>待发货</p>
				</li>
				<li>
					<image src="/static/order/dsh.png"></image>
					<p>待收货</p>
				</li>
				<li>
					<image src="/static/order/dpj.png"></image>
					<p>待评价</p>
				</li>
				<li>
					<image src="/static/order/tksh.png"></image>
					<p>退款/售后</p>
				</li>
			</ul>
		</view>
		<view class="wallet">
			<ul>
				<li class="yhq">
					<p class="dataNum">0</p>
					<p>优惠券</p>
				</li>
				<li class="qb">
					<p class="dataNum">￥0.00</p>
					<p>钱包</p>
				</li>
				<li class="jf">
					<p class="dataNum">0</p>
					<p>积分</p>
				</li>
			</ul>
		</view>
		<view class="oprate">
			<ul>
				<li v-for="(item,index) in oprateList" :key="index">
					<image :src="item.url"></image>
					<p>{{item.name}}</p>
				</li>
			</ul>
		</view>
		<view class="copyright">
			<text>来客推提供技术支持</text>
		</view>
		<!-- <view class="logo" @click="goLogin" :hover-class="!hasLogin ? 'logo-hover' : ''">
			 <image class="logo-img" :src="hasLogin ? userInfo.name :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{hasLogin ? userInfo.name : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text>
				<text v-if="hasLogin" style="float: right;color: red;" @click="layout">退出登录</text>
			</view>
		</view> -->
		
		
		
		<uni-drawer :visible="showLeft"   ref="draw" mode="right" :width="320">
		    <view style="padding:15px;">
		        <view class="uni-title">抽屉式导航</view>
		    </view>
		</uni-drawer>
	
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import {mapState,mapMutations} from 'vuex';
	export default {
		components:{
			uniDrawer
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				showLeft:false,
				login: false,
				avatarUrl: '/static/logo.png',
				oprateList:[{id:1,name:'我的拼团',url:'/static/order/myGroup.png'},
				{id:2,name:'我的拼团',url:'/static/order/myGroup.png'},
				{id:3,name:'我的店铺',url:'/static/order/mddp.png'},
				{id:4,name:'我的秒杀',url:'/static/order/kan3x.png'},
				{id:5,name:'我的收藏',url:'/static/order/wdsc.png'},
				{id:6,name:'代理中心',url:'/static/order/fx_centerIcon.png'},
				{id:7,name:'收货地址',url:'/static/order/mdkf.png'},
				{id:8,name:'消息',url:'/static/order/xx.png'},
				{id:9,name:'积分商城',url:'/static/order/jf.png'},
				{id:10,name:'客服',url:'/static/order/mdkf.png'},
				{id:11,name:'关于我们',url:'/static/order/gywm.png'}]
			}
		},
		created() {
			this.login = this.hasLogin;
			console.log(this.hasLogin)
		},
		methods: {
			...mapMutations(['toLogout']),
			goLogin() {
				if (!this.login) {
					console.log("登录")
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			//退出
			layout(){
				var that= this;
				uni.showModal({
				    title: '提示',
				    content: '确定退出吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							that.toLogout();
							uni.navigateTo({
								url: '/pages/login/login'
							});
				        } 
				    }
				});
			},
			showDrawer(){
				this.showLeft = true;
				this.$refs.draw.open();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center{
		font-size: 16rpx;
		.head{
			padding:26rpx 0;
			position: relative;
			display: flex;
			align-items: center;
			&.panpel{
				background: url(/static/order/15716279538.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
			.left{
				flex: 1;
				font-size: 16px;
				display: flex;
				align-items: center;
				.myImg{
					margin: 0 16px !important;
					font-size:66px !important;
					color: #cac3c3 !important;
				}
				image{
					margin: 0 16px;
					border-radius: 50%;
					width: 120rpx;
					height: 120rpx;
				}
				&.core_two{
					color: rgb(232, 202, 150);
					.vip-text{
						margin-left: 10rpx;
						font-size: 12rpx;
					}
					.user-msg-div{
						font-size: 12rpx;
						margin-top: 10rpx;
						    display: flex;
						    align-items: center;
						.ren-ree-time{
							color: rgb(101, 101, 101);
							margin-right: 10rpx;
							
						}
						.xf_button{
							padding: 4rpx 6rpx;
							border: 1rpx solid #e8ca96;
							border-radius: 10rpx;
						}
					}
				}
			}
			
			.loginBtn{
				background: linear-gradient(#ff7272,#f44);
				color: #fff;
				padding:8rpx 18rpx;
				padding-right: 10rpx;
				float: right;
				font-size: 15rpx;
				border-top-left-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
				height: 20rpx;
				line-height: 20rpx;
				.text{
					
				}
				&.two{
					font-size: 12rpx;
					background: -webkit-linear-gradient(left,#d1b686,#f6e8ce);
					padding:4rpx 8rpx ;
					border-radius:30rpx;
					margin-right: 30rpx;
					color: #000000;
				}
			}
		}
		.order{
			padding: 0 16px;
			font-size: 14px;
			color: #9d9d9d;
			background-color: #fff;
			margin-bottom: 11px;
			.order_one{
				display: flex;
				font-size: 16px;
				height: 44px;
				line-height: 44px;
				justify-content: space-between;
				p{
					color: #020202;
				}
				.seeAll{
					color: #666;
				}
			}
			.order_two{
				display: flex;
				 padding: 16px 0;
				li{
					width: 20%;
					text-align: center;
					image{
						width: 26px;
						height: 24px;
						margin-bottom: 8px;
					}
				}
			}
			
		}
		.wallet{
			padding: 12rpx 0;
			background-color: rgb(248, 248, 248);
			ul{
				background-color: #FFFFFF;
				display: flex;
				padding: 10px;
				font-size: 16px;
				li{
					flex: 1;
					height:78px;
					margin-right: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 10px;
					flex-direction: column;
					.dataNum{
						color: #333333;
						font-size: 17px;
						font-weight: bold;
						margin-bottom: 5px;
					}
				}
				li.yhq{
					background: url(/static/order/yhqBg.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				li.qb{
					background: url(/static/order/qbBg.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				li.jf{
					background: url(/static/order/jfBg.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.oprate{
			ul{
				display: flex;
				flex-wrap: wrap;
				font-size: 16px;
				li{
					width: 33%;
					height: 100px;
					color: #020202;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #eee;
					border-right: 1px solid #eee;
					image{
						width: 26px;
						height: 26px;
						margin-bottom: 11px;
					}
				}	
			}
		}
		.copyright{
			text-align: center;
			font-size: 14rpx;
			color: #bbb;
			background-color: #f8f8f8;
			padding: 10rpx;
		}
	}
	
</style>
