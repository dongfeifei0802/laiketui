<template>
	<view class="content">
		<view class="head">
			<view class="icon">
				<image mode="scaleToFill" src="https://laikeds.oss-accelerate.aliyuncs.com/1/0/1562152010784.png"></image>
			</view>
			<view class="search">
				<view class="serinput">
					<uni-icons type="search" size="16"></uni-icons>
					<input placeholder="搜索你要的商品" />
				</view>
			</view>
			<view class="xiaoxi">
				<uni-icons type="chat" size="24"></uni-icons>
			</view>
		</view>
		<view class="main-content">
			<view class="lbswiper">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item  v-for="(item,index) in bannerList" :key="index">
								<image class="slimg" mode="widthFix" :src=item.url></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			
			<ul class="home_new">
				<li>
					<image src="https://xiaochengxu.houjiemeishi.com/V3.3/images/icon/h_group.png"></image>
					<p>拼团</p>
				</li>
				<li>
					<image src="https://xiaochengxu.houjiemeishi.com/V3.3/images/icon/h_sign.png"></image>
					<p>签到</p>
				</li>
				<li>
					<image src="https://xiaochengxu.houjiemeishi.com/V3.3/images/icon/h_coupon.png"></image>
					<p>优惠券</p>
				</li>
				<li>
					<image src="https://xiaochengxu.houjiemeishi.com/V3.3/images/icon/h_bargain.png"></image>
					<p>砍价</p>
				</li>
				<li>
					<image src="https://xiaochengxu.houjiemeishi.com/V3.3/images/icon/h_bidding.png"></image>
					<p>竞拍</p>
				</li>
				<li>
					<image src="https://xiaochengxu.houjiemeishi.com/V3.3/images/icon/h_seckill.png"></image>
					<p>秒杀</p>
				</li>
			</ul>
			  <scroll-view style="height: 50px;" class="scroll-view" scroll-x="true" >
				<view :class="['scroll-view-item',{'active':index==channerActiveIndex}] " v-for="(item,index) in channelList" 
				 :key="index" :id="item.id" @click="changeChannel(index)">{{item.dictDataName}}</view>
			  </scroll-view>
			  
		</view>
	</view>
</template>

<script lang="ts">
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	import Vue from 'vue';
	import {mapState,mapGetters} from 'vuex'
	export default Vue.extend({
		components: {
			uniIcons
		},
		computed:{
			...mapState(['hasLogin','userInfo']),
			...mapGetters(['getUserinfo'])
		},
		data() {
			return {
			
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				bannerList:[{id:1,url:'https://laikeds.oss-accelerate.aliyuncs.com/1/2/1562208147388.png'},
				{id:2,url:'https://laikeds.oss-accelerate.aliyuncs.com/1/2/1604304148865.jpeg'},
				{id:3,url:'https://laikeds.oss-accelerate.aliyuncs.com/1/2/1562208132615.png'}],
				//频道列表
				channerActiveIndex:0,
				channelList:[{id:'1',name:'精选服饰'},{id:'2',name:'精致鞋靴'},{id:'3',name:'日用百货'},
				{id:'4',name:'手机数码'},{id:'5',name:'家用电器'},{id:'6',name:'美妆护理'},
				{id:'7',name:'精美箱包'},{id:'8',name:'家居家纺'}]
				
				
			}
		},
		created(){
			
			
		},
		onLoad() {
			console.log(this.hasLogin)
			//console.log(this.getUserinfo.name)//第二种方式：this.$store.state.hasLogin
			this.initBannerData();
		},
		methods: {
			initBannerData(){
				this.$http.get('/v1/dict_datas?dictFlag=INPUTS_TYPE').then((data)=>{
					console.log(data)
					this.channelList = data;
				}) 
			},
			changeChannel(index){
				console.log("aaa",index)
				this.channerActiveIndex = index;
			}
			
			
		}
	});
</script>

<style scoped lang="scss">
	.content {
		width: 100%;

		.head {
			position: fixed;
			height: 50px;
			width: 100%;
			display: flex;
			align-items: center;

			.icon {
				padding: 6px;
				height: 38px;
				display: flex;
				align-items: center;
				width: 100px;
				box-sizing: border-box;

				image {
					width: 90px;
					height: 22px;
				}

			}

			.search {
				flex: 1;
				height: 38px;
				margin: 5px;
				position: relative;

				.uni-icons {
					position: absolute;
					left: 10px;
					top: 10px;
				}

				.serinput {
					background-color: #f4f4f4;
					padding: 8px 32px;
				}
			}

			.xiaoxi {
				width: 30px;
				line-height: 30px;
			}
		}
		.main-content{
			padding-top: 50px;
			.lbswiper{
				height: 182px;
				image{
					
				}
				.swiper{
					height: 182px;
					.lbimg{
						width: 100% !important;
						img{
							width: 100%;
							height:100%;
						}
					}
				}
			}
			.home_new{
				background-color: #FFFFFF;
				height: 108px;
				box-shadow: 0px 0px 28px 0px #90a39a;
				margin: 0 10px;
				display: flex;
				align-items: center;
				position: relative;
				top:-10px;
				margin-bottom: 10px;
				border-radius: 4px;
				li{
					flex: 1;
					margin: 0 auto;
					image{
						width: 42px;
						height: 42px;
						display: block;
						margin: 0 auto;
					}
					p{
						font-size: 12px;
						text-align: center;
						margin-top: 10px;
					}
				}
				
			}
			.scroll-view{
				white-space: nowrap;
				border-bottom: 1px solid #eee;
				font-size: 15px;
				.scroll-view-item {
					margin: 4px 10px;
					display: inline-block;
					text-align: center;
					padding-bottom: 10px;
					color: #888;
				}
				.scroll-view-item.active{
					position: relative;
					color: #020202;
					font-weight: 700;
					font-size: 16px;
					&:after{
						content: "";
						position: absolute;
						width:30%;
						height: 2px;
						left: 50%;
						bottom: 0;
						background-color: #2b2b2b;
						transform: translate(-50%);
					}
				}
				
			}
		}
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	uni-image{
		width: 100%;
	}
</style>
