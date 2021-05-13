<template>
	<view>
		<view @click="collapseChage">
			<button>{{text}}</button>
			</view>
	</view>
</template>

<script>
	import bus from '@/common/bus.js'
	
	export default {
		data() {
			return {
				collapse:true,
				text:'展开'
			}
		},
		methods: {
			collapseChage(){
				this.collapse = !this.collapse;
				this.text = this.collapse?'展开':'收起';
				bus.$emit('collapse', this.text);
			}
		}
	}
</script>

<style>

</style>
