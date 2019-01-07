// 引入模块
require(['./requirejs.config'], () => {
    require(['url','jquery', 'header', 'footer', 'section'], (url) => {
        (function () {  
            // 得到id
            getId();
            // 购买方法
            buy();
            // 确定方法
            sureFace();
        })()

        // 读取获得的id发送请求函数
        function getId() {  
            let id = parseInt(location.search.slice(2));
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
                    let detail_show = $('.detail-show-wrap');
                    detail_show.children().eq(0).attr({
                        src: data.detail_img,
                        alt: data.detail_name
                    });
                    detail_show.children().eq(1).text(data.detail_name);
                    detail_show.children().eq(2).text('￥' + data.detail_price);
                    $('#detail_id').text(data.detail_id);
                    $('#detail_name').text(data.detail_name);
                    $('#detail_size').text(data.detail_size + 'g');
                    $('#detail_origin').text(data.detail_origin);

                    $('.add-img').attr({
                        src: data.detail_img,
                        alt: data.detail_name
                    })
                    $('.add-name').text(data.detail_name);
                    $('.add-price').text('￥' + data.detail_price);
                    $('.add-weight').text(data.detail_size + 'g');
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
            $('#counts_add').on('click', function () {  
                detail_counts.text(Number(detail_counts.text()) + 1);
                return false;
            });
            $('#counts_sub').on('click', function () {  
                if(!(Number(detail_counts.text()) <= 1)){
                    detail_counts.text(Number(detail_counts.text()) - 1);
                }
                return false;
            })
        }
    })
})