// 引入其他模块
require(['./requirejs.config'], () => {
    require(['cookie', 'template', 'jquery', 'header', 'footer'], (cookie, template) => {
        (function () {  
            // 判断登录
            login();
            // 加载地址
            loadAddr();
            // 加载信息
            loadOrderDetails();
        })()
        // 判断是否登录
        function login() {  
            if(!($.cookie('user'))){
                location.href = '/html/login.html'
            }
        }
        // 加载用户地址信息
        function loadAddr() {  
            let user = JSON.parse($.cookie('user'));
            $('#addr_span').text(user.addr);
        }
        // 加载订单cookie信息
        function loadOrderDetails() {  
            let orderDetails = JSON.parse($.cookie('order'));
            console.log(orderDetails);
            
            let html = template('order_details', {data: orderDetails});
            $('#order_list').html(html);
            // 计算数量
            count(orderDetails);
            // 计算总价
            money(orderDetails);
        }
        // 计算商品数量
        function count(details) {  
            let count = 0;
            $(details).each(function (index, value) {  
                count += value.count;
            })
            $('#result_num').text(count + '件商品');
        }
        // 计算总价
        function money(details) {  
            let money = 0;
            $(details).each(function (index, value) {  
                money += value.price.slice(1) * value.count;
            })
            $('#total_money').text("￥" + money.toFixed(2));
        }
    })
})