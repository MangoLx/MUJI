// 引入模块
require(['./requirejs.config'], () => {
    require(['jquery','template','cookie', 'header', 'footer', 'index_comm_item'], ($, template, cookie) => {
        (function () {  
            // 加载商品
            loadDetails();
            
            // 编辑
            edit();
        })();

        // 加载cookie显示商品
        function loadDetails() {  
            let goods = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            console.log(goods);
            // template渲染
            let html = template('cart_goods', {goods});
            $('#total_carts').html(html);
            // 全选
            allChoose();
            // 计算总数
            count(goods);
            // 计算价格
            money(goods);

            btnControl();
        }
        // 编辑事件
        function edit() {  
            // 编辑按钮
            $('#editBtn').on('click', function () {  
                $('section').eq(0).addClass('edit');
                $('.goods-wrap').addClass('edit');
            });
            // 确定按钮
            $('#sureBtn').on('click', function () {  
                $('section').eq(0).removeClass('edit');
                $('.goods-wrap').removeClass('edit');
                // 拿到所有的个数标签，更改cookie中的值
                let counts = $('.goods-num');
                let details = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
                for(let i = 0; i < details.length; i++){
                    details[i].count = Number($(counts[i]).text());
                }
                // 存入cookie
                $.cookie('cart', JSON.stringify(details), {path: '/', expires: 3});
                //重新计算价格和数量
                count(details);
                money(details)
            });
            // 删除按钮
            $('.delBtn').on('click', function () {  
                if(confirm('确定删除？')){
                    // 找到最外层的li
                    let li = $(this).parent().parent().parent();
                    let id = li.data('id');
                    let details = JSON.parse($.cookie('cart'));
                    $(details).each(function (index, value) {  
                        if(value.id == id){
                            // 删除这一条数据
                            details.splice(index, 1);
                            return;
                        }
                    })
                    console.log(details);
                    // 存入cookie
                    $.cookie('cart', JSON.stringify(details), {path: '/', expires: 3});
                    console.log(JSON.parse($.cookie('cart')));
                    // 移除元素
                    li.remove();
                    // 重新计算数量价格
                    count(details);
                    money(details);
                    tied();
                }
            });
            // 全选按钮
            $('#chooseAll').on('click', function () {  
                let aCheck = $('.goods-choose');
                aCheck.prop('checked', $(this).prop('checked'));
                let goods = JSON.parse($.cookie('cart'));
                money(goods);
                count(goods);
            })
        }
        // 计算商品个数
        function count(goods) {  
            let num = 0;
            // 根据勾选计算商品件数和价格
            let countArr = [];
            let ali = $('#total_carts').find('li');
            ali.each(function (index, item) {  
                if($(item).find('.goods-choose').prop('checked')){
                    countArr.push($(item).data('id') + '');
                }
            });
            $(goods).each(function (index, value) {  
                if(countArr.indexOf(value.id) !== -1){
                    num += value.count;
                }
            });
            $('#result_num').text(num + '件商品')
        }
        // 计算商品价格
        function money(goods) {  
            let money = 0;
            // 根据勾选计算商品件数和价格
            let moneyArr = [];
            let ali = $('#total_carts').find('li');
            ali.each(function (index, item) {  
                if($(item).find('.goods-choose').prop('checked')){
                    moneyArr.push($(item).data('id') + '');
                }
            });
            $(goods).each(function (index, value) {  
                if(moneyArr.indexOf(value.id) !== -1){
                    let price = value.price.slice(1) * value.count;
                    money += price;
                }
            });
            $('#total_money').text('￥' + money.toFixed(2));
        }
        // 更改商品数量按钮监听
        function btnControl() {  
            $('.goods-add').on('click', function () {
                let num = $(this).next();
                let count = Number(num.text()) + 1;
                num.text(count);
            });
            $('.goods-sub').on('click', function () {
                let num = $(this).prev();
                if(Number(num.text()) <= 1){
                    return;
                }  
                let count = Number(num.text()) - 1;
                num.text(count);
            });
            // 勾选事件监听
            $('.goods-choose').on('click', function () { 
                let goods = JSON.parse($.cookie('cart'));
                tied();
                money(goods);
                count(goods);
            })
        }
        // 监听勾选事件
        function tied() {  
            // 得到全选按钮
            let chooseAll = $('#chooseAll');
            let aCheck = $('.goods-choose');
            let n = 0;
            for(let i = 0; i < aCheck.length; i++){
                aCheck[i].checked ? n++ : n--                
            }
            chooseAll.checked = n === aCheck.length ? true : false;
            chooseAll.prop('checked', chooseAll.checked);
        }
        // 判断是否全选
        function allChoose() {
            let chooseAll = $('#chooseAll');
            let aCheck = $('.goods-choose');
            if(chooseAll.prop('checked')){
                for(let i = 0; i < aCheck.length; i++){
                    $(aCheck[i]).prop('checked', true);              
                }
            }
            
        }
    })
})