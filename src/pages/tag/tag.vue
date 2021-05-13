<template>
	<view class="index">
		<view class="tags">
			<view class="left">
				<ul>
					<li :class="{'active':activeIndex===index}" :key=item.id
					 v-for="(item,index) in channelList" @click="changeChannel(index)">{{item.name}}</li>
				</ul>
			</view>
			<view class="right">
				<ul>
					<li v-for="(item,index) in currentData" :key="index">
						<image :src="item.src|defaultImgSrc"></image>
						<p>{{item.name}}</p>
						
					</li>
				</ul>
				<ul>
				  <router-link to="brand-a" tag="li" exact>
					<div>Brand-A</div>
				  </router-link>
				  <router-link to="brand-b" tag="li">
					<div>Brand-B</div>
				  </router-link>
				</ul>
				 <router-view/>
				

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				channelList:[{id:'1',name:'精选服饰'},{id:'2',name:'精致鞋靴'},{id:'3',name:'日用百货'},
				{id:'4',name:'手机数码'},{id:'5',name:'家用电器'},{id:'6',name:'美妆护理'},
				{id:'7',name:'精美箱包'},{id:'8',name:'家居家纺'}],
				dataList:[[{id:1,name:'床上用品',src:'https://laikeds.oss-accelerate.aliyuncs.com/1/0/1561432331643.png'},{id:2,name:'居家布艺',src:'https://laikeds.oss-accelerate.aliyuncs.com/1/0/1561432464467.jpeg'},{id:3,name:'床上用品',src:'https://laikeds.oss-accelerate.aliyuncs.com/1/0/1561433252808.jpeg'},{id:4,name:'床上用品'}],
				[{id:5,name:'女包'},{id:6,name:'男包'},{id:7,name:'旅行箱包'}],[{id:8,name:'女包'}],[{id:8,name:'女包'}],
				[{id:8,name:'女包'}],[],[],[],[],[],[],[]],
				currentData:[],
				defaultSrc:'https://laikeds.oss-accelerate.aliyuncs.com/1/0/1561432331643.png'
			}
		},
		created() {
			this.currentData = this.dataList[0]
		},
		filters:{
			defaultImgSrc(value){
				return value || 'https://laikeds.oss-accelerate.aliyuncs.com/1/0/1548914627967.png'
			}
		},
		methods: {
			changeChannel(index){
				this.activeIndex=index;
				this.currentData = this.dataList[index];
				console.log(this.currentData);
			},
			goList(value) {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.tags{
		display: flex;
		.left{
			width: 80px;
			
			font-size: 16px;
			border-right: 1px solid #eee;
			 color: #888;
			 padding-right: 10px;
			li{
				height: 50px;
				line-height:50px;
				text-align: center;
				&.active{
					color: #333;
					font-weight: bold;
					position: relative;
					&::after{
						content: "";
						position: absolute;
						width: 40%;
						height: 2px;
						bottom: 0;
						background: #2b2b2b;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
			
		}
		.right{
			flex: 1;
			color: #666;
			ul{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				font-size: 14px;
				
				li{
					width:32%;
					padding: 10px 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					image{
						width: 66px;
						height: 66px;
					}
				}
			}
		}
	}
</style>
