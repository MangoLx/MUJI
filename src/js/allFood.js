// 引入模块
require(['./requirejs.config'], () => {
    require(['jquery', 'header', 'footer', 'section'], () => {
        console.log('allFood');
    })
})