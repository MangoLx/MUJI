// 引入模块
require(['./requirejs.config'], () => {
    require(['list_item', 'jquery', 'header', 'footer', 'section'], (listItem) => {
        (function () {  
            // 初始化显示商品
            listItem.init();
            waterFull()
            toDetail();
        })()

        // 滚动刷新商品
        function waterFull() {  
            // 设定滚动监听
            $(window).on('scroll', function () { 
                let top = $('#list-item').height() - $(window).height();
                if($(window).scrollTop() > top && $('#list-item').find('li').length < 30){
                    // 加载数据
                    console.log($('#list-item').find('li').length);
                    
                    listItem.addItem();
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