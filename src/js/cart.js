// 引入模块
require(['./requirejs.config'], () => {
    require(['jquery', 'header', 'footer', 'index_comm_item'], () => {
        console.log('cart');
    })
})