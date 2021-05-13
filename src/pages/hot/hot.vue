<template>
	<view class="hot">
		 <HMfilterDropdown :menuTop="88" :filterData="filterData" :defaultSelected="defaultSelected"  :updateMenuName="true"  dataFormat="Object"></HMfilterDropdown>
		 <view class="content">
			 <view class="card">
				 <view :class="['item',index===activeIndex?'active':'']" 
				 v-for="(item,index) in itemLists" :key="index"
				 @click="chooseItem(index)">
					 {{item.name}}
				 </view>
			 </view>
			  <navigator url="/pages/demandSupply/supply"><button type="default">去发布</button></navigator>
			   
		 </view>
	
		 
	</view>
</template>

<script>
	import noData from '../common/noData/noData.vue'
	import ChartLine from '../common/ChartLine.vue'
    import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import data from '@/common/data.js';//筛选菜单数据
	import myHead from '../common/head.vue'
	import side from '../common/side.vue'
	export default {
		components:{
			noData:noData,
			ChartLine:ChartLine,
			'HMfilterDropdown':HMfilterDropdown ,
			myHead:myHead,
			side:side,
		},
		data() {
			return {
				clicked:false,
				refreshing: false,// 是否加载中
				lists: [],
				more:'loading',
				pageNumber:1,
				pageSize:1,
				count:1,
				filterData:[],
				defaultSelected:[[1],[2]],
				activeIndex:0,
				itemLists: [{name:'衣服',id:0},
				{name:'饰品',id:1},
				{name:'食品',id:2},
				{name:'首饰',id:3},
				{name:'书籍1212',id:4}
				],
				post:{name:'张三',age:12},
				styleObject:{
					color: '#ffffff',
					fontSize: '13px'
				},
				
			}
		},
		created() {
			this.styleObject.height='100px'
			console.log(this.styleObject)
		},
		onLoad() {
			setTimeout(()=>{
				this.more ='more'
			//	this.getDataList();
			},1000)
			this.filterData = data; 
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				console.log('下拉刷新');
				 this.refreshing = false;
				 this.pageNumber=1;
				 this.more ='more'
				 this.lists=[];
				 uni.stopPullDownRefresh();////得到数据后停止下拉刷新
				 this.getDataList(); 
			},1000)
			
		},
		//触底事件
		onReachBottom() {
			if(!this.refreshing){  //此处判断，上锁，防止重复请求
				uni.showNavigationBarLoading()
				this.refreshing=true
				this.pageNumber+=1
				this.getDataList();
				uni.hideNavigationBarLoading()
		  }
			
		},
		mounted(){
			console.log("父组件挂载");
			this.styleObject.height='100px'
			//console.log(this.$refs.zfx.$el);
			//this.$refs.zfx.style.width = '100px'; 
			//this.$refs.zfx.css("height","40px")
			//this.$refs.zfx.height=100px
			
			
		},
		updated: () => {
			console.log("父亲修改")
		},
		beforeUpdate:function(){
			console.log("父亲修改0")
		},
		methods: {
			getDataList() {
				//获取数据
				//pageNumber: 1 pageSize: 10
				let params ={pageNumber:this.pageNumber,pageSize:this.pageSize}
				console.log("获取数据~~~~");
				this.$http.get('/v1/supplyPen/search?dictFlag=INPUTS_TYPE',{params:params} ).then((res)=>{
					console.log(this.pageSize)
					 this.lists = this.lists.concat(res.data) ;
					 if(res.count/this.pageSize>this.pageNumber){
						 console.log('还有下一页')
						 this.more ='more'
						 
					}else{
						this.refreshing= true;
						this.more = 'moMore'
						uni.stopPullDownRefresh()
					}
					
					
				}) 
			},
			//选中
			chooseItem(index){
				this.activeIndex = index;
			}
		},
		computed:{
			scrollerHeight:function(){
				      return '100px'; //自定义高度需求

			}
		}
	}
</script>

<style lang="scss" scoped >
	.hot{
		
		.content{
			margin-top: 88rpx;
			.card{
				display: flex;
				flex-direction: row;
				overflow: auto;
				height: 60px;
				justify-content: center;
				align-items: center;
				.item{
					padding:0 20px;
					flex-shrink: 0;
					display: flex;
					justify-content: center;
					&.active{
						color: red;
						position: relative;
						//border-bottom: 1px solid gray;
						&::after{
							content: "";
							position: absolute;
							width: 50%;
							height: 1px;
							background: red;
							bottom: -6px;
						}
					}
					&::before{
						
					}
				}
			}
			.ceshi{
				padding: 10px 10%;
				li{
					margin-bottom: 20px;
				}
				uni-button{
					width: 100%;
				}
			}
			
		}
	}
	.n_indent{
		background-color: #f2f2f2;
		margin: 10px;
		padding: 10px;
		box-shadow:4px 4px 10px #c2c2c2; ;
	}
	.zfx{
		width: 100px;
		background: red;
	}
</style>
