<template>
	<view>
		<view class="noData">
			<view class="text">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.noData {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: rpx(32);
		color: #999;

		image {
		  width: rpx(100);
		  height: rpx(100);
		  margin-bottom: rpx(20);
		}
	  }
</style>
