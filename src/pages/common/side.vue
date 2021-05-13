<template>
	<view>
		我是侧边栏{{collapse}}
	</view>
</template>

<script>
	import bus from '@/common/bus.js';
	
	export default {
		data() {
			return {
				collapse: '展开'
			}
		},
		methods: {
			
		},
		created(){
			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
			bus.$on('collapse', msg => {
				this.collapse = msg;
			})
		}
	}
</script>

<style>

</style>
