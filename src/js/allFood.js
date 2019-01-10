// 引入模块
require(['./requirejs.config'], () => {
    require(['list_item', 'jquery', 'header', 'footer', 'section'], (listItem) => {
        (function () {  
            // 初始化显示商品
            listItem.init();
            waterFull()
            toDetail();
            sort();
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
        // 点击商品去详情页
        function toDetail() {  
            // 事件委托
            $('#list-item').on('click', 'li', function () { 
                location.href = '/html/detail.html?id=' + $(this).data('id');
            });
        }
        // 点击排序进行排序
        function sort() {  
            $('.note-choose').on('click', 'span', function () {  
                // 添加当前状态class
                $(this).addClass('cur').siblings().removeClass('cur');
                // 按照价格排序
                if($(this).prop('id') === 'sort_price'){
                    // 获取所有盒子
                    let aLi = Array.from($('#list-item').find('li'));
                    let nowALi =  aLi.sort(function (first, second) {  
                        return Number($(second).find('span').text().slice(1)) - 
                                Number($(first).find('span').text().slice(1));
                    })
                    // 将得到的排序结果更新到数据
                    // 清空原来的html
                    $('#list-item').html('');
                    $(nowALi).each(function (index, item) {  
                        $(item).appendTo($('#list-item'));
                    })
                }
                // 乱序
                else{
                    // 获取所有盒子
                    let aLi = Array.from($('#list-item').find('li'));
                    let nowALi =  aLi.sort(function (first, second) {  
                        return Math.random()>.5 ? -1 : 1;
                    })
                    // 将得到的排序结果更新到数据
                    // 清空原来的html
                    $('#list-item').html('');
                    $(nowALi).each(function (index, item) {  
                        $(item).appendTo($('#list-item'));
                    })
                }
            })
        }
    })
})