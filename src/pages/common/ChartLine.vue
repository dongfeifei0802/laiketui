<template>
    <div>
		<button @click="clickMe">{{clicked}}点我取反</button>
		<!-- <button @click="clickMe">{{clicked}}点我取反</button> -->
		 <div >我是子组件{{obj}}</div>
		 <div>{{getNum}}</div>
		 
	</div>
	
		
</template>
<script>
export default {
    name:'childChar',
    props:{
       obj:{
			default:{},
			type:Object
		},
		num:String
    },
    data(){
        return {
			clicked: false,
            avg:2
        }
    },
    mounted(){
        console.log("子组件挂载---",this.name)
    },
	updated() {
		console.log("子修改")
	},
	computed:{
		getNum(){
			return this.num.split("").join("-")
		}
	},
    methods:{
		clickMe(){
			this.obj.name='李四';
			this.clicked = !this.clicked;
			//this.$emit("updateClick",this.clicked);
		},
        addCount(){
          //this.mycount =  this.count+1;
           this.$emit("updateCount",this.avg);
        }
    }
}
</script>
<style lang="scss" scoped>
	uni-button{
		width: 100%;
	}
</style>