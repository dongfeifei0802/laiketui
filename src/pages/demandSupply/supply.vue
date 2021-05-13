<template>
    <view class="supply">

        <form @submit="formSubmit" @reset="formReset">
            <view>
                <view class="uni-row">
                    <view class="title "><text class="require">标题：</text></view>
                    <view class="right"> <input class="uni-input" name="input" placeholder="请输入标题" v-model="obj.name"/></view>
                   
                </view>
                <view class="uni-row">
                    <view class="title require"><text class="require">封面图片：</text></view>
                    <view class="right">
                        <view class="uni-hello-addfile">
                            <text>+</text>
                             <text>上传</text>
                             </view>
                        <!-- <image @click="chooseImage" style="width: 120rpx; height: 120rpx; background-color: #eeeeee;" mode="scaleToFill" :src="src"
                       ></image> -->
                    </view>
                      
                </view>
                <view class="uni-row">
                    <view class="title require"><text class="require">商品单价:</text></view>
                    <view class="right">
                        <view class="mianyi"><switch  :checked ="showInputText"  @change="priceType"/><text>面议</text></view>
                        
                        <view class="price" v-show="!showInputText">
                             <input class="sml" name="input" placeholder="请输入价格" />
                            <text>元</text>
                        </view>
                    </view>
                                    

                </view>
                <view class="uni-row">
                    <view class="title require"><text class="require">库存数量:</text></view>
                    
                    <view class="right"> <input class="uni-input" name="input" placeholder="请输入标题" /></view>
                </view>
                <view class="uni-row">
                    <view class="title require"><text class="require">商品描述:</text></view>
                    
                    <view class="right uni-textarea"> 
                          <textarea  placeholder-style="border: 1px solid #ede8e8;padding-left: 5px;" placeholder="请输入商品描述"/>
                    </view>
                </view>
                <view class="uni-row">
                    <view class="title require"><text >企业名称:</text></view>
                    
                    <view class="right"> <input class="uni-input" name="input" placeholder="请输入标题" /></view>
                </view>
                <view class="uni-row">
                    <view class="title require"><text>联系人:</text></view>
                    
                    <view class="right"> <input class="uni-input" name="input" placeholder="请输入标题" /></view>
                </view>
                <view class="uni-row">
                    <view class="title require"><text>联系方式:</text></view>
                    
                    <view class="right"> <input class="uni-input" name="input" placeholder="请输入联系方式" /></view>
                </view>
                <view class="uni-row">
                    <view class="title require"><text>测试picker:</text></view>
                    <view class="right cols">
                        <picker mode="multiSelector" :value="areaIndex" :range="area" range-key="name" @change="change" @columnchange="columnChange">
                            <view class="picker">
                                {{area[0][areaIndex[0]].name}}>{{area[1][areaIndex[1]].name}}
                            </view>
                        </picker>
                        
                        
                    </view>
                </view>
                
                
            

                
                <view class="uni-row">
                    <view class="title require"><text>详细地址:</text></view>
                    
                    <view class="right cols"> 
                        <view class="dw">
                            <input class="uni-input" v-model="address"  name="input" placeholder="请输入标题" />
                            <button @click="getLocation">定位</button>
                        </view>
                        
                        <map style="width: 100%; height: 289rpx;margin-top:10px" :latitude="latitude" :longitude="longitude" :markers="covers" @tap="openMap()"></map>

                    </view>
                </view>
                <view class="uni-row">
                      <button type="default" >发布供应</button>
                </view>
            </view>
            
        </form>
    </view>
</template>
<script>


export default {
    data(){
        return{
            obj:{
                a:1,b:2,name1:''
            },
            showInputText:false,
            strings: 
            [{
                name: 'div',
                attrs: {
                    class: 'div-class',
                    style: 'line-height: 60px; color: red; text-align:center;'
                },
                children: [{
                    type: 'text',
                    text: 'Hello&nbsp;uni-app!'
                }]
            }],
            src:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6b971f70-4f31-11eb-bd01-97bc1429a9ff.png',
            
          
            
            
            latitude: 31.7335,

            longitude: 118.1024,

            covers: [

                    {

                        latitude: 31.7335,//纬度，范围为-90~90，负数表示南纬

                        longitude: 118.1024,//经度，范围为-180~180，负数表示西经

                    }

            ],
            address:'',
            //测试数据
            area:[],
               dataSource: [
                    {
                    id: 8,
                   
                    name: "星期一",
                    child: [
                        {
                        id: 9,
                        parent_id: "8",
                      
                        name: "星期一晴天",
                        },
                        {
                        id: 11,
                        parent_id: "8",
                      
                        name: "星期一雨天",
                        },
                    ]
                    },
                    {
                    id: 18,
                  
                 
                    name: "星期二",
                    child: [
                        {
                        id: 19,
                       
                        name: "星期二暴雨",
                        },
                        {
                        id: 20,
                      
                        name: "星期二冰雹",
                        }
                    ],
                    }
                ],
      areaIndex: [0, 0]


        }
    },
    onLoad() {
            this.area = [this.dataSource, this.dataSource[0].child]//初始值数据
            console.log("初始值",this.area)
              this.getLocationData();
              this.initData(); //页面一加载调用赋值
    },
    methods:{
        initData() { 
          
        },
        openMap() {//点击地图

            uni.openLocation({

                latitude: this.latitude,

                longitude: this.longitude,

                name:"马鞍山市含山县",

                address: "马鞍山市含山县"

            })

        },
        getLocationData(){
             console.log("000000000000000");
            uni.getLocation({
                type: 'wgs84',
                success: function (res) {
                    console.log('当前位置的经度：' + res.longitude);
                    console.log('当前位置的纬度：' + res.latitude);
                },
                fail:function(){
                    console.log("失败");
                },
                complete:function(){
                    console.log("完成");
                }
            });
        },
        getLocation(){
            uni.chooseLocation({
                success:  (res)=> {
                    console.log('位置名称：' + res.name);
                    console.log('详细地址：' + res.address);
                    console.log('纬度：' + res.latitude);
                    console.log('经度：' + res.longitude);
                    this.address = res.name;
                }
            });
        },
        priceType(e){
            //console.log(e.target.value);
            this.showInputText = e.target.value
        },
        formSubmit(){
            console.log("提交");
        },
        getYearRange:function(start){
            
        },
         columnChange(e){
             //column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
             //this.areaIndex = [e.detail.column,e.detail.value]
             //this.areaIndex[1] = 0
             this.areaIndex[e.detail.column] = e.detail.value;
            
           
            switch (e.detail.column) {
                case 0:
                    this.area = [this.area[0], this.dataSource[e.detail.value].child];
                     console.log("选中之后值",this.area)
                
            }
        },
        change(e){
                this.areaIndex = e.detail.value
        },
        chooseImage(){
            uni.chooseImage({
                count: 6, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                //sourceType: ['album'], //从相册选择
                success: function (res) {
                    console.log(res)
                    console.log(JSON.stringify(res.tempFilePaths));
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.supply{
    
    padding: 5px 10px;
    .uni-row{
        display: flex;
        padding: 5px;
        font-size: 14px;
        align-items: center;
        
       
        margin: 5px 0;
        .title{
            width: 200rpx;
            display: flex;
           justify-content:center;
            
            text{
                position: relative;
                &.require::before{
                    position: absolute;
                    content: '*';
                    left:-12px;
                    top: 0;
                    color: red;
                }
            }
            
        }
        .right{
            flex: 1;
            display: flex;
            align-items: center;
            &.cols{
                flex-direction: column;
                uni-input{
                    width: 100%;
                }
                .dw{
                    display: flex;
                    button{
                        width: 80px;
                    }
                }
            }
            .mianyi{
                width: 40%;
                 padding:5px 0;
                 display: flex;;
                align-items: center;
            }
            .price{
                flex: 1;
                 display: flex;;
                align-items: center;
                .sml{
                    width: 80%;
                   
                   
                }
            }
            
            .uni-input{
                flex: 1;
                height: 40px;
                line-height:40px;
                border: 1px solid #ede8e8;
                padding-left:5px;
            }
            uni-textarea{
                width: 100%;
                height: 100px;
            }
           uni-picker{
               width: 100%;
           }
           .uni-hello-addfile{
                   text-align: center;

    background: #fff;
    font-size: 19px;
    color: grey;
    width: 80px;
    height: 80px;
    line-height: 80px;
        border: 1px solid #eceaea;
           }
        }
        button{
            color: #fff;
            background-color: #ccb769;
        }
    }
}
</style>