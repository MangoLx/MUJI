// 引入模块
require(['./requirejs.config'], () => {
    require(['jquery', 'header', 'footer'], () => {
        console.log('cart');
    })
})