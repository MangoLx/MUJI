// 引入模块
require(['./requirejs.config'], () => {
    require(['url', 'template', 'cookie', 'jquery', 'header', 'footer', 'section'], (url, template, cookie) => {
        (function () {  
            // 得到id
            getId();
            
        })()

        // 读取获得的id发送请求函数
        function getId() {  
            let id = parseInt(location.search.slice(4));
            new Promise((resolve, reject) => {
                $.ajax({
                    url: url.baseUrlRap + 'get_detail_info',
                    type: 'get',
                    getType: 'json',
                    data: {
                        detail_id: id
                    },
                    success: function (res) {  
                        resolve(res);
                    }
                })
            }).then((res) => {
                if(res.res_code === 1){
                    // 请求成功，渲染页面
                    let data = res.res_body;
                    let html = template('detail_infos', {data});
                    $(html).insertBefore($('footer'));
                    $('#detail_id').text(id);
                    // 购买方法
                    buy();
                    // 确定方法
                    sureFace();
                }
            })
        }
        // 监听购买按钮
        function buy() {  
            let flag = true;
            $('#add_cart').on('click', function (e) { 
                if(flag){
                    $('.detail-add').animate({bottom: 0});
                    flag = false;
                }else{
                    $('.detail-add').animate({bottom: -306});
                    flag = true;
                }
                e.stopPropagation();
            });
            $('#add_buy').on('click', function (e) {  
                if(flag){
                    $('.detail-add').animate({bottom: 0});
                    flag = false;
                }else{
                    $('.detail-add').animate({bottom: -306});
                    flag = true;
                }
                e.stopPropagation();
            });
            $(document.body).on('click', function () {  
                flag = true;
                $('.detail-add').animate({bottom: -306});
            })
        }
        // 添加界面事件添加
        function sureFace() {
            let detail_counts = $('#detail_counts');
            // 增加数量
            $('#counts_add').on('click', function () {  
                detail_counts.text(Number(detail_counts.text()) + 1);
                return false;
            });
            //减少数量
            $('#counts_sub').on('click', function () {  
                if(!(Number(detail_counts.text()) <= 1)){
                    detail_counts.text(Number(detail_counts.text()) - 1);
                }
                return false;
            });
            // 点击确定添加购物车
            $('#add_sure').on('click', function () {  
                // 得到商品id、名称、价格、数量、规格、图片地址
                let id = $('#detail_id').text();
                let name = $('#detail_name').text();
                let size = $('#detail_size').text();
                let price = $('.add-price').text();
                let imgAddr = $('.add-img').attr('src');
                let count = Number($('#detail_counts').text());
                let detail = {
                    id,name,size,price,imgAddr,count
                }
                addCookie(detail);
            });
        }
        function addCookie(obj) {  
            let cart = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            let index;
            let flag = cart.some(function (value, i) {  
                index = i;
                return value.id === obj.id;
            });
            flag ? cart[index].count += obj.count : cart.push(obj);
            // 重新插入cookie
            $.cookie('cart', JSON.stringify(cart), {path: '/', expires: 3});
            console.log(JSON.parse($.cookie('cart')));
        }
    })
})