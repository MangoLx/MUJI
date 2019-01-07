// 引入模块
require(['./requirejs.config'], () => {
    require(['jquery', 'header', 'footer', 'section', 'list_item'], () => {
        console.log('allFood');
    })
})