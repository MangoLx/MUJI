// 引入模块
require(['./requirejs.config'], () => {
    require(['list_item', 'jquery', 'header', 'footer', 'section'], (listItem) => {
        (function () {  
            // 初始化显示商品
            listItem.init();
            // waterFull()
            toDetail();
        })()

        // 滚动刷新商品
        function waterFull() {  
            let count = 1;
            // 设定滚动监听
            $(window).on('scroll', function () { 
                console.log($(this).scrollTop());
                // 判断滚动距离 
                if($(this).scrollTop() > $('#list-item').height() * count && count <= 3){
                    setTimeout(() => {
                        count++;
                        listItem.addItem();
                    }, 500);
                }
            })
        }
        function toDetail() {  
            // 事件委托
            $('#list-item').on('click', 'li', function () { 
                location.href = '/html/detail.html?id=' + $(this).data('id');
            });
        }
    })
})