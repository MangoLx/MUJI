// 引入其他模块
require(['./requirejs.config'], () => {
    require(['jquery', 'header', 'footer'], () => {
        console.log('order');
        
    })
})