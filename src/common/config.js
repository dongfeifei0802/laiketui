let config = {}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    config.baseUrl  = 'http://sdxm.agrisaas.com.cn/hetian-app'
}else{
    // 生产环境
    config.baseUrl  = 'http://106.124.133.34:8888/cssp-app'
}

export default config 